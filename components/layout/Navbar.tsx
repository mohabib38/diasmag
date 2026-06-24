'use client';

import {useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';

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
          <button className="diasmag-button-secondary text-sm">{t('signin')}</button>
          <button className="diasmag-button-primary text-sm">{t('signup')}</button>
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
            <div className="grid grid-cols-2 gap-3">
              <button className="diasmag-button-secondary text-sm">{t('signin')}</button>
              <button className="diasmag-button-primary text-sm">{t('signup')}</button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
