const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Domaines de confiance pour les images du projet
      {protocol: 'https', hostname: 'images.unsplash.com'},
      {protocol: 'https', hostname: 'upload.wikimedia.org'},
      {protocol: 'https', hostname: '*.supabase.co'},
      {protocol: 'https', hostname: '*.supabase.in'}
    ]
  }
};

module.exports = withNextIntl(nextConfig);
