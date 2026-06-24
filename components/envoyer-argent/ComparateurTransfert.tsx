'use client';

import {useMemo, useState} from 'react';

type Locale = 'fr' | 'ar' | 'en';

type Provider = {
  name: string;
  fee: number;
  rate: number;
  delay: string;
  rating: string;
  affiliateUrl: string;
};

const providers: Provider[] = [
  {
    name: 'Western Union',
    fee: 4.99,
    rate: 10.62,
    delay: 'Quelques minutes',
    rating: '4.4/5',
    affiliateUrl: 'https://www.westernunion.com'
  },
  {
    name: 'Wise',
    fee: 2.15,
    rate: 10.94,
    delay: '0-24h',
    rating: '4.8/5',
    affiliateUrl: 'https://wise.com'
  },
  {
    name: 'Remitly',
    fee: 3.25,
    rate: 10.81,
    delay: 'En quelques heures',
    rating: '4.6/5',
    affiliateUrl: 'https://www.remitly.com'
  },
  {
    name: 'MoneyGram',
    fee: 5.5,
    rate: 10.57,
    delay: 'Le jour même',
    rating: '4.2/5',
    affiliateUrl: 'https://www.moneygram.com'
  }
];

const copy = {
  fr: {
    title: 'Comparateur de transfert',
    description: "Estimez rapidement la meilleure option pour envoyer de l'argent vers le Maroc, l'Algérie ou la Tunisie.",
    amount: 'Montant en EUR',
    country: 'Destination',
    fee: 'Frais',
    rate: 'Taux de change',
    delay: 'Délai',
    rating: 'Note',
    results: 'Montant reçu estimé',
    action: 'Voir l’offre',
    summary: 'Meilleure option du jour'
  },
  ar: {
    title: 'مقارنة تحويل الأموال',
    description: 'قدّر بسرعة أفضل خيار لإرسال الأموال إلى المغرب أو الجزائر أو تونس.',
    amount: 'المبلغ باليورو',
    country: 'الوجهة',
    fee: 'الرسوم',
    rate: 'سعر الصرف',
    delay: 'المدة',
    rating: 'التقييم',
    results: 'المبلغ المستلم المتوقع',
    action: 'عرض العرض',
    summary: 'أفضل خيار اليوم'
  },
  en: {
    title: 'Money transfer comparison',
    description: 'Quickly estimate the best option to send money to Morocco, Algeria or Tunisia.',
    amount: 'Amount in EUR',
    country: 'Destination',
    fee: 'Fees',
    rate: 'Exchange rate',
    delay: 'Delay',
    rating: 'Rating',
    results: 'Estimated received amount',
    action: 'View offer',
    summary: 'Best option today'
  }
} as const;

const destinationLabels = {
  fr: {MAD: 'Maroc (MAD)', DZD: 'Algérie (DZD)', TND: 'Tunisie (TND)'},
  ar: {MAD: 'المغرب (MAD)', DZD: 'الجزائر (DZD)', TND: 'تونس (TND)'},
  en: {MAD: 'Morocco (MAD)', DZD: 'Algeria (DZD)', TND: 'Tunisia (TND)'}
} as const;

const currencyMultipliers = {
  MAD: 1,
  DZD: 13.55,
  TND: 0.31
};

export default function ComparateurTransfert({locale}: {locale: Locale}) {
  const t = copy[locale] ?? copy.fr;
  const labels = destinationLabels[locale] ?? destinationLabels.fr;
  const [amount, setAmount] = useState(250);
  const [destination, setDestination] = useState<keyof typeof currencyMultipliers>('MAD');

  const results = useMemo(
    () =>
      providers.map((provider) => {
        const received = (amount - provider.fee) * provider.rate * currencyMultipliers[destination];
        return {
          ...provider,
          received
        };
      }),
    [amount, destination]
  );

  const bestProvider = [...results].sort((a, b) => b.received - a.received)[0];

  return (
    <section className="space-y-8">
      <div className="diasmag-card p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_220px]">
          <div>
            <h2 className="text-2xl font-bold text-dark">{t.title}</h2>
            <p className="mt-2 text-slate-600">{t.description}</p>
          </div>
          <div className="rounded-3xl bg-emerald/10 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald">{t.summary}</p>
            <p className="mt-3 text-lg font-bold text-dark">{bestProvider.name}</p>
            <p className="mt-1 text-sm text-slate-600">
              {t.results}: <span className="font-semibold text-emerald">{bestProvider.received.toFixed(2)} {destination}</span>
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-dark">
            <span>{t.amount}</span>
            <input
              type="number"
              min={50}
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value) || 0)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-emerald transition focus:ring-2"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-dark">
            <span>{t.country}</span>
            <select
              value={destination}
              onChange={(event) => setDestination(event.target.value as keyof typeof currencyMultipliers)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-emerald transition focus:ring-2"
            >
              {Object.entries(labels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-4 font-semibold">Provider</th>
                <th className="px-4 py-4 font-semibold">{t.fee}</th>
                <th className="px-4 py-4 font-semibold">{t.rate}</th>
                <th className="px-4 py-4 font-semibold">{t.delay}</th>
                <th className="px-4 py-4 font-semibold">{t.rating}</th>
                <th className="px-4 py-4 font-semibold">{t.results}</th>
                <th className="px-4 py-4 font-semibold" />
              </tr>
            </thead>
            <tbody>
              {results.map((provider) => (
                <tr key={provider.name} className="border-t border-slate-100 align-top">
                  <td className="px-4 py-4 font-semibold text-dark">{provider.name}</td>
                  <td className="px-4 py-4 text-slate-600">€{provider.fee.toFixed(2)}</td>
                  <td className="px-4 py-4 text-slate-600">{provider.rate}</td>
                  <td className="px-4 py-4 text-slate-600">{provider.delay}</td>
                  <td className="px-4 py-4 text-slate-600">{provider.rating}</td>
                  <td className="px-4 py-4 font-semibold text-emerald">{provider.received.toFixed(2)} {destination}</td>
                  <td className="px-4 py-4">
                    <a href={provider.affiliateUrl} target="_blank" rel="noreferrer" className="diasmag-button-secondary whitespace-nowrap text-sm">
                      {t.action}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
