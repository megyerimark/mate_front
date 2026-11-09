import { Lang } from './content/types';

// A nyelvi szalag a főoldalon.
export const MARQUEE: Record<Lang, string[]> = {
  hu: ['angol', 'német', 'francia', 'spanyol', 'orosz', 'olasz', 'kínai', 'arab', 'japán', 'holland'],
  en: ['English', 'German', 'French', 'Spanish', 'Russian', 'Italian', 'Chinese', 'Arabic', 'Japanese', 'Dutch'],
};

export const MAX_FILE_MB = 8;
export const ACCEPTED_FILES = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.xlsx,.pptx';
