'use client';

import {FormEvent, useMemo, useState} from 'react';

type Locale = 'fr' | 'ar' | 'en';

type News = {
  title: string;
  summary: string;
  source: string;
  date: string;
  country: 'Maroc' | 'Algérie' | 'Tunisie' | 'Diaspora';
};

const newsItems: News[] = [
  {title: 'Nouveaux espaces de coworking pour entrepreneurs maghrébins', summary: 'Des hubs ouvrent à Paris, Bruxelles et Casablanca pour connecter les talents de la diaspora.', source: 'DiasMag', date: '24 juin 2026', country: 'Diaspora'},
  {title: 'Le Maroc accélère ses services consulaires numériques', summary: 'Un nouveau portail simplifie les attestations et les rendez-vous pour les expatriés.', source: 'Rabat Tech', date: '22 juin 2026', country: 'Maroc'},
  {title: 'L’Algérie soutient les investissements de la diaspora', summary: 'Des mesures fiscales et un guichet unique sont annoncés pour les entrepreneurs.', source: 'Alger Business', date: '21 juin 2026', country: 'Algérie'},
  {title: 'Tunis renforce les liaisons estivales avec l’Europe', summary: 'Les dessertes aériennes et maritimes montent en puissance pour la haute saison.', source: 'Tunis Voyage', date: '19 juin 2026', country: 'Tunisie'},
  {title: 'Bourses linguistiques pour les jeunes franco-maghrébins', summary: 'Des programmes d’immersion en arabe, darija et amazigh attirent de nouveaux publics.', source: 'Diaspora Learning', date: '18 juin 2026', country: 'Diaspora'},
  {title: 'Modernisation des procédures notariales au Maroc', summary: 'Les familles vivant en Europe pourront déposer davantage de dossiers à distance.', source: 'Maghreb Juridique', date: '17 juin 2026', country: 'Maroc'}
];

const copy = {
  fr: {filter: 'Filtrer par territoire', signup: 'Newsletter diaspora', email: 'Votre email', button: 'S’abonner', success: 'Merci, vous êtes inscrit(e) à la newsletter.'},
  ar: {filter: 'التصفية حسب المنطقة', signup: 'النشرة البريدية للجالية', email: 'بريدك الإلكتروني', button: 'اشترك', success: 'شكراً، تم تسجيلك في النشرة البريدية.'},
  en: {filter: 'Filter by area', signup: 'Diaspora newsletter', email: 'Your email', button: 'Subscribe', success: 'Thanks, you are now subscribed to the newsletter.'}
} as const;

export default function NewsCard({locale}: {locale: Locale}) {
  const t = copy[locale] ?? copy.fr;
  const [filter, setFilter] = useState<'Tous' | News['country']>('Tous');
  const [subscribed, setSubscribed] = useState(false);

  const items = useMemo(
    () => newsItems.filter((item) => filter === 'Tous' || item.country === filter),
    [filter]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <section className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="diasmag-card p-6">
          <label className="block text-sm font-semibold text-dark">{t.filter}</label>
          <select value={filter} onChange={(event) => setFilter(event.target.value as typeof filter)} className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3 md:max-w-sm">
            <option value="Tous">Tous</option>
            <option value="Maroc">Maroc</option>
            <option value="Algérie">Algérie</option>
            <option value="Tunisie">Tunisie</option>
            <option value="Diaspora">Diaspora</option>
          </select>
        </div>

        <aside className="diasmag-card p-6">
          <h3 className="text-lg font-bold text-dark">{t.signup}</h3>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <input type="email" placeholder={t.email} className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
            <button type="submit" className="diasmag-button-primary w-full text-sm">
              {t.button}
            </button>
          </form>
          {subscribed ? <p className="mt-3 text-sm text-emerald">{t.success}</p> : null}
        </aside>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {items.map((item) => (
          <article key={item.title} className="diasmag-card overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-dark via-emerald/40 to-gold/50" />
            <div className="space-y-4 p-6">
              <span className="inline-flex rounded-full bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald">{item.country}</span>
              <h3 className="text-2xl font-bold text-dark">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.summary}</p>
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.25em] text-slate-400">
                <span>{item.source}</span>
                <span>{item.date}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
