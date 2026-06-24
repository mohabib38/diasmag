import CoursCard from '@/components/apprendre/CoursCard';

const copy = {
  fr: {
    title: 'Apprendre les langues du Maghreb',
    description: 'Progressez en Darija, Amazigh et arabe littéraire grâce à des parcours structurés et un abonnement premium à 4,99 €/mois.'
  },
  ar: {
    title: 'تعلّم لغات المغرب العربي',
    description: 'طوّر مستواك في الدارجة والأمازيغية والعربية الفصحى مع مسارات منظمة واشتراك مميز بـ 4.99 € شهرياً.'
  },
  en: {
    title: 'Learn the languages of the Maghreb',
    description: 'Improve your Darija, Amazigh and Modern Standard Arabic with structured learning paths and a €4.99/month premium plan.'
  }
} as const;

export default function ApprendrePage({params: {locale}}: {params: {locale: 'fr' | 'ar' | 'en'}}) {
  const t = copy[locale] ?? copy.fr;

  return (
    <div className="diasmag-container space-y-10 py-12 lg:py-16">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald">DiasMag Academy</p>
        <h1 className="mt-3 text-4xl font-black text-dark">{t.title}</h1>
        <p className="mt-4 text-lg text-slate-600">{t.description}</p>
      </section>
      <CoursCard locale={locale} />
    </div>
  );
}
