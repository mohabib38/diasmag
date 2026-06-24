import {getTranslations, setRequestLocale} from 'next-intl/server';

import HeroSection from '@/components/home/HeroSection';
import {Link} from '@/i18n/routing';

const sectionIcons = {
  envoyer: '💸',
  demarches: '📄',
  apprendre: '🎓',
  recettes: '🍲',
  actualites: '📰',
  voyager: '✈️',
  mariage: '💍'
} as const;

export default async function HomePage({
  params: {locale}
}: {
  params: {locale: string};
}) {
  setRequestLocale(locale);

  const hero = await getTranslations({locale, namespace: 'hero'});
  const sections = await getTranslations({locale, namespace: 'sections'});

  const sectionCards = [
    {key: 'envoyer', href: '/envoyer-argent'},
    {key: 'demarches', href: '/demarches'},
    {key: 'apprendre', href: '/apprendre'},
    {key: 'recettes', href: '/recettes'},
    {key: 'actualites', href: '/actualites'},
    {key: 'voyager', href: '/voyager'},
    {key: 'mariage', href: '/mariage'}
  ] as const;

  return (
    <>
      <HeroSection
        title={hero('title')}
        subtitle={hero('subtitle')}
        description={hero('description')}
        ctaStart={hero('cta_start')}
        ctaSignup={hero('cta_signup')}
        slogans={[
          'Votre maison numérique pour la diaspora maghrébine',
          'بوابتك اليومية بين أوروبا والمغرب العربي',
          'Your bridge between Europe and the Maghreb'
        ]}
      />

      <section className="diasmag-container py-16">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald">DiasMag</p>
          <h2 className="mt-3 text-3xl font-black text-dark sm:text-4xl">Un portail pensé pour chaque moment de vie</h2>
          <p className="mt-4 text-slate-600">
            Comparez, apprenez, cuisinez, voyagez et trouvez les bons partenaires grâce à une expérience claire, mobile-first et multilingue.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {sectionCards.map((section) => (
            <Link key={section.href} href={section.href} className="diasmag-card group p-6 transition hover:-translate-y-1 hover:border-emerald/30 hover:shadow-lg hover:shadow-emerald/10">
              <div className="text-4xl">{sectionIcons[section.key]}</div>
              <h3 className="mt-5 text-xl font-bold text-dark group-hover:text-emerald">
                {sections(`${section.key}.title`)}
              </h3>
              <p className="mt-3 text-sm text-slate-600">{sections(`${section.key}.desc`)}</p>
              <span className="mt-6 inline-flex text-sm font-semibold text-emerald">Explorer →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
