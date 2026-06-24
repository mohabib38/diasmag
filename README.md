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

## Authentification Supabase

### Configuration de la base de données

Exécutez ce SQL dans votre projet Supabase (Dashboard → SQL Editor) :

```sql
-- Table profils utilisateurs
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger auto-création de profil à chaque inscription
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

### Fonctionnalités d'authentification

- Inscription email + mot de passe avec validation (min. 8 caractères)
- Connexion email + mot de passe
- Connexion Google OAuth (`supabase.auth.signInWithOAuth`)
- Déconnexion
- Persistance de session via `@supabase/ssr` (middleware)
- Messages d'erreur traduits en français
- Redirection vers la page d'accueil après connexion

### Activer Google OAuth dans Supabase

1. Dashboard Supabase → Authentication → Providers → Google
2. Activer Google et renseigner `Client ID` et `Client Secret` (depuis Google Cloud Console)
3. Ajouter `https://votre-domaine.com/auth/callback` dans les URLs autorisées



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
