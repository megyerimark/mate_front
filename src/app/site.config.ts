import { Lang } from './content/types';

// A nyitóképernyőn a részecskék sorban ezeket a szavakat formázzák meg.
export const HERO_WORDS: Record<Lang, { text: string; language: string }[]> = {
  hu: [
    { text: 'Fordítás', language: 'Magyar' },
    { text: 'Translation', language: 'Angol' },
    { text: 'Übersetzung', language: 'Német' },
    { text: 'Traduction', language: 'Francia' },
    { text: 'Traduzione', language: 'Olasz' },
    { text: 'Traducción', language: 'Spanyol' },
    { text: 'Vertaling', language: 'Holland' },
  ],
  en: [
    { text: 'Translation', language: 'English' },
    { text: 'Fordítás', language: 'Hungarian' },
    { text: 'Übersetzung', language: 'German' },
    { text: 'Traduction', language: 'French' },
    { text: 'Traduzione', language: 'Italian' },
    { text: 'Traducción', language: 'Spanish' },
    { text: 'Vertaling', language: 'Dutch' },
  ],
};

// A nyelvi szalag a főoldalon.
export const MARQUEE: Record<Lang, string[]> = {
  hu: ['angol', 'német', 'francia', 'spanyol', 'orosz', 'olasz', 'kínai', 'arab', 'japán', 'holland'],
  en: ['English', 'German', 'French', 'Spanish', 'Russian', 'Italian', 'Chinese', 'Arabic', 'Japanese', 'Dutch'],
};

export const MAX_FILE_MB = 8;
export const ACCEPTED_FILES = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.xlsx,.pptx';
