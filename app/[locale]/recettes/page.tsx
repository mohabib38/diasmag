import RecetteCard from '@/components/recettes/RecetteCard';

const copy = {
  fr: {
    title: 'Recettes maghrébines authentiques',
    description: 'Retrouvez des plats familiaux du Maroc, de l’Algérie et de la Tunisie, avec filtres pratiques et espace sponsorisable.'
  },
  ar: {
    title: 'وصفات مغاربية أصيلة',
    description: 'اكتشف أطباقاً عائلية من المغرب والجزائر وتونس مع فلاتر عملية ومساحة إعلانية.'
  },
  en: {
    title: 'Authentic Maghrebi recipes',
    description: 'Discover family dishes from Morocco, Algeria and Tunisia with practical filters and a sponsor-ready area.'
  }
} as const;

export default function RecettesPage({params: {locale}}: {params: {locale: 'fr' | 'ar' | 'en'}}) {
  const t = copy[locale] ?? copy.fr;

  return (
    <div className="diasmag-container space-y-10 py-12 lg:py-16">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald">Cuisine & Culture</p>
        <h1 className="mt-3 text-4xl font-black text-dark">{t.title}</h1>
        <p className="mt-4 text-lg text-slate-600">{t.description}</p>
      </section>
      <div className="diasmag-card border-dashed border-gold/40 bg-gold/10 p-6 text-center text-sm font-medium text-amber-700">
        Emplacement Google AdSense — 970x250
      </div>
      <RecetteCard locale={locale} />
    </div>
  );
}
