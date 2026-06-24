import ComparateurVols from '@/components/voyager/ComparateurVols';

const copy = {
  fr: {
    title: 'Voyager entre Europe et Maghreb',
    description: 'Préparez vos vacances, vos visites familiales et vos déplacements professionnels avec un comparateur simple et inspirant.'
  },
  ar: {
    title: 'السفر بين أوروبا والمغرب العربي',
    description: 'حضّر عطلتك وزياراتك العائلية ورحلات العمل عبر مقارن رحلات واضح وملهم.'
  },
  en: {
    title: 'Travel between Europe and the Maghreb',
    description: 'Plan holidays, family visits and business trips with a simple and inspiring flight comparison experience.'
  }
} as const;

export default function VoyagerPage({params: {locale}}: {params: {locale: 'fr' | 'ar' | 'en'}}) {
  const t = copy[locale] ?? copy.fr;

  return (
    <div className="diasmag-container space-y-10 py-12 lg:py-16">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald">Flights & Tips</p>
        <h1 className="mt-3 text-4xl font-black text-dark">{t.title}</h1>
        <p className="mt-4 text-lg text-slate-600">{t.description}</p>
      </section>
      <ComparateurVols locale={locale} />
    </div>
  );
}
