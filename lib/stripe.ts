import Stripe from 'stripe';

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      // @ts-expect-error La version Stripe du SDK est plus récente que la cible demandée.
      apiVersion: '2024-06-20'
    })
  : null;

export const STRIPE_PRICES = {
  PREMIUM_MONTHLY: process.env.STRIPE_PREMIUM_PRICE_ID || 'price_premium_monthly',
  PDF_GUIDE: process.env.STRIPE_PDF_PRICE_ID || 'price_pdf_guide',
  PRO_PRESTATAIRE: process.env.STRIPE_PRO_PRICE_ID || 'price_pro_prestataire'
};
