'use client';

import {useLocale, useTranslations} from 'next-intl';

import {Link, routing, usePathname} from '@/i18n/routing';

const footerItems = [
  {href: '/envoyer-argent', key: 'envoyer'},
  {href: '/demarches', key: 'demarches'},
  {href: '/apprendre', key: 'apprendre'},
  {href: '/recettes', key: 'recettes'},
  {href: '/actualites', key: 'actualites'},
  {href: '/voyager', key: 'voyager'},
  {href: '/mariage', key: 'mariage'}
] as const;

export default function Footer() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <footer className="border-t border-emerald/10 bg-dark text-white">
      <div className="diasmag-container grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="text-2xl font-black text-emerald">DiasMag</p>
          <p className="max-w-md text-sm text-slate-300">
            Le portail dédié à la diaspora maghrébine pour vivre, apprendre, voyager et entreprendre en Europe comme au Maghreb.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gold">Sections</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li>
              <Link href="/" className="hover:text-emerald">
                {t('home')}
              </Link>
            </li>
            {footerItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-emerald">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gold">Social</h3>
            <div className="flex flex-wrap gap-3 text-sm text-slate-300">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-emerald">
                Instagram
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-emerald">
                Facebook
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-emerald">
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gold">Langues</h3>
            <div className="flex flex-wrap gap-2">
              {routing.locales.map((nextLocale) => (
                <Link
                  key={nextLocale}
                  href={pathname}
                  locale={nextLocale}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase ${locale === nextLocale ? 'border-emerald bg-emerald text-white' : 'border-slate-700 text-slate-300 hover:border-emerald hover:text-emerald'}`}
                >
                  {nextLocale}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} DiasMag. Tous droits réservés.
      </div>
    </footer>
  );
}
