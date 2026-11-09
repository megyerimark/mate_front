// Az oldalak angol változata: a magyar szövegek (pages.hu.ts) fordítása, ugyanabban a szerkezetben.
import { HomeContent, PageContent, PageKey } from './types';

const WHY = 'Why choose us?';
const WHY_ITEMS = [
  {
    icon: 'award',
    title: 'Professionalism',
    text: [
      'Every member of our team is a qualified translator. Professionalism matters a great deal to our agency, so every translation is done by a specialist translator who knows the subject of the text, whether it is a technical, financial or legal document.',
    ],
  },
  {
    icon: 'quality',
    title: 'Quality',
    text: [
      'At our agency, at least two professional translators work on every translation project. This double quality-control system lets us avoid errors in the finished translation, so every translation reaches our clients in the high quality they expect from us. We hold our translators to high professional standards, which is a further guarantee of quality.',
    ],
  },
  {
    icon: 'reliable',
    title: 'Reliability',
    text: [
      'We guarantee not only the quality but also the deadline of every translation. Our translators start working as soon as you place your order, and we are happy to update you on the progress of your translation at any time.',
    ],
  },
];

const EXPECT = 'What can you expect when you order a specialist translation?';
const EXPECT_ITEMS = [
  {
    icon: 'diploma',
    title: 'Expertise',
    text: [
      'In specialist translation it is not enough for the translator to have an excellent command of the source and target languages. The translator also needs proper knowledge of the field in question.',
    ],
  },
  {
    icon: 'proofread',
    title: 'Accuracy',
    text: [
      'Accuracy is especially important in specialist translation. DONE Translations ensures it with a double quality-control system: at least two professional translators work on every specialist translation.',
    ],
  },
  {
    icon: 'coherence',
    title: 'Coherence',
    text: [
      'Specialist translations require the vocabulary of the field in question. The translator must always use the same term for the same concept, and the text as a whole must be coherent.',
    ],
  },
  {
    icon: 'target',
    title: 'Clarity',
    text: [
      'Specialist translations must avoid wording that makes the text ambiguous. A specialist translation has to be impossible to misunderstand.',
    ],
  },
];

const STEPS = [
  {
    icon: 'upload',
    title: '1.',
    text: [
      'Once you have sent us the text you would like translated, our project managers will contact you as soon as possible and prepare a personalised quote for you.',
    ],
  },
  {
    icon: 'translate',
    title: '2.',
    text: [
      'If you accept our quote, a translator specialising in your language pair and field starts working on your translation straight away.',
    ],
  },
  {
    icon: 'send',
    title: '3.',
    text: ['We send you the translation by email within the deadline stated in the quote.'],
  },
];

const closing = (count: number, what: string) =>
  `The DONE Translations team takes on ${what} in ${count} languages. If you have any further questions about our translation services, please contact us at info@donetranslations.hu.`;

export const HOME_EN: HomeContent = {
  title: 'Done Translations Translation Agency - Translation even on the same day',
  description: 'Fast and precise translation, even on the same day. Simple quote requests. We guarantee the quality.',
  h1: 'DONE Translations Translation Agency',
  subtitle: 'Translation even on the same day',
  lead: ['Professional and precise language services', 'for companies and individuals alike.'],
  spellingButton: 'Free spelling advice',
  servicesHeading: 'Services',
  services: [
    {
      key: 'translation',
      icon: 'document',
      title: 'Translation',
      text: 'At least two professional translators work on every translation project – whether it is a short document or a machine manual several hundred pages long.',
    },
    {
      key: 'proofreading',
      icon: 'proofread',
      title: 'Proofreading',
      text: 'Proofreading means reviewing texts and correcting them where necessary. At our agency every text is proofread by a native-speaker specialist with in-depth knowledge of the subject.',
    },
    {
      key: 'postEditing',
      icon: 'ai',
      title: 'Post-editing',
      text: 'AI-based translation tools have become more and more widespread in recent years. Every AI-generated translation is also reviewed by a qualified translator.',
    },
    {
      key: 'interpreting',
      icon: 'interpret',
      title: 'Interpreting',
      text: 'Interpreting is the activity in which the interpreter translates orally. Among other services, our agency offers consecutive and simultaneous interpreting.',
    },
  ],
  whyHeading: WHY,
  why: WHY_ITEMS,
  stepsHeading: 'Translation step by step',
  steps: STEPS,
  stats: [
    { value: 1200, suffix: '+', label: 'translation projects a year' },
    { value: 86, suffix: '', label: 'languages' },
    { value: 4000, suffix: '+', label: 'satisfied clients' },
    { value: 6000000, suffix: '+', label: 'characters translated a year' },
  ],
  slogan: ['Translation even on the same day.', 'Fordítás akár aznapra.', 'Übersetzung noch am selben Tag.'],
};

export const PAGES_EN: Record<Exclude<PageKey, 'home' | 'thanks'>, PageContent> = {
  translation: {
    title: 'Fast Translation - even on the same day',
    description: 'Fast and precise translation, even on the same day. Simple quote requests. We guarantee the quality.',
    h1: 'Translation',
    lead: [
      'Our professional team provides translations for companies and individuals alike. At least two professional translators work on every translation project – whether it is a short document or a lengthy machine manual.',
    ],
    cta: true,
    quote: 'standard',
    service: 'translation',
    blocks: [
      {
        kind: 'text',
        heading: 'What should you know about translation?',
        paragraphs: [
          'Translation means rendering a written text from one language into another. One of the most important rules of translation is that we translate the sense of the text, not its words. The translator therefore first interprets the source text and then expresses it in the target language so that neither its content nor its style suffers. That is why translators need to be at home in the subject of the text in both the source and the target language, be it a technical, financial, legal or medical field.',
          'With a high level of language skills and the right expertise, it is possible to produce translations of reasonably good quality, but truly professional work requires more. Translators also need excellent spelling, a vast vocabulary and some IT skills if they want to succeed in the market. In our experience, basic IT skills are now indispensable in the translation profession. Translation work often includes editing and typesetting, and translators may even need user-level image editing skills to deliver translations with a polished appearance. On top of all this, translators sometimes need creativity as well, for example when translating puns or marketing slogans.',
        ],
      },
      { kind: 'steps', heading: 'Translation step by step', steps: STEPS, after: [closing(86, 'translation assignments across five main fields')] },
      { kind: 'features', heading: WHY, items: WHY_ITEMS },
    ],
  },

  proofreading: {
    title: 'Proofreading - DONE Translations Translation Agency',
    description: 'Proofreading of monolingual texts and translations by native-speaker specialists. We guarantee the quality!',
    h1: 'Proofreading',
    lead: [
      'Proofreading means reviewing texts and correcting them where necessary. During proofreading our specialists primarily check that the content of the texts matches. In addition, we pay close attention to spelling and punctuation in every proofreading assignment. Proofreading is always carried out by native-speaker linguists and/or professional translators, so you can be sure that your work is proofread by the most competent people possible.',
    ],
    cta: true,
    quote: 'standard',
    service: 'proofreading',
    blocks: [
      {
        kind: 'text',
        heading: 'Proofread translation',
        paragraphs: [
          'At our agency you can, of course, order a proofread translation. In this case the translation prepared by the translator is checked not only by the colleague responsible for quality control but also by a proofreader. We recommend proofread translation when the translation is intended for the general public or when its purpose justifies it. For advertising copy, articles for journals and important contracts we generally strongly recommend our proofread translation service. Proofread translations are always done by a native-speaker proofreader and generally cost 50% of the translation price. If you are unsure whether you need a proofread translation, feel free to contact us!',
        ],
      },
      {
        kind: 'text',
        heading: 'Proofreading of monolingual texts',
        paragraphs: [
          'You have probably asked a friend, acquaintance or colleague to read through a text and check it for errors. In some cases it is worth entrusting this "read-through" to people for whom it is their profession. Our proofreaders check the monolingual text you have written not only for spelling, punctuation and grammar but, where necessary, also suggest improvements to its style, clarity and consistency. Clients mostly come to us to proofread marketing materials and website copy, but we are happy to review and correct texts of any kind. Entrust your text to a proofreader to make sure the material you publish is of high linguistic quality!',
        ],
      },
      {
        kind: 'spelling',
        heading: 'Ask for free spelling advice!',
        text: 'If you are unsure about the spelling of a single expression or two, our linguists are happy to help. Send us the problematic expression and our agency will help you with its spelling free of charge.',
      },
    ],
  },

  postEditing: {
    title: 'Post-editing (PEMT) - Fast and cost-effective translation',
    description: 'The translation software we use recognises the language of the source text and translates it in a matter of seconds.',
    h1: 'Post-editing (PEMT)',
    lead: [
      'AI-based translation tools have become more and more widespread in recent years. These programs can recognise the language of the source text and, using machine translation, translate it into the language chosen by the user in a matter of seconds.',
    ],
    cta: true,
    quote: 'standard',
    service: 'post_editing',
    blocks: [
      {
        kind: 'text',
        paragraphs: [
          'The good news is that the technology has reached the point where it works well not only for "popular" language pairs such as English–German or French–Spanish, but also copes well with "rarer" languages such as Hungarian.',
          'Translation software brings many advantages, which is why more and more translation agencies use machine translation in their assignments. Just as with traditional human translation, at least two professional translators always work on machine translations and check them thoroughly.',
        ],
      },
      {
        kind: 'features',
        heading: 'Why use machine translation?',
        items: [
          {
            icon: 'fast',
            title: 'Fast',
            text: [
              'Translation software can shorten the translation process considerably. Machine translation is always faster than traditional human translation, and translation software can translate even hundreds of pages of text in seconds. But the translation process does not end there – that is where it begins, because this is when our professional translators step in. Thanks to machine translation, translators receive a relatively good-quality raw translation that only needs post-editing.',
            ],
          },
          {
            icon: 'cost',
            title: 'Cost-effective',
            text: [
              "Machine translation is always cost-effective, because a well-prepared raw translation can cut the translator's working time by up to 30%. When post-editing machine translations, our translators always read and interpret the source text and then check the machine translation, so the price of post-editing typically lies between the fees for translation and proofreading.",
            ],
          },
        ],
        after: [
          'As machine translation technology develops, this type of translation is becoming possible for more and more texts and language pairs. It is important to note, however, that we cannot use machine translation for complex specialist texts, poor-quality source texts or texts containing personal data. If you have any further questions about machine translation, please contact us!',
        ],
      },
    ],
  },

  interpreting: {
    title: 'Interpreting - DONE Translations Translation Agency',
    description: 'A professional team of interpreters – among other services, our agency offers consecutive and simultaneous interpreting.',
    h1: 'Interpreting',
    lead: [
      "Interpreting is the activity in which the interpreter translates orally. However, it is not enough for the interpreter to have an excellent command of the working languages. Interpreters also need a thorough knowledge of a country's etiquette, traditions and customs, and must be aware of cultural differences.",
    ],
    cta: true,
    quote: 'interpreting',
    service: 'interpreting',
    blocks: [
      {
        kind: 'text',
        paragraphs: [
          'Interpreters also need, among other things, good concentration, an excellent memory and strong problem-solving skills. The interpreter always represents the client in a given situation, so it is especially important that the interpreter makes a good impression. Interpreters must also be reliable and empathetic.',
          'When choosing the right professional, you need to consider the purpose for which you need an interpreter. Our agency offers four types of interpreting services: consecutive interpreting, simultaneous interpreting, remote interpreting and chuchotage. You can find out more about these types of interpreting below.',
        ],
      },
      {
        kind: 'features',
        items: [
          {
            icon: 'consecutive',
            title: 'Consecutive interpreting',
            text: [
              'In consecutive interpreting, the speaker pauses after every sentence or short unit of thought, and the interpreter renders what was said from notes or from memory. This type of interpreting is most often used at business negotiations. In this case the interpreter usually works in both language directions. Special interpreting equipment is generally not required.',
            ],
          },
          {
            icon: 'simultaneous',
            title: 'Simultaneous interpreting',
            text: [
              'In simultaneous interpreting, the interpreter listens to the speaker from an interpreting booth and interprets what is said in sync with the speaker. This type of interpreting is typically needed at conferences, where the audience can follow the presentation in the interpreted language through headphones. Simultaneous interpreters usually work in pairs, and the work also requires special technical equipment.',
            ],
          },
          {
            icon: 'remote',
            title: 'Remote interpreting',
            text: [
              'In remote interpreting, the interpreter works online (e.g. via Zoom) or by phone. This is usually needed for online video conferences. As with consecutive interpreting, the interpreter renders what is said sentence by sentence or in short units of thought.',
            ],
          },
          {
            icon: 'whisper',
            title: 'Chuchotage',
            text: [
              "Chuchotage, or whispered interpreting, is a form of simultaneous interpreting in which the interpreter typically interprets for just one person. The interpreter whispers what is being said into the client's ear in sync with the speaker. This technique is also used when interpreting court hearings.",
            ],
          },
        ],
        after: [
          'If you have any further questions about our interpreting services, or are not sure which type of interpreting would suit you best, our colleagues will be happy to help.',
        ],
      },
    ],
  },

  technical: {
    title: 'Technical translation - DONE Translations Translation Agency',
    description: 'Translation of user manuals, machine manuals and safety data sheets – automotive, architecture, mechanical engineering, chemical industry.',
    h1: 'Technical translation',
    lead: [
      'Our agency mainly produces technical translations for companies. When choosing a technical translator, we always make sure the specialist has the right knowledge and expertise in the subject, be it mechanical engineering, the automotive industry, the railway industry, bridge engineering or the wood industry.',
    ],
    cta: true,
    quote: 'standard',
    service: 'translation',
    blocks: [
      {
        kind: 'text',
        paragraphs: [
          'Building a terminology database is free of charge, but we also need your cooperation. Our translators may ask you questions to clarify technical terms. Please bear in mind that for the quality of the translation it is essential that the translator fully understands the source text.',
        ],
      },
      { kind: 'features', heading: EXPECT, items: EXPECT_ITEMS },
      {
        kind: 'list',
        heading: 'The technical texts we translate most often:',
        items: ['User manuals', 'Handbooks', 'Installation and maintenance instructions', 'Technical drawings', 'Documentation', 'Safety data sheets'],
      },
      {
        kind: 'list',
        heading: 'Fields:',
        items: [
          'Steel industry',
          'Materials science',
          'Automotive and vehicle manufacturing',
          'Biotechnology',
          'Safety engineering',
          'Electronics',
          'Food industry and food safety',
          'Energy industry and renewable energy',
          'Architecture',
          'Metalworking',
          'Machine manufacturing and mechanical engineering',
          'Defence industry',
          'Shipbuilding',
          'Bridge engineering',
          'Waste management and recycling',
          'IT and computing',
          'Environmental protection and sustainability',
          'Logistics',
          'Printing industry',
          'Aviation and aerospace',
          'Telecommunications',
          'Textile industry',
          'Railway industry',
          'Chemical industry',
          'Water management',
        ],
        after: [closing(34, 'technical translation assignments')],
      },
    ],
  },

  financial: {
    title: 'Financial translation - DONE Translations Translation Agency',
    description: 'Translation of financial reports and balance sheets. A custom quote every time. Fast, precise and reliable financial translations.',
    h1: 'Financial translation',
    lead: [
      'Financial and economic texts are translated by specialist financial translators. These translations are usually handled by translators who are not only qualified translators but also hold a degree in economics.',
    ],
    cta: true,
    quote: 'standard',
    service: 'translation',
    blocks: [
      {
        kind: 'text',
        paragraphs: [
          'Thanks to their broad professional knowledge, our financial translators are familiar with the specifics of the business world and with economic processes. They are up to date on current trends and changes in the global economy. They also keep track of market events and follow economic news and reports, so even the latest jargon is no challenge for them. Ongoing training and constant research keep our specialists up to date at all times.',
          'Financial translations usually come with tight deadlines and high expectations. Our financial translators handle these challenges well and can make sure that translations are delivered on time and are flawless in quality.',
        ],
      },
      { kind: 'features', heading: EXPECT, items: EXPECT_ITEMS },
      {
        kind: 'list',
        heading: 'The financial texts we translate most often:',
        items: ['Financial reports and analyses', 'Tax returns', 'Balance sheets', 'Professional articles and studies', 'Trade and financial statistics'],
        after: [closing(27, 'financial translation assignments')],
      },
    ],
  },

  legal: {
    title: 'Legal translation - DONE Translations Translation Agency',
    description: 'Precise translation of contracts, minutes, deeds, court documents and other legal texts.',
    h1: 'Legal translation',
    lead: [
      'If you need contracts, minutes, deeds, court documents or any other legal text translated, be sure to entrust the work to a legal translator. When translating legal texts, it is essential that the translator is familiar with the legal systems of both the source and the target language. We always pay particular attention to choosing the right translator for legal texts.',
    ],
    cta: true,
    quote: 'standard',
    service: 'translation',
    blocks: [
      {
        kind: 'text',
        paragraphs: [
          'The task of our legal translators is to render the content and meaning of legal documents into the target language as accurately as possible. Legal translators must work with particular precision, because incorrect or inaccurate translations can have serious legal consequences. Where necessary, our legal translators also consult legal experts to ensure that translations are correct and accurate.',
          'For some texts, close cooperation between the legal translator and the client can be key to a successful translation. The translator may need additional information to fully understand the content of the text, so we ask you to support our work with active communication where necessary.',
        ],
      },
      { kind: 'features', heading: EXPECT, items: EXPECT_ITEMS },
      {
        kind: 'list',
        heading: 'The legal texts we translate most often:',
        items: ['Contracts, such as employment contracts and sales contracts', 'Legislation, decrees, laws and regulations', 'Court documents'],
        after: [closing(24, 'legal translation assignments')],
      },
    ],
  },

  medical: {
    title: 'Medical translation - DONE Translations Translation Agency',
    description: 'Translation of discharge summaries, medical reports and patient information leaflets. Accurate and reliable medical translation.',
    h1: 'Medical translation',
    lead: [
      'In medical translation we always make sure that the translator has sufficient knowledge and expertise in the subject. Our medical translators know medical terminology, procedures and protocols thoroughly. This ensures that translations are always accurate and reliable.',
    ],
    cta: true,
    quote: 'standard',
    service: 'translation',
    blocks: [
      {
        kind: 'text',
        paragraphs: [
          'Medical translations often involve specialised terminology and technical terms. Our translators know these terms precisely, even the latest medical technology terms. This is because our medical translators keep constantly up to date and follow the latest results of medical literature and research.',
          'Medical documents often contain sensitive data such as patient information, medical diagnoses, treatment plans and other confidential details. Our translators always handle patients’ personal data confidentially. Data protection and security are of the utmost importance to us when translating medical documents. We handle every document provided to us confidentially and in accordance with data protection laws.',
        ],
      },
      { kind: 'features', heading: EXPECT, items: EXPECT_ITEMS },
      {
        kind: 'list',
        heading: 'The medical texts we translate most often:',
        items: ['Medical reports', 'Discharge summaries', 'Patient information leaflets', 'Medical articles and publications'],
        after: [closing(16, 'medical translation assignments')],
      },
    ],
  },

  marketing: {
    title: 'Marketing translation - DONE Translations Translation Agency',
    description: 'Creative translation of marketing materials by the best professionals. We guarantee the quality. A custom quote every time.',
    h1: 'Marketing translation',
    lead: ['Marketing translation is perhaps one of the most exciting fields of translation, where expertise meets creativity.'],
    cta: true,
    quote: 'standard',
    service: 'translation',
    blocks: [
      {
        kind: 'text',
        paragraphs: [
          'When translating marketing texts – such as advertisements, ads, media materials and social media posts – the translator often has to translate wordplay, rhymes and catchy, eye-catching slogans. This is far from as simple as it seems. Many factors have to be taken into account when translating marketing materials. The translator needs to know who the target audience is, along with every other piece of information needed for the translation to have the same effect in the target language as in the source language.',
          'At our agency, several translators usually brainstorm together on marketing materials that require a great deal of creativity. If, for example, you would like a slogan translated into another language, we can provide several translation suggestions on request.',
        ],
      },
      { kind: 'features', heading: EXPECT, items: EXPECT_ITEMS },
      {
        kind: 'list',
        heading: 'The marketing texts we translate most often:',
        items: ['General marketing materials', 'Advertisements', 'Ads', 'Social media posts', 'Slogans'],
        after: [closing(20, 'marketing translation assignments')],
      },
    ],
  },

  languages: {
    title: 'Translation into 86 languages - DONE Translations Translation Agency',
    description: 'Translation and interpreting in English, German, French, Italian, Spanish, Russian, Arabic, Chinese and many other languages. Quality guaranteed.',
    h1: 'Languages',
    lead: ['our agency works with'],
    cta: false,
    quote: 'standard',
    service: 'translation',
    blocks: [
      {
        kind: 'languages',
        groups: [
          ['Hungarian', 'English', 'German', 'French', 'Spanish', 'Russian'],
          [
            'Albanian', 'Arabic', 'Bosnian', 'Mongolian', 'Bulgarian', 'Croatian', 'Chinese', 'Czech', 'Danish', 'Dutch', 'Korean',
            'Finnish', 'Modern Greek', 'Ancient Greek', 'Latin', 'Hindi', 'Hebrew', 'Italian', 'Japanese', 'Indonesian', 'Latvian',
            'Lithuanian', 'Macedonian', 'Malay', 'Norwegian', 'Polish', 'Portuguese', 'Romanian', 'Serbian', 'Slovak', 'Slovenian',
            'Swedish', 'Thai', 'Turkish', 'Catalan', 'Ukrainian', 'Urdu', 'Vietnamese', 'Estonian',
          ],
          [
            'Nepali', 'Armenian', 'Bengali', 'Persian', 'Georgian', 'Icelandic', 'Kazakh', 'Montenegrin', 'Tagalog', 'Khmer', 'Tajik',
            'Kyrgyz', 'Basque', 'Pashto', 'Uyghur', 'Maltese', 'Haitian Creole', 'Belarusian', 'Afrikaans', 'Faroese', 'Yiddish',
            'Flemish', 'Hawaiian', 'Wolof', 'Turkmen', 'Scottish Gaelic', 'Irish', 'Sanskrit', 'Esperanto', 'Klingon', 'Samoan', 'Tamil',
            'Tibetan', 'Greenlandic', 'Luxembourgish', 'Zulu', 'Azerbaijani', 'Punjabi', 'Kurdish', 'Uzbek', 'Lovari',
          ],
        ],
      },
    ],
  },

  prices: {
    title: 'Prices - DONE Translations Translation Agency',
    description: 'Simple quote requests. We prepare a custom quote for you every time. Our colleagues are happy to help.',
    h1: 'Prices',
    lead: [],
    cta: false,
    quote: 'standard',
    service: 'translation',
    blocks: [
      {
        kind: 'price',
        highlight: 'Specialist translation from HUF 3.0 per character (including spaces).',
        paragraphs: [
          'Please note that we always give an individual quote. The price of a translation depends on the language pair, the field, the deadline, the format of the source document and many other factors. We therefore ask you to send us the document you would like translated. Our project managers will contact you as soon as possible and prepare a custom quote for you. The quote is free and comes with no obligation.',
        ],
      },
    ],
  },

  quote: {
    title: 'Request a quote - DONE Translations Translation Agency',
    description: 'Simple quote requests – translation, interpreting, proofreading.',
    h1: 'Request a quote',
    lead: [],
    cta: false,
    quote: 'standard',
    service: 'translation',
    blocks: [{ kind: 'contact' }],
  },

  about: {
    title: 'DONE Translations Translation Agency',
    description: 'Translation in many fields, proofreading, post-editing and interpreting for companies and individuals alike.',
    h1: 'About us',
    lead: [
      'Our team has been working in translation and interpreting since 2018. At first, DONE Translations provided language services only in the German–Hungarian and Hungarian–German language pairs, mainly in technical fields. Our commitment to the profession has paid off. Today we take on translation and interpreting assignments in 86 different languages and in almost every field. This is above all thanks to our existing partners and our excellent translators.',
    ],
    cta: true,
    quote: 'standard',
    service: 'translation',
    blocks: [
      {
        kind: 'text',
        paragraphs: [
          "In every project we strive to provide the highest possible quality of language services. Our clients' satisfaction is always our priority. We are proud that many of our clients have been working with us for many years.",
          'If you need professional translation or interpreting, do not hesitate to contact us. Our project managers will be happy to answer any questions you may have.',
        ],
      },
    ],
  },

  careers: {
    title: 'Careers - DONE Translations Translation Agency',
    description: 'We are always open to applications from new professional translators and interpreters. If you have capacity for new assignments, apply to us!',
    h1: 'Careers',
    lead: [],
    cta: false,
    quote: false,
    service: 'translation',
    blocks: [
      {
        kind: 'text',
        heading: 'We are always open to applications from new professional translators and interpreters.',
        paragraphs: ['If you have capacity for new assignments, apply to us as described below.'],
      },
      {
        kind: 'list',
        heading: 'Requirements',
        items: [
          'A degree in translation or interpreting',
          'Perfect command of the source and target languages',
          'Excellent spelling',
          'Advanced knowledge and use of at least one CAT tool',
          'Basic computer skills',
        ],
      },
      {
        kind: 'list',
        heading: 'What we offer',
        items: [
          'Continuous feedback and opportunities for professional development',
          'Exciting projects',
          'Flexibility',
          'Friendly, supportive project management',
          'And, of course, always on-time payment',
        ],
      },
      {
        kind: 'steps',
        heading: 'How do I apply?',
        steps: [
          {
            icon: 'mail',
            title: 'Application',
            text: [
              'Send your CV to karrier@donetranslations.hu. Please state which languages you translate from and into, your rates and your main fields of expertise.',
            ],
          },
          { icon: 'translate', title: 'Test translation', text: ['If you meet the requirements, we will send you a test translation.'] },
          { icon: 'bell', title: 'Notification', text: ['We will let you know the result of the test translation within 10 working days.'] },
        ],
      },
    ],
  },

  imprint: {
    title: 'Imprint - DONE Translations',
    description: null,
    h1: 'Imprint',
    lead: [],
    cta: false,
    quote: false,
    service: 'translation',
    blocks: [
      {
        kind: 'legal',
        items: [
          { tag: 'h3', text: 'Szatmáry Máté e. v. (sole proprietor)' },
          { tag: 'p', text: 'Registered office: 3532 Miskolc, Gyula u. 20/D., Hungary' },
          { tag: 'p', text: 'Email: info@donetranslations.hu' },
          { tag: 'p', text: 'Tax number: 68419752-1-25' },
          { tag: 'h3', text: 'Hosting provider' },
          { tag: 'p', text: 'Rackforest Zrt.' },
          { tag: 'p', text: 'Registered office: 1132 Budapest, Victor Hugo utca 11. 5.em. B05001., Hungary' },
          { tag: 'p', text: 'Company registration number: 01-10-142004' },
          { tag: 'p', text: 'Tax number: 32056842-2-41' },
        ],
      },
    ],
  },

  privacy: {
    title: 'Privacy Policy - DONE Translations',
    description: null,
    h1: 'PRIVACY POLICY',
    lead: [],
    cta: false,
    quote: false,
    service: 'translation',
    blocks: [
      {
        kind: 'legal',
        items: [
          { tag: 'p', text: 'This is an English translation for information; the Hungarian version is authoritative.' },
          {
            tag: 'p',
            text: '1. INTRODUCTION It is very important to us to comply with the data protection regulations and laws currently in force, so below we describe in detail the data protection measures and data collection processes of the donetranslations.hu website and of Szatmáry Máté e. v. The data is controlled by Szatmáry Máté e. v., who is responsible for the processing of personal data.',
          },
          { tag: 'p', text: 'Contact details: Full name: Szatmáry Máté e. v. Email: info@donetranslations.hu Postal address: 3532 Miskolc, Gyula u. 20/D., Hungary' },
          {
            tag: 'p',
            text: '2. WHAT PERSONAL DATA DO WE PROCESS, AND WHY? Personal data is data that clearly makes it possible to identify an individual. On donetranslations.hu we process the following personal data, with the legal basis indicated:',
          },
          {
            tag: 'p',
            text: 'COMMUNICATION DATA This includes any message you send us through the website, by email, via social media messages or in any other form of communication. We process and retain this data in order to fulfil orders and to provide a basis for decisions in the event of any legal claims. Our legal basis for this processing is the user’s demonstrable interest in our activities, as expressed in the messages addressed to us.',
          },
          {
            tag: 'p',
            text: 'CUSTOMER DATA This includes all data related to the purchase of products and services, such as the customer’s name, delivery and billing address, email address, telephone number and the details of the purchased product. We process this data to fulfil orders successfully and to keep legally appropriate records of purchases. The legal basis for storing the data is the performance of the contract created by the order between the customer and Szatmáry Máté e. v.',
          },
          {
            tag: 'p',
            text: 'USER DATA This includes data generated while using the website, which enables the technical operation of the site, helps us keep the site secure, store backups of user activity, and ensure that you always have access to the most relevant content. The legal basis for processing this data is the user’s clear interest in our activities, for which, and for the technical operation of the site, storing this data is necessary.',
          },
          {
            tag: 'p',
            text: 'TECHNICAL DATA This includes data generated while using the site, such as IP address, login information, browser data, the time spent on individual pages, page views and navigation paths, the number and time of visits, time zones, and data about the device used to view the site. The source of this data is our analytics software. We process this data to analyse user behaviour on the site, to keep our site operating securely, and to understand the usefulness of our marketing decisions. The legal basis for processing this data is the user’s clear interest in our activities, which allows us to process this data in line with security requirements and to use it to grow the business through more effective operation.',
          },
          {
            tag: 'p',
            text: 'MARKETING DATA This includes the visitor’s preferences regarding the marketing content they are happy to receive from us. We process this data to send advertising related to our services in which the user has expressed interest. The legal basis for processing this data is the user’s clear interest in our activities, which allows us to process this data in line with security requirements and to use it to grow the business through more effective operation. From time to time we may use the collected data for purposes such as providing targeted, relevant advertising on the Facebook™ platform and on various dynamic advertising platforms, and for measuring the effectiveness of advertisements. The legal basis for processing this data is the user’s clear interest in our activities, which allows us to process this data in line with security requirements and to use it to grow the business through more effective operation. In the course of our activities we do not collect sensitive data such as ethnic origin, religious beliefs, sex life and sexual orientation, political opinions and trade union membership, health background, or genetic or biometric information.',
          },
          {
            tag: 'p',
            text: '3. HOW DO WE COLLECT DATA? We may collect personal data when the user provides it to us directly (for example, by sending a message). In addition, certain data is collected automatically while using the site, for example through so-called “cookies” and similar technologies. These only become active after the user has given consent. For more information, please see our Cookie Policy. We receive certain data from external partners, such as analytics providers like Google (a partner outside the EU) and advertising networks like Facebook™ (a partner outside the EU).',
          },
          {
            tag: 'p',
            text: '4. OUR PRACTICAL DATA PROTECTION MEASURES Protecting users’ data and complying with the regulations in force is extremely important to Szatmáry Máté e. v. Therefore, after carrying out a data protection impact assessment of the site, we have listed the data collected, its necessity and legal basis, and its legal compliance.',
          },
          {
            tag: 'p',
            text: '• To protect the data entered in forms and generated on the site, we use SSL certification across the entire website (Let’s Encrypt Authority X3 certificate). • To protect the site against attacks, we use premium security software (iThemes Security Pro) to protect stored data against so-called “brute force” and virus attacks. • In the site’s databases, purchase and user data is stored in encrypted (pseudonymised) form, so it cannot be read by third parties. • In this privacy policy we provide forms through which users can request information about the processing of their personal data, and request the modification or deletion of their personal data.',
          },
          {
            tag: 'p',
            text: 'From time to time, for the purposes of our business, it is necessary to provide data to our service partners (for example, the hosting provider or newsletter software). In such cases we always choose partners that meet the requirements of the GDPR and, in the case of US-based partners, participate in the EU-US Privacy Shield data protection initiative, and we have them sign a data processing agreement to ensure the responsible handling of data.',
          },
          {
            tag: 'p',
            text: '5. MARKETING COMMUNICATION Marketing communication is essential to the activities of the business. The legal basis for the related data processing is interest shown in our services or the users’ explicit consent. Under the European Union’s Privacy and Electronic Communications Regulations (PECR), we send marketing messages to our users if they have made a purchase from us or have explicitly consented to receiving marketing messages. We always make it clearly visible how to withdraw consent and unsubscribe from messages. The link needed to unsubscribe can be found at the bottom of every email, or removal from the database can be requested at info@donetranslations.hu. Even after unsubscribing from marketing communication we may send you messages, but only concerning the fulfilment of orders.',
          },
          {
            tag: 'p',
            text: '6. NOTE ON PERSONAL DATA From time to time it is necessary to share certain personal data with some of our partners in order to maintain normal business operations: – IT service providers and providers performing troubleshooting and maintenance on computer systems; – Expert partners such as accountants and insurers; – Government bodies requesting reports on our activities; International data transfers From time to time, in order to maintain business operations, we need to share users’ data with service partners outside the European Economic Area (EEA). Countries outside the EEA often do not provide the same level of data protection, so European laws prohibit exporting data unless the appropriate conditions are met. Whenever personal data leaves the EEA, in addition to the steps described in point 4, we take the following measures to ensure that the data is handled securely: – We only transfer data to countries that the European Commission considers adequate in terms of data security. – We only use US-based services that are part of the EU-US Privacy Shield data security initiative. If the above conditions are not met, we ask users for their explicit consent to the data transfer. Consent may be withdrawn at any time. Links to external sites This site sometimes contains links to external sites, or code snippets embedded in the site that enable external services to work. Clicking these links or using the embedded solutions may allow external partners to collect data about users. Although we do everything we can to vet our partners properly, we have no control over their data protection principles and are not responsible for their data processing practices.',
          },
          {
            tag: 'p',
            text: '7. DURATION OF DATA PROCESSING We only store users’ data for as long as our legal, accounting or reporting obligations require, or as long as necessary to operate the service. When deciding on the storage period, we take into account the quantity, nature and sensitivity of the data, and the potential impact of its leakage in the event of a data breach. For tax reasons we must keep customers’ billing and purchase data for at least 8 years in order to meet our legal obligations. In certain circumstances we may use the data in anonymised form for statistical purposes, in which case we store the data indefinitely without notice.',
          },
          {
            tag: 'p',
            text: '8. RIGHTS OF THE VISITOR As a citizen of the European Union, the General Data Protection Regulation (GDPR) grants the users of the site the following rights: a) Access to personal data Users of the site have the right to request a copy of the personal data stored by Szatmáry Máté e. v. The request is generally fulfilled free of charge within 14 days of submission. In the case of repeated, abusive or unfounded requests, Szatmáry Máté e. v. may charge a reasonable fee for providing the data, and additional time may be needed. Furthermore, Szatmáry Máté e. v. asks for proof of identity before releasing the data in order to prevent abuse. To request your personal data, please contact us at info@donetranslations.hu.',
          },
          {
            tag: 'p',
            text: 'b) Modification of personal data If personal data has changed or was provided incorrectly, users have the right to request its modification. To modify your personal data, please contact us at info@donetranslations.hu. c) Request for deletion of personal data Users have the right to request the deletion of all their personal data. We fulfil the request free of charge within 14 days. After the deletion of personal data, the user account will no longer be available, so any purchased materials will also become inaccessible, as the personal data linked to the user account is essential for accessing the service. Szatmáry Máté e. v. asks for proof of identity before deleting personal data in order to prevent abuse. To delete your personal data, please contact us at the email address above. d) Request to restrict the processing of personal data Users have the right to request a restriction on making their data available to third parties (service partners). When submitting the request, the service partners to be restricted may also be named. It is important to note that cooperation with certain service providers is essential for the operation of the site, so restricting them will make the site’s services unavailable to the user. Szatmáry Máté e. v. asks for proof of identity before restricting the transfer of personal data in order to prevent abuse. To restrict the transfer of your personal data, please contact us at the email address above. In Hungary, the official data protection authority is the Hungarian National Authority for Data Protection and Freedom of Information (NAIH). Users can find more information about their data protection rights on the NAIH website. Nemzeti Adatvédelmi és Információszabadság Hatóság, 1125 Budapest, Szilágyi Erzsébet fasor 22/C. Postal address: 1530 Budapest, Pf.: 5., Telephone: +36 1 391 1400, Fax: +36 1 391 1410, Email: ugyfelszolgalat@naih.hu Website: http://www.naih.hu',
          },
          {
            tag: 'p',
            text: '9. ANONYMISED DATA AND “COOKIES” The donetranslations.hu site uses so-called “cookies” and similar technologies, such as tracking codes, remarketing tags and pixels, in emails and advertisements, which only become active after the user has given consent. These technologies help us better understand users’ behaviour and interests, helping us operate at a higher standard and more effectively. Our aim is to make using donetranslations.hu as user-friendly and personal as possible. If the user wishes to prevent these technologies from recording non-personal data, this can be done in the following ways: – by disabling them using the cookie notices that appear on the website; – by disabling “cookies” in the browser. You can find more information about the other cookies and tracking codes on donetranslations.hu in our Cookie Policy.',
          },
        ],
      },
    ],
  },

  cookies: {
    title: 'Cookie Policy - DONE Translations',
    description: null,
    h1: 'COOKIE POLICY',
    lead: [],
    cta: false,
    quote: false,
    service: 'translation',
    blocks: [
      {
        kind: 'legal',
        items: [
          { tag: 'p', text: 'This is an English translation for information; the Hungarian version is authoritative.' },
          { tag: 'p', text: '“Cookies” are small text files that a website can use to make the user experience even more efficient.' },
          {
            tag: 'p',
            text: 'Some cookies are only temporary and disappear when the browser is closed, while there are also persistent versions that remain on your computer for longer. Under the law, we may store cookies on the visitor’s device only if they are strictly necessary for the operation of our website.',
          },
          { tag: 'p', text: 'For all other types of cookies we need the visitor’s permission. This website uses various cookies. Some cookies appearing on the website are placed by our third-party service providers.' },
          {
            tag: 'p',
            text: 'Browsers allow you to change your cookie settings. Most browsers accept cookies automatically by default, but this can be changed so that automatic acceptance is prevented.',
          },
          {
            tag: 'p',
            text: 'If you would like to learn more about changing your browser settings, see your browser’s instructions or help. You can find information about the cookie settings of the most popular browsers at the following links:',
          },
          { tag: 'p', text: 'Google Chrome' },
          { tag: 'p', text: 'Firefox' },
          { tag: 'p', text: 'Microsoft Edge' },
          { tag: 'p', text: 'Safari' },
          { tag: 'h2', text: 'WHERE ARE YOU INFORMED ABOUT COOKIES AND WHERE DO YOU GIVE YOUR CONSENT?' },
          {
            tag: 'p',
            text: 'When you visit our website for the first time, a pop-up window appears at the top of the screen where you can decide which cookies you consent to.',
          },
          { tag: 'p', text: 'This information window also contains a link to this Privacy Policy.' },
          { tag: 'h2', text: 'TYPES OF COOKIES' },
          { tag: 'p', text: '3.1. Strictly necessary cookies' },
          {
            tag: 'p',
            text: 'Strictly necessary cookies make our website usable by enabling basic functions such as navigating the site and accessing secure areas of the website.',
          },
          { tag: 'p', text: 'The website cannot function properly without these cookies.' },
          { tag: 'li', text: 'PHPSESSID: Preserves the state of the user session between page requests (until the browser is closed);' },
          { tag: 'li', text: 'CookieConsent: Stores the user’s cookie consent for the given domain (1 year);' },
          { tag: 'li', text: '__cfduid: Used by the Cloudflare content delivery network to identify internet traffic (1 year);' },
          { tag: 'li', text: 'JSESSIONID: Assigns a unique, anonymous identifier to every page view to improve the usability of the site (until the browser is closed).' },
          { tag: 'p', text: '3.2. Preference cookies' },
          {
            tag: 'p',
            text: 'Preference cookies allow us to remember information that changes the way the website behaves or looks, for example your preferred language or the region you are in.',
          },
          { tag: 'p', text: '3.3. Statistics cookies' },
          {
            tag: 'p',
            text: 'By collecting and reporting data anonymously, statistics cookies help the website owner understand how visitors interact with the website.',
          },
          { tag: 'p', text: '3.4. Marketing cookies' },
          {
            tag: 'p',
            text: 'We use personalised cookies to track visitors’ activity on the website. The aim is to publish more relevant advertisements for individual users, display content matching their preferences, and encourage them to take action.',
          },
          { tag: 'li', text: 'ads/ga-audiences: Used by Google AdWords to target users who, based on their browsing habits, are assumed to be more likely to make a purchase (until the browser is closed);' },
          { tag: 'li', text: 'pref: Records a unique ID that Google uses to compile statistics on the YouTube videos viewed by the user (8 months);' },
          { tag: 'li', text: 'fr: Used by Facebook to target users who, based on their browsing habits, are assumed to be more likely to make a purchase (3 months);' },
          { tag: 'li', text: 'tr: Used by Facebook to target users who, based on their browsing habits, are assumed to be more likely to make a purchase (until the browser is closed).' },
          { tag: 'h2', text: 'CHECKING AND DISABLING COOKIE SETTINGS' },
          {
            tag: 'p',
            text: 'Modern browsers allow you to change your “cookie settings”. Some browsers accept cookies automatically by default, but this setting can also be changed so that the visitor prevents automatic acceptance in the future.',
          },
          { tag: 'p', text: 'Once changed, the browser will offer you the choice of “cookie settings” every time.' },
          {
            tag: 'p',
            text: 'Even when cookies are enabled, the Data Controller does not record any identifier or password. Visitors can use the services in complete safety even after accepting cookies.',
          },
          {
            tag: 'p',
            text: 'Please note that, as the purpose of cookies is to support and facilitate the usability and processes of the website, if cookies are disabled we cannot guarantee that the visitor will be able to use all functions of the website in full.',
          },
          { tag: 'p', text: 'In this case the website may behave differently than intended in the browser.' },
        ],
      },
    ],
  },
};
