import {NextResponse} from 'next/server';

import {createSupabaseServerClient} from '@/lib/supabase-server';

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

// Route de callback OAuth Supabase (utilisée après connexion Google)
export async function GET(request: Request) {
  const {origin, searchParams} = new URL(request.url);
  const code = searchParams.get('code');
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? origin).replace(/\/$/, '');
  const next = searchParams.get('next') ?? '/fr';
  const safeNext = getSafeNextPath(next);

  if (code) {
    const supabase = await createSupabaseServerClient();
    const {error} = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${appUrl}${safeNext}`);
    }
  }

  // En cas d'erreur, rediriger vers la page de connexion
  return NextResponse.redirect(`${appUrl}/fr/auth/login?error=callback_error`);
}
