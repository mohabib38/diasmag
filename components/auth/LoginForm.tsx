'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

import {createSupabaseBrowserClient} from '@/lib/supabase-browser';

// Schéma de validation du formulaire de connexion
const loginSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères')
});

type LoginFormData = z.infer<typeof loginSchema>;

// Messages d'erreur Supabase traduits en français
function translateSupabaseError(message: string): string {
  if (message.includes('Invalid login credentials')) {
    return 'Email ou mot de passe incorrect.';
  }
  if (message.includes('Email not confirmed')) {
    return 'Veuillez confirmer votre adresse email avant de vous connecter.';
  }
  if (message.includes('Too many requests')) {
    return 'Trop de tentatives. Veuillez réessayer dans quelques minutes.';
  }
  return message;
}

export default function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  // Connexion par email + mot de passe
  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setServerError(null);

    const {error} = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    });

    if (error) {
      setServerError(translateSupabaseError(error.message));
      setLoading(false);
      return;
    }

    router.push('/');
    router.refresh();
  };

  // Connexion avec Google OAuth
  const handleGoogleLogin = async () => {
    setLoading(true);
    setServerError(null);

    // Utilise l'URL de l'application définie en variable d'environnement
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? window.location.origin;

    const {error} = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${appUrl}/auth/callback`
      }
    });

    if (error) {
      setServerError(translateSupabaseError(error.message));
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Bouton Google */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-dark shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
      >
        <span className="text-lg">🌐</span>
        Continuer avec Google
      </button>

      <div className="relative flex items-center">
        <div className="flex-1 border-t border-slate-200" />
        <span className="mx-4 text-xs text-slate-400">ou</span>
        <div className="flex-1 border-t border-slate-200" />
      </div>

      {/* Formulaire email + mot de passe */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {serverError ? (
          <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{serverError}</div>
        ) : null}

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-dark">
            Adresse email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register('email')}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-emerald transition focus:ring-2 disabled:opacity-60"
            placeholder="vous@exemple.com"
            disabled={loading}
          />
          {errors.email ? (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          ) : null}
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium text-dark">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register('password')}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-emerald transition focus:ring-2 disabled:opacity-60"
            placeholder="••••••••"
            disabled={loading}
          />
          {errors.password ? (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="diasmag-button-primary w-full disabled:opacity-60"
        >
          {loading ? 'Connexion en cours…' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}
