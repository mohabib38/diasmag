import type {Metadata, Viewport} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {AuthProvider} from '@/components/auth/AuthProvider';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import {routing} from '@/i18n/routing';

import '../globals.css';

export const metadata: Metadata = {
  title: 'DiasMag - Portail de la Diaspora Maghrébine',
  description:
    "Votre portail tout-en-un pour la diaspora maghrébine : envoyer de l'argent, démarches, apprendre, recettes, actualités, voyager et mariage.",
  manifest: '/manifest.json'
};

export const viewport: Viewport = {
  themeColor: '#10b981'
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Activation du rendu localisé pour toutes les pages du portail.
  setRequestLocale(locale);

  const messages = await getMessages({locale});
  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body className="font-sans">
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
