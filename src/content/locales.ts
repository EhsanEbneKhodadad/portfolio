import { profile } from './profile';
import { fa } from './fa';
import { tr } from './tr';
import type { Locale } from '@/lib/i18n';

export const identities = {
  en: profile,
  fa,
  tr,
} satisfies Record<Locale, { name: string; role: string; bio: string }>;
