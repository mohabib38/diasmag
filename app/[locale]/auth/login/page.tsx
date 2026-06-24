import {Link} from '@/i18n/routing';
import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Connexion — DiasMag'
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="text-3xl font-black tracking-tight text-emerald">
            DiasMag
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-dark">Bon retour parmi nous !</h1>
          <p className="mt-2 text-sm text-slate-600">Connectez-vous à votre compte DiasMag</p>
        </div>

        {/* Formulaire */}
        <div className="diasmag-card p-8">
          <LoginForm />
        </div>

        {/* Lien inscription */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Pas encore de compte ?{' '}
          <Link href="/auth/register" className="font-semibold text-emerald hover:underline">
            S&apos;inscrire gratuitement
          </Link>
        </p>
      </div>
    </main>
  );
}
