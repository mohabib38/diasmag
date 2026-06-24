'use client';

import {useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';

import {useAuth} from '@/components/auth/AuthProvider';
import {Link, routing, usePathname} from '@/i18n/routing';

const navItems = [
  {href: '/', key: 'home'},
  {href: '/envoyer-argent', key: 'envoyer'},
  {href: '/demarches', key: 'demarches'},
  {href: '/apprendre', key: 'apprendre'},
  {href: '/recettes', key: 'recettes'},
  {href: '/actualites', key: 'actualites'},
  {href: '/voyager', key: 'voyager'},
  {href: '/mariage', key: 'mariage'}
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const {user, loading, signOut} = useAuth();

  // Initiales de l'utilisateur pour l'avatar
  const initials = user?.email?.slice(0, 2).toUpperCase() ?? '?';

  return (
    <header className="sticky top-0 z-50 border-b border-emerald/10 bg-white/95 backdrop-blur">
      <div className="diasmag-container flex items-center justify-between gap-4 py-4">
        <Link href="/" className="text-2xl font-black tracking-tight text-emerald">
          DiasMag
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition ${active ? 'text-emerald' : 'text-dark hover:text-emerald'}`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {/* Sélecteur de langue */}
          <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 p-1">
            {routing.locales.map((nextLocale) => (
              <Link
                key={nextLocale}
                href={pathname}
                locale={nextLocale}
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${locale === nextLocale ? 'bg-emerald text-white' : 'text-slate-600 hover:text-emerald'}`}
              >
                {nextLocale}
              </Link>
            ))}
          </div>

          {/* Boutons auth */}
          {loading ? null : user ? (
            /* Utilisateur connecté → avatar + menu déroulant */
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald text-sm font-bold text-white"
                aria-label="Menu utilisateur"
              >
                {initials}
              </button>
              {userMenuOpen ? (
                <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-slate-100 bg-white py-2 shadow-lg">
                  <div className="border-b border-slate-100 px-4 py-2">
                    <p className="truncate text-xs text-slate-500">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-dark hover:bg-slate-50"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    {t('profile')}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      void signOut();
                      setUserMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-slate-50"
                  >
                    {t('signout')}
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            /* Utilisateur non connecté → boutons connexion / inscription */
            <>
              <Link href="/auth/login" className="diasmag-button-secondary text-sm">
                {t('signin')}
              </Link>
              <Link href="/auth/register" className="diasmag-button-primary text-sm">
                {t('signup')}
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex rounded-full border border-slate-200 p-2 text-dark lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Ouvrir le menu"
        >
          <span className="text-xl">☰</span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <div className="diasmag-container flex flex-col gap-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-dark hover:text-emerald"
                onClick={() => setOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="flex flex-wrap gap-2">
              {routing.locales.map((nextLocale) => (
                <Link
                  key={nextLocale}
                  href={pathname}
                  locale={nextLocale}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase ${locale === nextLocale ? 'border-emerald bg-emerald text-white' : 'border-slate-200 text-slate-600'}`}
                  onClick={() => setOpen(false)}
                >
                  {nextLocale}
                </Link>
              ))}
            </div>

            {/* Boutons auth mobile */}
            {!loading ? (
              user ? (
                <div className="space-y-2">
                  <p className="truncate text-xs text-slate-500">{user.email}</p>
                  <button
                    type="button"
                    onClick={() => {
                      void signOut();
                      setOpen(false);
                    }}
                    className="diasmag-button-secondary w-full text-sm text-red-500"
                  >
                    {t('signout')}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/auth/login"
                    className="diasmag-button-secondary text-center text-sm"
                    onClick={() => setOpen(false)}
                  >
                    {t('signin')}
                  </Link>
                  <Link
                    href="/auth/register"
                    className="diasmag-button-primary text-center text-sm"
                    onClick={() => setOpen(false)}
                  >
                    {t('signup')}
                  </Link>
                </div>
              )
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
