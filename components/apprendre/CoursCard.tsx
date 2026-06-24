'use client';

import {useState} from 'react';
import {loadStripe} from '@stripe/stripe-js';

type Locale = 'fr' | 'ar' | 'en';

type Course = {
  title: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  previewLessons: number;
  progress: number;
  accent: string;
};

const courses: Course[] = [
  {title: 'Darija', level: 'Débutant', previewLessons: 3, progress: 24, accent: 'bg-emerald/10 text-emerald'},
  {title: 'Amazigh', level: 'Intermédiaire', previewLessons: 3, progress: 57, accent: 'bg-gold/15 text-amber-700'},
  {title: 'Arabe littéraire', level: 'Avancé', previewLessons: 3, progress: 78, accent: 'bg-slate-100 text-slate-700'}
];

const copy = {
  fr: {
    preview: 'leçons gratuites',
    subscribe: 'Souscrire à 4,99 €/mois',
    statusReady: 'Stripe est prêt pour la souscription premium.',
    statusMissing: 'Ajoutez NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY pour activer Stripe.',
    badge: 'Abonnement Premium'
  },
  ar: {
    preview: 'دروس مجانية',
    subscribe: 'اشترك مقابل 4.99 € / شهر',
    statusReady: 'Stripe جاهز للاشتراك المميز.',
    statusMissing: 'أضف NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY لتفعيل Stripe.',
    badge: 'اشتراك مميز'
  },
  en: {
    preview: 'free lessons',
    subscribe: 'Subscribe for €4.99/month',
    statusReady: 'Stripe is ready for the premium subscription.',
    statusMissing: 'Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to enable Stripe.',
    badge: 'Premium subscription'
  }
} as const;

export default function CoursCard({locale}: {locale: Locale}) {
  const t = copy[locale] ?? copy.fr;
  const [status, setStatus] = useState('');

  const handleSubscribe = async () => {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!publishableKey) {
      setStatus(t.statusMissing);
      return;
    }

    await loadStripe(publishableKey);
    setStatus(t.statusReady);
  };

  return (
    <section className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {courses.map((course) => (
          <article key={course.title} className="diasmag-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-dark">{course.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{course.level}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${course.accent}`}>{t.badge}</span>
            </div>
            <p className="mt-6 text-sm text-slate-600">{course.previewLessons} {t.preview}</p>
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
                <span>Progression</span>
                <span>{course.progress}%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100">
                <div className="h-3 rounded-full bg-emerald" style={{width: `${course.progress}%`}} />
              </div>
            </div>
            <button type="button" onClick={handleSubscribe} className="diasmag-button-primary mt-6 w-full text-sm">
              {t.subscribe}
            </button>
          </article>
        ))}
      </div>
      {status ? <p className="text-sm text-emerald">{status}</p> : null}
    </section>
  );
}
