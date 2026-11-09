import { Lang } from './content/types';

// A nyelvi szalag a főoldalon.
export const MARQUEE: Record<Lang, string[]> = {
  hu: ['angol', 'német', 'francia', 'spanyol', 'orosz', 'olasz', 'kínai', 'arab', 'japán', 'holland'],
  en: ['English', 'German', 'French', 'Spanish', 'Russian', 'Italian', 'Chinese', 'Arabic', 'Japanese', 'Dutch'],
};

export const MAX_FILE_MB = 8;
/** A backenddel egyezően (quotes.max_total_kb, StoreQuoteRequest::MAX_FILES). */
export const MAX_TOTAL_MB = 20;
export const MAX_FILES = 5;
export const ACCEPTED_FILES = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.xlsx,.pptx';
