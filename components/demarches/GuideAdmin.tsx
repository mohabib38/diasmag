'use client';

import {FormEvent, useState} from 'react';
import {loadStripe} from '@stripe/stripe-js';

type Locale = 'fr' | 'ar' | 'en';

type Guide = {
  title: string;
  description: string;
};

const guides: Guide[] = [
  {
    title: 'Double nationalité',
    description: 'Conditions, délais, documents à réunir et erreurs fréquentes.'
  },
  {
    title: 'Visa',
    description: 'Checklist complète pour les visas familiaux, étudiants et affaires.'
  },
  {
    title: 'Héritage',
    description: 'Comprendre les successions transfrontalières et les notaires compétents.'
  },
  {
    title: 'Retraite',
    description: 'Valider vos trimestres, pensions et conventions bilatérales.'
  },
  {
    title: 'Permis de conduire étranger',
    description: 'Échange, reconnaissance et démarches selon votre pays de résidence.'
  }
];

const copy = {
  fr: {
    title: 'Guides administratifs premium',
    description: 'Des fiches pratiques conçues pour la diaspora, avec un paiement unique de 9,99 € par guide.',
    button: 'Télécharger PDF Premium',
    secure: 'Paiement sécurisé Stripe • 9,99 €',
    contact: 'Poser une question',
    name: 'Nom',
    email: 'Email',
    message: 'Votre demande',
    send: 'Envoyer',
    ready: 'Intégration Stripe prête. Connectez vos clés pour activer le paiement.',
    missing: 'Ajoutez NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY pour activer le bouton Stripe.'
  },
  ar: {
    title: 'أدلة إدارية مميزة',
    description: 'بطاقات عملية مخصصة للجالية مع دفعة واحدة بقيمة 9.99 يورو لكل دليل.',
    button: 'تحميل PDF مميز',
    secure: 'دفع آمن عبر Stripe • 9.99 €',
    contact: 'اطرح سؤالاً',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    message: 'طلبك',
    send: 'إرسال',
    ready: 'تكامل Stripe جاهز. أضف مفاتيحك لتفعيل الدفع.',
    missing: 'أضف NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY لتفعيل زر Stripe.'
  },
  en: {
    title: 'Premium admin guides',
    description: 'Practical guides built for the diaspora with a one-time €9.99 payment per guide.',
    button: 'Download Premium PDF',
    secure: 'Secure Stripe payment • €9.99',
    contact: 'Ask a question',
    name: 'Name',
    email: 'Email',
    message: 'Your request',
    send: 'Send',
    ready: 'Stripe integration is ready. Connect your keys to enable payments.',
    missing: 'Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to enable the Stripe button.'
  }
} as const;

export default function GuideAdmin({locale}: {locale: Locale}) {
  const t = copy[locale] ?? copy.fr;
  const [status, setStatus] = useState('');
  const [sent, setSent] = useState(false);

  const handleStripe = async () => {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!publishableKey) {
      setStatus(t.missing);
      return;
    }

    await loadStripe(publishableKey);
    setStatus(t.ready);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section className="space-y-8">
      <div className="diasmag-card p-6">
        <h2 className="text-2xl font-bold text-dark">{t.title}</h2>
        <p className="mt-2 text-slate-600">{t.description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {guides.map((guide) => (
            <article key={guide.title} className="diasmag-card flex h-full flex-col p-6">
              <h3 className="text-xl font-semibold text-dark">{guide.title}</h3>
              <p className="mt-3 flex-1 text-sm text-slate-600">{guide.description}</p>
              <button type="button" onClick={handleStripe} className="diasmag-button-primary mt-6 text-sm">
                {t.button}
              </button>
              <p className="mt-3 text-xs uppercase tracking-[0.25em] text-gold">{t.secure}</p>
            </article>
          ))}
        </div>

        <aside className="diasmag-card p-6">
          <h3 className="text-xl font-semibold text-dark">{t.contact}</h3>
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder={t.name} />
            <input type="email" className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder={t.email} />
            <textarea className="min-h-32 w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder={t.message} />
            <button type="submit" className="diasmag-button-secondary w-full text-sm">
              {t.send}
            </button>
          </form>
          {status ? <p className="mt-4 text-sm text-emerald">{status}</p> : null}
          {sent ? <p className="mt-2 text-sm text-slate-600">Merci, notre équipe vous recontactera rapidement.</p> : null}
        </aside>
      </div>
    </section>
  );
}
