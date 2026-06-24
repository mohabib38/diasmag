import {NextResponse} from 'next/server';

import {createSupabaseServerClient} from '@/lib/supabase-server';

// Route de callback OAuth Supabase (utilisée après connexion Google)
export async function GET(request: Request) {
  const {origin, searchParams} = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createSupabaseServerClient();
    const {error} = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // En cas d'erreur, rediriger vers la page de connexion
  return NextResponse.redirect(`${origin}/auth/login?error=callback_error`);
}
