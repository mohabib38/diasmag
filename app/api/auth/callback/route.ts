import {createServerClient} from '@supabase/ssr';
import {cookies} from 'next/headers';
import {NextRequest, NextResponse} from 'next/server';

// Base interne uniquement utilisée pour parser un chemin relatif de façon sûre.
const SAFE_BASE_URL = 'https://diasmag.local';

function getSafeNextPath(next: string): string {
  const trimmed = next.trim();
  if (!trimmed.startsWith('/')) {
    return '/fr';
  }

  try {
    const parsed = new URL(trimmed, SAFE_BASE_URL);
    if (parsed.origin !== SAFE_BASE_URL) {
      return '/fr';
    }
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return '/fr';
  }
}

export async function GET(request: NextRequest) {
  const {searchParams, origin} = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/fr';
  const safeNext = getSafeNextPath(next);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (code && supabaseUrl && supabaseAnonKey) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookiesToSet) =>
            cookiesToSet.forEach(({name, value, options}) => cookieStore.set(name, value, options))
        }
      }
    );
    const {error} = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
  }

  return NextResponse.redirect(`${origin}/fr/auth/login?error=callback_error`);
}
