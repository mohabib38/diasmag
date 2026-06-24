'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useRouter} from 'next/navigation';
import {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

import {createSupabaseBrowserClient} from '@/lib/supabase-browser';

// Schéma de validation du formulaire d'inscription
const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    email: z.string().email('Adresse email invalide'),
    password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword']
  });

type RegisterFormData = z.infer<typeof registerSchema>;

// Messages d'erreur Supabase traduits en français
function translateSupabaseError(message: string): string {
  if (message.includes('User already registered') || message.includes('already been registered')) {
    return 'Cette adresse email est déjà utilisée.';
  }
  if (message.includes('Password should be at least')) {
    return 'Le mot de passe doit contenir au moins 8 caractères.';
  }
  if (message.includes('Too many requests')) {
    return 'Trop de tentatives. Veuillez réessayer dans quelques minutes.';
  }
  return message;
}

export default function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  // Référence pour nettoyer le timeout en cas de démontage du composant
  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current !== null) {
        clearTimeout(redirectTimerRef.current);
      }
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  // Inscription avec email + mot de passe
  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setServerError(null);

    const {error} = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {full_name: data.fullName}
      }
    });

    if (error) {
      setServerError(translateSupabaseError(error.message));
      setLoading(false);
      return;
    }

    // Vérification email requise dans la plupart des configs Supabase
    setSuccess(true);
    setLoading(false);

    // Redirection vers la page d'accueil après 3 secondes
    redirectTimerRef.current = setTimeout(() => {
      router.push('/');
      router.refresh();
    }, 3000);
  };

  if (success) {
    return (
      <div className="rounded-2xl bg-emerald/10 px-6 py-8 text-center">
        <div className="text-4xl">📧</div>
        <h3 className="mt-4 text-lg font-bold text-dark">Vérifiez votre boîte mail !</h3>
        <p className="mt-2 text-sm text-slate-600">
          Un lien de confirmation a été envoyé à votre adresse email. Cliquez dessus pour activer
          votre compte.
        </p>
        <p className="mt-4 text-xs text-slate-400">Redirection automatique dans 3 secondes…</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {serverError ? (
        <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{serverError}</div>
      ) : null}

      <div className="space-y-1">
        <label htmlFor="fullName" className="text-sm font-medium text-dark">
          Nom complet
        </label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          {...register('fullName')}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-emerald transition focus:ring-2 disabled:opacity-60"
          placeholder="Prénom Nom"
          disabled={loading}
        />
        {errors.fullName ? (
          <p className="text-xs text-red-500">{errors.fullName.message}</p>
        ) : null}
      </div>

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
          autoComplete="new-password"
          {...register('password')}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-emerald transition focus:ring-2 disabled:opacity-60"
          placeholder="Minimum 8 caractères"
          disabled={loading}
        />
        {errors.password ? (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        ) : null}
      </div>

      <div className="space-y-1">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-dark">
          Confirmer le mot de passe
        </label>
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          {...register('confirmPassword')}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-emerald transition focus:ring-2 disabled:opacity-60"
          placeholder="••••••••"
          disabled={loading}
        />
        {errors.confirmPassword ? (
          <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="diasmag-button-primary w-full disabled:opacity-60"
      >
        {loading ? 'Inscription en cours…' : "S'inscrire gratuitement"}
      </button>
    </form>
  );
}
