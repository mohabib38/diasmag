import NewsCard from '@/components/actualites/NewsCard';

const copy = {
  fr: {
    title: 'Actualités du Maghreb et de la diaspora',
    description: 'Un panorama éditorial pour suivre les initiatives, opportunités et tendances qui comptent pour les communautés maghrébines.'
  },
  ar: {
    title: 'أخبار المغرب العربي والجالية',
    description: 'متابعة تحريرية للمبادرات والفرص والاتجاهات التي تهم المجتمعات المغاربية.'
  },
  en: {
    title: 'News from the Maghreb and the diaspora',
    description: 'An editorial overview of the initiatives, opportunities and trends shaping Maghrebi communities worldwide.'
  }
} as const;

export default function ActualitesPage({params: {locale}}: {params: {locale: 'fr' | 'ar' | 'en'}}) {
  const t = copy[locale] ?? copy.fr;

  return (
    <div className="diasmag-container space-y-10 py-12 lg:py-16">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald">Magazine & Newsletter</p>
        <h1 className="mt-3 text-4xl font-black text-dark">{t.title}</h1>
        <p className="mt-4 text-lg text-slate-600">{t.description}</p>
      </section>
      <div className="diasmag-card border-dashed border-gold/40 bg-gold/10 p-6 text-center text-sm font-medium text-amber-700">
        Emplacement Google AdSense — 728x90
      </div>
      <NewsCard locale={locale} />
    </div>
  );
}
