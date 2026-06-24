import {createClient} from '@supabase/supabase-js';

// Vérification des variables d'environnement requises
if (typeof window === 'undefined') {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.warn('[Supabase] NEXT_PUBLIC_SUPABASE_URL est manquant — veuillez configurer votre .env');
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('[Supabase] NEXT_PUBLIC_SUPABASE_ANON_KEY est manquant — veuillez configurer votre .env');
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-role-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
