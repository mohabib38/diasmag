import PrestatairesCard from '@/components/mariage/PrestatairesCard';

const copy = {
  fr: {
    title: 'Organiser un mariage maghrébin mémorable',
    description: 'Trouvez les meilleurs prestataires par catégorie et par ville, puis centralisez vos demandes de devis.'
  },
  ar: {
    title: 'نظّم زفافاً مغاربياً لا يُنسى',
    description: 'اعثر على أفضل المزوّدين حسب الفئة والمدينة واجمع طلبات عروض الأسعار في مكان واحد.'
  },
  en: {
    title: 'Plan a memorable Maghrebi wedding',
    description: 'Find top vendors by category and city, then centralize your quote requests in one place.'
  }
} as const;

export default function MariagePage({params: {locale}}: {params: {locale: 'fr' | 'ar' | 'en'}}) {
  const t = copy[locale] ?? copy.fr;

  return (
    <div className="diasmag-container space-y-10 py-12 lg:py-16">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald">Mariage & Events</p>
        <h1 className="mt-3 text-4xl font-black text-dark">{t.title}</h1>
        <p className="mt-4 text-lg text-slate-600">{t.description}</p>
      </section>
      <PrestatairesCard locale={locale} />
    </div>
  );
}
