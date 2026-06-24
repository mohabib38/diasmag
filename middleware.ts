import {createServerClient} from '@supabase/ssr';
import createIntlMiddleware from 'next-intl/middleware';
import {type NextRequest, NextResponse} from 'next/server';

import {routing} from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-anon-key';

export async function middleware(request: NextRequest) {
  // Gestion i18n via next-intl
  const intlResponse = intlMiddleware(request);
  const response = intlResponse ?? NextResponse.next({request});

  // Rafraîchissement de la session Supabase SSR
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({name, value}) => request.cookies.set(name, value));
        cookiesToSet.forEach(({name, value, options}) =>
          response.cookies.set(name, value, options)
        );
      }
    }
  });

  // Rafraîchit le token d'authentification si nécessaire
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
