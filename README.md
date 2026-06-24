# DiasMag

DiasMag est un portail Next.js 14 multilingue dédié à la diaspora maghrébine. Il réunit dans une seule expérience : transferts d'argent, guides administratifs, apprentissage linguistique, recettes, actualités, voyages et mariage.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- next-intl v4
- Supabase
- Stripe
- OpenAI

## Installation

1. Installer les dépendances :
   ```bash
   npm install
   ```
2. Copier le fichier d'environnement :
   ```bash
   cp .env.example .env.local
   ```
3. Renseigner les clés Supabase, Stripe et OpenAI.
4. Lancer le projet :
   ```bash
   npm run dev
   ```
5. Ouvrir [http://localhost:3000](http://localhost:3000).

## Sections du portail

- **Accueil** : présentation de la plateforme et accès rapide aux rubriques.
- **Envoyer de l'argent** : comparateur de frais, taux et délais avec liens affiliés.
- **Démarches** : guides premium PDF et formulaire de contact.
- **Apprendre** : parcours Darija, Amazigh et arabe littéraire avec abonnement premium.
- **Recettes** : recettes filtrables du Maroc, d'Algérie et de Tunisie.
- **Actualités** : veille éditoriale, filtre par territoire et inscription newsletter.
- **Voyager** : comparateur de vols Maghreb ↔ Europe avec conseils pratiques.
- **Mariage** : annuaire de prestataires, devis et abonnement pro.

## Internationalisation

Les locales disponibles sont :

- `fr`
- `ar`
- `en`

Le routage est géré par `next-intl` v4 via `i18n/routing.ts`, `i18n/request.ts` et `middleware.ts`.

## Variables d'environnement

Consultez `.env.example` pour la liste complète. Les variables principales sont :

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `OPENAI_API_KEY`

## Déploiement sur Vercel

1. Pousser le dépôt sur GitHub.
2. Importer le projet dans Vercel.
3. Ajouter toutes les variables d'environnement de `.env.example` dans l'interface Vercel.
4. Définir le webhook Stripe sur `/api/stripe/webhook`.
5. Déployer : Vercel détecte automatiquement Next.js 14.

## Structure principale

```text
app/[locale]         Pages localisées
components/          Composants métier et UI
messages/            Fichiers de traduction JSON
lib/                 Clients Supabase, Stripe et OpenAI
i18n/                Routage et configuration next-intl
public/manifest.json Configuration PWA
```

## Notes

- Les contenus sont mockés pour accélérer le prototypage.
- Les intégrations Stripe et Supabase sont prêtes à être connectées avec vos clés réelles.
- Le design utilise la palette émeraude, or, blanc et gris foncé avec la police Inter.
