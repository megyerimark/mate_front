import { AdminQuote } from './admin-api.service';

/**
 * Válaszsablonok az admin felülethez: egy kattintással előre kitöltött e-mailt nyitnak a levelezőprogramban.
 * Az ügyfél nyelvén (magyar vagy angol oldalról jött), a szöveg küldés előtt szabadon átírható.
 * Ha a szövegeken változtatni kell, itt tedd.
 */
export interface ReplyTemplate {
  key: 'quote' | 'missing' | 'confirm' | 'followUp';
  label: string;
  /** Ha nincs meg minden adat a sablonhoz, ez jelenik meg a gomb mellett. */
  needs?: (q: AdminQuote) => string | null;
  subject: (q: AdminQuote) => string;
  body: (q: AdminQuote) => string;
}

const SIGNATURE = '\n\nÜdvözlettel,\nDONE Translations\n+36 30 857 6652\ninfo@donetranslations.hu';
const SIGNATURE_EN = '\n\nKind regards,\nDONE Translations\n+36 30 857 6652\ninfo@donetranslations.hu';

const huf = (n: number | null, en = false) =>
  n === null ? '' : `${new Intl.NumberFormat(en ? 'en-GB' : 'hu-HU').format(n)} ${en ? 'HUF' : 'Ft'}`;

const pair = (q: AdminQuote) => [q.source_language, q.target_language].filter(Boolean).join(' → ');

const DEADLINES_EN: Record<string, string> = {
  normal: 'standard (2–5 working days)',
  urgent: 'urgent (1–2 working days)',
  express: 'express (even on the same day)',
};

const needsPrice = (q: AdminQuote) => (q.price === null ? 'Előbb add meg az árat.' : null);

const HU: ReplyTemplate[] = [
  {
    key: 'quote',
    label: 'Árajánlat',
    needs: needsPrice,
    subject: (q) => `Árajánlat${pair(q) ? ' – ' + pair(q) + ' fordítás' : ''}`,
    body: (q) =>
      `Kedves ${q.name}!\n\nKöszönjük az ajánlatkérését, árajánlatunk a következő:` +
      `\n\nSzolgáltatás: ${q.service_label}` +
      (pair(q) ? `\nNyelv(ek): ${pair(q)}` : '') +
      `\nDíj: ${huf(q.price)}` +
      `\nHatáridő: ${q.deadline_label}` +
      `\n\nHa elfogadja ajánlatunkat, kérjük, jelezze válasz e-mailben, és a szakfordító kollégánk azonnal megkezdi a munkát.` +
      SIGNATURE,
  },
  {
    key: 'missing',
    label: 'Hiányzó adat',
    subject: () => 'Ajánlatkérés – néhány kérdés',
    body: (q) =>
      `Kedves ${q.name}!\n\nKöszönjük az ajánlatkérését. Az árajánlat elkészítéséhez szükségünk lenne még néhány információra:` +
      `\n\n- ${q.has_document ? 'Milyen nyelvre kéri a fordítást?' : 'Kérjük, küldje el a lefordítandó dokumentumot (telefonos fotó is megfelel).'}` +
      `\n- Milyen célra lesz szükség a fordításra?` +
      SIGNATURE,
  },
  {
    key: 'confirm',
    label: 'Megrendelés visszaigazolása',
    subject: () => 'Megrendelés visszaigazolása',
    body: (q) =>
      `Kedves ${q.name}!\n\nKöszönjük a megrendelését! A fordítást megkezdtük, és a megbeszélt határidőn belül e-mailben küldjük meg Önnek.` +
      (q.price !== null ? `\n\nA fordítás díja: ${huf(q.price)}.` : '') +
      SIGNATURE,
  },
  {
    key: 'followUp',
    label: 'Utánkövetés',
    subject: () => 'Árajánlatunkkal kapcsolatban',
    body: (q) =>
      `Kedves ${q.name}!\n\nNéhány napja elküldtük Önnek árajánlatunkat${pair(q) ? ' (' + pair(q) + ' fordítás)' : ''}. ` +
      `Szeretnénk megkérdezni, sikerült-e átnéznie, és van-e esetleg kérdése vele kapcsolatban.` +
      `\n\nHa megrendeli, a szakfordító kollégánk azonnal megkezdi a munkát.` +
      SIGNATURE,
  },
];

const EN: ReplyTemplate[] = [
  {
    key: 'quote',
    label: 'Árajánlat',
    needs: needsPrice,
    subject: (q) => `Quote${pair(q) ? ' – ' + pair(q) + ' translation' : ''}`,
    body: (q) =>
      `Dear ${q.name},\n\nThank you for your request. Please find our quote below:` +
      (pair(q) ? `\n\nLanguage(s): ${pair(q)}` : '\n') +
      `\nPrice: ${huf(q.price, true)}` +
      `\nDeadline: ${DEADLINES_EN[q.deadline] ?? q.deadline_label}` +
      `\n\nIf you accept our quote, please reply to this email and our translator will start working right away.` +
      SIGNATURE_EN,
  },
  {
    key: 'missing',
    label: 'Hiányzó adat',
    subject: () => 'Your quote request – a few questions',
    body: (q) =>
      `Dear ${q.name},\n\nThank you for your request. To prepare your quote, we need a little more information:` +
      `\n\n- ${q.has_document ? 'Which language would you like the text translated into?' : 'Please send us the document to be translated (a phone photo is fine).'}` +
      `\n- What will the translation be used for?` +
      SIGNATURE_EN,
  },
  {
    key: 'confirm',
    label: 'Megrendelés visszaigazolása',
    subject: () => 'Order confirmation',
    body: (q) =>
      `Dear ${q.name},\n\nThank you for your order! We have started the translation and will send it to you by email within the agreed deadline.` +
      (q.price !== null ? `\n\nPrice: ${huf(q.price, true)}.` : '') +
      SIGNATURE_EN,
  },
  {
    key: 'followUp',
    label: 'Utánkövetés',
    subject: () => 'Regarding our quote',
    body: (q) =>
      `Dear ${q.name},\n\nA few days ago we sent you our quote${pair(q) ? ' for the ' + pair(q) + ' translation' : ''}. ` +
      `We would like to ask whether you have had a chance to look at it, and whether you have any questions.` +
      `\n\nIf you place the order, our translator will start working right away.` +
      SIGNATURE_EN,
  },
];

export function replyTemplates(q: AdminQuote): ReplyTemplate[] {
  return q.locale === 'en' ? EN : HU;
}

export function mailto(q: AdminQuote, t: ReplyTemplate): string {
  return `mailto:${q.email}?subject=${encodeURIComponent(t.subject(q))}&body=${encodeURIComponent(t.body(q))}`;
}
