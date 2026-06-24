import GuideAdmin from '@/components/demarches/GuideAdmin';

const copy = {
  fr: {
    title: 'Démarches administratives simplifiées',
    description: 'Accédez à des guides premium clairs, pensés pour les familles, étudiants, retraités et entrepreneurs de la diaspora.'
  },
  ar: {
    title: 'إجراءات إدارية مبسطة',
    description: 'احصل على أدلة مميزة وواضحة موجهة للعائلات والطلاب والمتقاعدين ورواد الأعمال.'
  },
  en: {
    title: 'Administrative steps made simple',
    description: 'Access clear premium guides tailored for diaspora families, students, retirees and entrepreneurs.'
  }
} as const;

export default function DemarchesPage({params: {locale}}: {params: {locale: 'fr' | 'ar' | 'en'}}) {
  const t = copy[locale] ?? copy.fr;

  return (
    <div className="diasmag-container space-y-10 py-12 lg:py-16">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald">Guides & PDFs</p>
        <h1 className="mt-3 text-4xl font-black text-dark">{t.title}</h1>
        <p className="mt-4 text-lg text-slate-600">{t.description}</p>
      </section>
      <GuideAdmin locale={locale} />
    </div>
  );
}
