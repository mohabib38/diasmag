import {createServerClient} from '@supabase/ssr';
import {cookies} from 'next/headers';
import {NextRequest, NextResponse} from 'next/server';

function getSafeNextPath(next: string): string {
  const trimmed = next.trim();
  if (!trimmed.startsWith('/')) {
    return '/fr';
  }

  try {
    const parsed = new URL(trimmed, 'https://diasmag.local');
    if (parsed.origin !== 'https://diasmag.local') {
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

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
