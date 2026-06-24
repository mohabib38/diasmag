import {createNavigation} from 'next-intl/navigation';
import {defineRouting} from 'next-intl/routing';

// Configuration centralisée des locales et des helpers de navigation.
export const routing = defineRouting({
  locales: ['fr', 'ar', 'en'],
  defaultLocale: 'fr'
});

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
