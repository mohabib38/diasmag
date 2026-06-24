'use client';

import {useMemo, useState} from 'react';

type Locale = 'fr' | 'ar' | 'en';

type Flight = {
  airline: string;
  route: string;
  date: string;
  price: number;
  duration: string;
};

// Exemples de vols — à remplacer par une vraie intégration API (Skyscanner, Kiwi.com)
function nextWeekDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().slice(0, 10);
}

const flights: Flight[] = [
  {airline: 'Air Algérie', route: 'Paris → Alger', date: nextWeekDate(), price: 189, duration: '2h20'},
  {airline: 'Royal Air Maroc', route: 'Bruxelles → Casablanca', date: nextWeekDate(), price: 205, duration: '3h05'},
  {airline: 'Tunisair', route: 'Lyon → Tunis', date: nextWeekDate(), price: 176, duration: '2h15'},
  {airline: 'Ryanair', route: 'Marseille → Marrakech', date: nextWeekDate(), price: 99, duration: '2h55'},
  {airline: 'easyJet', route: 'Paris → Tunis', date: nextWeekDate(), price: 129, duration: '2h30'}
];

const copy = {
  fr: {origin: 'Ville de départ', destination: 'Ville d’arrivée', date: 'Date', search: 'Rechercher', results: 'Résultats', tips: 'Conseils voyage', affiliate: 'Réserver via partenaire'},
  ar: {origin: 'مدينة الانطلاق', destination: 'مدينة الوصول', date: 'التاريخ', search: 'بحث', results: 'النتائج', tips: 'نصائح السفر', affiliate: 'احجز عبر الشريك'},
  en: {origin: 'Origin city', destination: 'Destination city', date: 'Date', search: 'Search', results: 'Results', tips: 'Travel tips', affiliate: 'Book with partner'}
} as const;

export default function ComparateurVols({locale}: {locale: Locale}) {
  const t = copy[locale] ?? copy.fr;
  const [origin, setOrigin] = useState('Paris');
  const [destination, setDestination] = useState('Maghreb');
  const [date, setDate] = useState('2026-07-10');

  const filteredFlights = useMemo(
    () =>
      flights.filter((flight) => {
        const matchesOrigin = flight.route.toLowerCase().includes(origin.toLowerCase());
        const matchesDestination =
          destination === 'Maghreb' || flight.route.toLowerCase().includes(destination.toLowerCase());
        const matchesDate = !date || flight.date === date;
        return matchesOrigin && matchesDestination && matchesDate;
      }),
    [origin, destination, date]
  );

  return (
    <section className="space-y-8">
      <div className="diasmag-card p-6">
        <div className="grid gap-4 lg:grid-cols-4">
          <input value={origin} onChange={(event) => setOrigin(event.target.value)} placeholder={t.origin} className="rounded-2xl border border-slate-200 px-4 py-3" />
          <input value={destination} onChange={(event) => setDestination(event.target.value)} placeholder={t.destination} className="rounded-2xl border border-slate-200 px-4 py-3" />
          <input value={date} onChange={(event) => setDate(event.target.value)} type="date" className="rounded-2xl border border-slate-200 px-4 py-3" />
          <button type="button" className="diasmag-button-primary">{t.search}</button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-dark">{t.results}</h3>
          {filteredFlights.map((flight) => (
            <article key={`${flight.airline}-${flight.route}`} className="diasmag-card flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-lg font-semibold text-dark">{flight.airline}</p>
                <p className="text-sm text-slate-600">{flight.route} • {flight.date}</p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">{flight.duration}</span>
                <span className="text-xl font-black text-emerald">€{flight.price}</span>
                <div className="flex gap-2">
                  <a href="https://www.skyscanner.net" target="_blank" rel="noreferrer" className="diasmag-button-secondary text-sm">
                    Skyscanner
                  </a>
                  <a href="https://www.kiwi.com" target="_blank" rel="noreferrer" className="diasmag-button-primary text-sm">
                    {t.affiliate}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="diasmag-card p-6">
          <h3 className="text-xl font-bold text-dark">{t.tips}</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>• Réservez 6 à 8 semaines avant l’été pour les meilleurs tarifs.</li>
            <li>• Comparez les bagages inclus avant de choisir une compagnie low-cost.</li>
            <li>• Activez les alertes prix pour Casablanca, Alger, Tunis et Marrakech.</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
