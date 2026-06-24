'use client';

import {useMemo, useState} from 'react';

type Locale = 'fr' | 'ar' | 'en';

// Taux de change mockés mais réalistes (1€ = X unités)
const TAUX_CHANGE = {
  MAD: 10.85, // 1€ = 10.85 MAD
  DZD: 145.2, // 1€ = 145.20 DZD
  TND: 3.38, // 1€ = 3.38 TND
  LYD: 4.95, // 1€ = 4.95 LYD
  MRU: 40.2 // 1€ = 40.20 MRU
} as const;

type Devise = keyof typeof TAUX_CHANGE;

const PAYS_INFO = {
  MAD: {nom: 'Maroc', devise: 'MAD', flag: '🇲🇦'},
  DZD: {nom: 'Algérie', devise: 'DZD', flag: '🇩🇿'},
  TND: {nom: 'Tunisie', devise: 'TND', flag: '🇹🇳'},
  LYD: {nom: 'Libye', devise: 'LYD', flag: '🇱🇾'},
  MRU: {nom: 'Mauritanie', devise: 'MRU', flag: '🇲🇷'}
} as const;

const PAYS = [
  {code: 'MAD', label: 'Maroc', flag: '🇲🇦', color: 'from-red-500 to-green-600'},
  {code: 'DZD', label: 'Algérie', flag: '🇩🇿', color: 'from-green-600 to-white'},
  {code: 'TND', label: 'Tunisie', flag: '🇹🇳', color: 'from-red-600 to-white'},
  {code: 'LYD', label: 'Libye', flag: '🇱🇾', color: 'from-black to-green-600'},
  {code: 'MRU', label: 'Mauritanie', flag: '🇲🇷', color: 'from-green-700 to-yellow-400'}
] as const;

// Données des services de transfert avec frais dynamiques
const SERVICES = [
  {
    nom: 'Wise',
    logo: '💚',
    // Frais dynamiques : 0.65% + 0.50€
    frais: (montant: number) => montant * 0.0065 + 0.5,
    tauxBonus: 1.0,
    delai: 'Instantané',
    note: 4.8,
    lienAffilie: 'https://wise.com/invite/diasmag',
    couleur: '#00B9FF'
  },
  {
    nom: 'Western Union',
    logo: '🟡',
    // Frais fixes selon le montant
    frais: (montant: number) => (montant < 200 ? 3.9 : 5.9),
    tauxBonus: 0.998,
    delai: '10 minutes',
    note: 4.2,
    lienAffilie: 'https://www.westernunion.com/?ref=diasmag',
    couleur: '#FFDD00'
  },
  {
    nom: 'Remitly',
    logo: '🔵',
    // Frais offerts au-delà de 500€
    frais: (montant: number) => (montant < 500 ? 2.99 : 0),
    tauxBonus: 0.997,
    delai: '3-5 minutes',
    note: 4.6,
    lienAffilie: 'https://remitly.com/fr/fr?ref=diasmag',
    couleur: '#1A4DE8'
  },
  {
    nom: 'MoneyGram',
    logo: '🔴',
    // Frais mixtes : 1.5% + 1.99€
    frais: (montant: number) => montant * 0.015 + 1.99,
    tauxBonus: 0.995,
    delai: '10 minutes',
    note: 4.0,
    lienAffilie: 'https://www.moneygram.com/?ref=diasmag',
    couleur: '#E2001A'
  }
] as const;

// Traductions multilingues
const copy = {
  fr: {
    title: 'Calculateur de transfert',
    description: "Comparez les frais, délais et taux des principaux services pour envoyer de l'argent vers le Maghreb.",
    amount: 'Montant à envoyer (€)',
    country: 'Pays destinataire',
    fee: 'Frais',
    delay: 'Délai',
    rating: 'Note',
    received: 'Montant reçu',
    send: 'Envoyer avec',
    bestDeal: '⭐ Meilleur deal',
    disclaimer: '* Les taux sont indicatifs et peuvent varier selon le moment et le mode de paiement.',
    summary: 'Meilleur deal',
    provider: 'Service'
  },
  ar: {
    title: 'حاسبة التحويل',
    description: 'قارن الرسوم والمدة وأسعار الصرف لأفضل خدمات التحويل نحو المغرب العربي.',
    amount: 'المبلغ المرسَل (€)',
    country: 'بلد الوجهة',
    fee: 'الرسوم',
    delay: 'المدة',
    rating: 'التقييم',
    received: 'المبلغ المستلَم',
    send: 'أرسل مع',
    bestDeal: '⭐ أفضل صفقة',
    disclaimer: '* الأسعار استرشادية وقد تتغير حسب الوقت وطريقة الدفع.',
    summary: 'أفضل صفقة',
    provider: 'الخدمة'
  },
  en: {
    title: 'Transfer calculator',
    description: 'Compare fees, delivery times and exchange rates across top services for sending money to the Maghreb.',
    amount: 'Amount to send (€)',
    country: 'Destination country',
    fee: 'Fees',
    delay: 'Delivery',
    rating: 'Rating',
    received: 'Amount received',
    send: 'Send with',
    bestDeal: '⭐ Best deal',
    disclaimer: '* Rates are indicative and may vary depending on the time and payment method.',
    summary: 'Best deal',
    provider: 'Service'
  }
} as const;

// Affiche les étoiles de notation
function StarRating({note}: {note: number}) {
  const full = Math.floor(note);
  const hasHalf = note % 1 >= 0.5;

  return (
    <span className="flex items-center gap-0.5 text-amber-400">
      {Array.from({length: full}, (_, i) => (
        <span key={i}>★</span>
      ))}
      {hasHalf ? <span>½</span> : null}
      <span className="ml-1 text-xs text-slate-500">{note}/5</span>
    </span>
  );
}

export default function ComparateurTransfert({locale}: {locale: Locale}) {
  const t = copy[locale] ?? copy.fr;
  const [montant, setMontant] = useState(250);
  const [devise, setDevise] = useState<Devise>('MAD');
  const montantSlider = Math.min(Math.max(montant, 1), 5000);

  // Calcul des résultats triés par montant reçu décroissant
  const resultats = useMemo(() => {
    return SERVICES.map((service) => {
      const frais = service.frais(montant);
      const montantNet = Math.max(0, montant - frais);
      const montantRecu = montantNet * TAUX_CHANGE[devise] * service.tauxBonus;
      return {...service, fraisCalcules: frais, montantRecu};
    }).sort((a, b) => b.montantRecu - a.montantRecu);
  }, [montant, devise]);

  const meilleur = resultats[0];

  return (
    <section className="space-y-8">
      {/* Calculateur — card vert émeraude */}
      <div className="rounded-3xl bg-emerald p-6 text-white">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{t.title}</h2>
          <p className="mt-1 text-sm text-emerald-100">{t.description}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Montant */}
          <label className="space-y-2 text-sm font-medium">
            <span>{t.amount}</span>
            <input
              type="number"
              min={1}
              max={10000}
              value={montant}
              onChange={(e) => setMontant(Math.min(Math.max(Number(e.target.value) || 0, 1), 10000))}
              onClick={(e) => (e.target as HTMLInputElement).select()}
              className="w-full cursor-text rounded-xl border-2 border-emerald-500 p-4 text-center text-3xl font-bold text-dark outline-none transition focus:ring-4 focus:ring-emerald-200"
              placeholder="100"
            />
            <input
              type="range"
              min={1}
              max={5000}
              value={montantSlider}
              onChange={(e) => setMontant(Math.min(Math.max(Number(e.target.value) || 0, 1), 5000))}
              className="w-full accent-emerald-500"
            />
          </label>

          {/* Pays destinataire */}
          <div className="space-y-2 text-sm font-medium">
            <span>{t.country}</span>
            <div className="flex flex-wrap justify-center gap-2">
              {PAYS.map((pays) => (
                <button
                  key={pays.code}
                  type="button"
                  onClick={() => setDevise(pays.code)}
                  className={`flex items-center gap-2 rounded-full border-2 px-4 py-2 font-medium transition-all ${
                    devise === pays.code
                      ? 'scale-105 border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-emerald-300'
                  }`}
                >
                  <span className="text-xl">{pays.flag}</span>
                  <span>{pays.label}</span>
                </button>
              ))}
            </div>
            <p className="text-center text-xs text-emerald-100">
              {PAYS_INFO[devise].flag} {PAYS_INFO[devise].nom} ({PAYS_INFO[devise].devise})
            </p>
          </div>
        </div>

        {/* Résumé meilleur deal */}
        {meilleur ? (
          <div className="mt-6 rounded-2xl bg-white/20 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-100">
              {t.summary}
            </p>
            <p className="mt-1 text-lg font-bold">
              {meilleur.logo} {meilleur.nom}
            </p>
            <p className="text-sm text-emerald-100">
              {t.received}:{' '}
              <span className="font-semibold text-white">
                {meilleur.montantRecu.toLocaleString('fr-FR', {maximumFractionDigits: 2})} {devise}
              </span>
            </p>
          </div>
        ) : null}
      </div>

      {/* Résultats — cards par service */}
      <div className="space-y-4">
        {resultats.map((service, index) => (
          <div
            key={service.nom}
            className={`diasmag-card overflow-hidden p-5 transition-all ${index === 0 ? 'ring-2 ring-emerald' : ''}`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Logo + nom + badge */}
              <div className="flex items-center gap-3">
                <span className="text-3xl">{service.logo}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-dark">{service.nom}</span>
                    {index === 0 ? (
                      <span className="rounded-full bg-emerald px-2 py-0.5 text-xs font-bold text-white">
                        {t.bestDeal}
                      </span>
                    ) : null}
                  </div>
                  <StarRating note={service.note} />
                </div>
              </div>

              {/* Détails */}
              <div className="grid grid-cols-3 gap-4 text-center text-sm sm:grid-cols-3">
                <div>
                  <p className="text-xs text-slate-500">{t.fee}</p>
                  <p className="font-semibold text-dark">€{service.fraisCalcules.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">{t.delay}</p>
                  <p className="font-semibold text-dark">{service.delai}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">{t.received}</p>
                  <p className="font-semibold text-emerald">
                    {service.montantRecu.toLocaleString('fr-FR', {maximumFractionDigits: 2})}{' '}
                    {devise}
                  </p>
                </div>
              </div>

              {/* Bouton affilié */}
              <a
                href={service.lienAffilie}
                target="_blank"
                rel="noopener noreferrer"
                className="diasmag-button-primary whitespace-nowrap text-center text-sm"
              >
                {t.send} {service.nom}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-slate-400">{t.disclaimer}</p>
    </section>
  );
}
