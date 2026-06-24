import ComparateurTransfert from '@/components/envoyer-argent/ComparateurTransfert';

const copy = {
  fr: {
    title: "Envoyer de l'argent en toute confiance",
    description: 'Comparez les frais, délais et taux des principaux services de transfert pour optimiser chaque envoi vers le Maghreb.'
  },
  ar: {
    title: 'أرسل أموالك بثقة',
    description: 'قارن الرسوم والمدة وأسعار الصرف لأفضل خدمات التحويل نحو المغرب العربي.'
  },
  en: {
    title: 'Send money with confidence',
    description: 'Compare fees, delivery times and exchange rates across top transfer providers for the Maghreb.'
  }
} as const;

export default function EnvoyerArgentPage({params: {locale}}: {params: {locale: 'fr' | 'ar' | 'en'}}) {
  const t = copy[locale] ?? copy.fr;

  return (
    <div className="diasmag-container space-y-10 py-12 lg:py-16">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald">DiasMag Money</p>
        <h1 className="mt-3 text-4xl font-black text-dark">{t.title}</h1>
        <p className="mt-4 text-lg text-slate-600">{t.description}</p>
      </section>
      <ComparateurTransfert locale={locale} />
    </div>
  );
}
