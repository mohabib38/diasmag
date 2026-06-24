'use client';

import {FormEvent, useMemo, useState} from 'react';

type Locale = 'fr' | 'ar' | 'en';

type Provider = {
  name: string;
  category: string;
  city: 'Paris' | 'Lyon' | 'Marseille' | 'Bruxelles' | 'Montréal';
  price: string;
  reviews: string;
};

const providers: Provider[] = [
  {name: 'Palais Atlas', category: 'Salles de fête', city: 'Paris', price: 'À partir de 2 900 €', reviews: '4.8/5'},
  {name: 'Noor Studio', category: 'Photographes', city: 'Bruxelles', price: 'À partir de 1 200 €', reviews: '4.9/5'},
  {name: 'Dj Casbah', category: 'DJ/Musiciens', city: 'Marseille', price: 'À partir de 850 €', reviews: '4.7/5'},
  {name: 'Halal Saveurs', category: 'Traiteurs halal', city: 'Lyon', price: 'À partir de 38 €/pers', reviews: '4.8/5'},
  {name: 'Maison Yasmine', category: 'Robes de mariée', city: 'Montréal', price: 'À partir de 1 600 €', reviews: '4.6/5'},
  {name: 'Fleurs du Jasmin', category: 'Décoration florale', city: 'Paris', price: 'À partir de 790 €', reviews: '4.8/5'},
  {name: 'Glam Maghreb', category: 'Maquillage/Coiffure', city: 'Bruxelles', price: 'À partir de 480 €', reviews: '4.9/5'}
];

const copy = {
  fr: {
    category: 'Catégorie',
    city: 'Ville',
    quote: 'Demander un devis',
    subscribe: 'Abonnement pro 29 €/mois',
    free: 'Inscription gratuite pour les futurs mariés',
    success: 'Merci, votre demande de devis a été envoyée.'
  },
  ar: {
    category: 'الفئة',
    city: 'المدينة',
    quote: 'طلب عرض سعر',
    subscribe: 'اشتراك مهني 29 € / شهر',
    free: 'التسجيل مجاني للأزواج',
    success: 'شكراً، تم إرسال طلب عرض السعر.'
  },
  en: {
    category: 'Category',
    city: 'City',
    quote: 'Request a quote',
    subscribe: 'Pro subscription €29/month',
    free: 'Free sign-up for couples',
    success: 'Thanks, your quote request has been sent.'
  }
} as const;

const categories = [
  'Toutes',
  'Salles de fête',
  'Photographes',
  'DJ/Musiciens',
  'Traiteurs halal',
  'Robes de mariée',
  'Décoration florale',
  'Maquillage/Coiffure'
] as const;

const cities = ['Toutes', 'Paris', 'Lyon', 'Marseille', 'Bruxelles', 'Montréal'] as const;

export default function PrestatairesCard({locale}: {locale: Locale}) {
  const t = copy[locale] ?? copy.fr;
  const [category, setCategory] = useState<(typeof categories)[number]>('Toutes');
  const [city, setCity] = useState<(typeof cities)[number]>('Toutes');
  const [sent, setSent] = useState(false);

  const filteredProviders = useMemo(
    () =>
      providers.filter(
        (provider) =>
          (category === 'Toutes' || provider.category === category) &&
          (city === 'Toutes' || provider.city === city)
      ),
    [category, city]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section className="space-y-8">
      <div className="diasmag-card p-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <select value={category} onChange={(event) => setCategory(event.target.value as (typeof categories)[number])} className="rounded-2xl border border-slate-200 px-4 py-3">
            {categories.map((item) => (
              <option key={item} value={item}>{t.category}: {item}</option>
            ))}
          </select>
          <select value={city} onChange={(event) => setCity(event.target.value as (typeof cities)[number])} className="rounded-2xl border border-slate-200 px-4 py-3">
            {cities.map((item) => (
              <option key={item} value={item}>{t.city}: {item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="grid gap-6 md:grid-cols-2">
          {filteredProviders.map((provider) => (
            <article key={provider.name} className="diasmag-card overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-gold/20 via-white to-emerald/20" />
              <div className="space-y-4 p-6">
                <div>
                  <h3 className="text-xl font-bold text-dark">{provider.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{provider.category} • {provider.city}</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-emerald">{provider.price}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">{provider.reviews}</span>
                </div>
                <button className="diasmag-button-primary w-full text-sm">{t.quote}</button>
              </div>
            </article>
          ))}
        </div>

        <aside className="diasmag-card p-6">
          <p className="rounded-full bg-emerald/10 px-4 py-2 text-sm font-semibold text-emerald">{t.free}</p>
          <p className="mt-4 rounded-full bg-gold/15 px-4 py-2 text-sm font-semibold text-amber-700">{t.subscribe}</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Nom" />
            <input type="email" className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Email" />
            <textarea className="min-h-32 w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Décrivez votre besoin" />
            <button type="submit" className="diasmag-button-secondary w-full text-sm">{t.quote}</button>
          </form>
          {sent ? <p className="mt-4 text-sm text-emerald">{t.success}</p> : null}
        </aside>
      </div>
    </section>
  );
}
