import {Link} from '@/i18n/routing';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata = {
  title: 'Inscription — DiasMag'
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="text-3xl font-black tracking-tight text-emerald">
            DiasMag
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-dark">Rejoignez la communauté</h1>
          <p className="mt-2 text-sm text-slate-600">
            Créez votre compte DiasMag gratuit en quelques secondes
          </p>
        </div>

        {/* Formulaire */}
        <div className="diasmag-card p-8">
          <RegisterForm />
        </div>

        {/* Lien connexion */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Vous avez déjà un compte ?{' '}
          <Link href="/auth/login" className="font-semibold text-emerald hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </main>
  );
}
