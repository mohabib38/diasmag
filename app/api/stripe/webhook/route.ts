import {NextResponse} from 'next/server';
import type Stripe from 'stripe';

import {stripe} from '@/lib/stripe';

export const runtime = 'nodejs';

// Webhook Stripe prêt à recevoir les événements de paiement et d'abonnement.
export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !signature || !webhookSecret) {
    return NextResponse.json(
      {received: false, message: 'Configuration Stripe incomplète.'},
      {status: 400}
    );
  }

  const payload = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Signature Stripe invalide.';
    return NextResponse.json({received: false, message}, {status: 400});
  }

  switch (event.type) {
    case 'checkout.session.completed':
    case 'customer.subscription.created':
    case 'invoice.payment_succeeded':
      break;
    default:
      break;
  }

  return NextResponse.json({received: true, type: event.type});
}

export async function GET() {
  return NextResponse.json({status: 'ok', endpoint: 'stripe-webhook'});
}
