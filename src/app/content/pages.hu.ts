// A donetranslations.hu jelenlegi oldalainak szövege, változtatás nélkül (SEO).
// Ezt a fájlt a régi oldalból generáltuk; ha szöveget módosítasz, itt tedd.
import { HomeContent, PageContent, PageKey } from './types';

export const HOME_HU: HomeContent = {
  "title": "Done Translations Fordítóiroda - Fordítás akár aznapra",
  "description": "Gyors és precíz fordítás akár aznapra. Egyszerű árajánlatkérés. Garanciát vállalunk a minőségre.",
  "h1": "DONE Translations Fordítóiroda",
  "subtitle": "Fordítás akár aznapra",
  "lead": [
    "Professzionális és precíz nyelvi szolgáltatások",
    "cégeknek és magánszemélyeknek egyaránt."
  ],
  "spellingButton": "Ingyenes helyesírási tanácsadás",
  "servicesHeading": "Szolgáltatások",
  "services": [
    {
      "key": "translation",
      "icon": "document",
      "title": "Fordítás",
      "text": "Minden fordítási projektünkön legalább két szakfordító kolléga dolgozik – akár egy rövid dokumentumról, akár egy nagy terjedelmű, több száz oldalas gépkönyvről van szó."
    },
    {
      "key": "proofreading",
      "icon": "proofread",
      "title": "Lektorálás",
      "text": "A lektorálás a szövegek átnézését és esetleges javítását jelenti. Irodánkban minden szöveget olyan anyanyelvi szakember lektorál, aki magas fokú ismeretekkel rendelkezik az adott témában."
    },
    {
      "key": "postEditing",
      "icon": "ai",
      "title": "Utószerkesztés",
      "text": "A mesterségesintelligencia-alapú fordítóprogramok használata az utóbbi években egyre elterjedtebbé vált. Az AI által generált fordítást minden esetben szakképzett fordító is átnézi."
    },
    {
      "key": "interpreting",
      "icon": "interpret",
      "title": "Tolmácsolás",
      "text": "A tolmácsolás olyan tevékenység, amely során a tolmács szóban végzi a fordítást. Fordítóirodánk többek között konszekutív és szinkrontolmácsolási szolgáltatásokat is kínál."
    }
  ],
  "whyHeading": "Miért válasszon minket?",
  "why": [
    {
      "icon": "award",
      "title": "Profizmus",
      "text": [
        "A fordítói csapatunk minden tagja szakképzett fordító. A fordítóirodánk számára kifejezetten fontos a profizmus, így minden fordítást az adott szöveg témájában jártas szakfordító készít, legyen szó műszaki, gazdasági vagy jogi témájú szakszövegről."
      ]
    },
    {
      "icon": "quality",
      "title": "Minőség",
      "text": [
        "Fordítóirodánkban minden fordítási projekten legalább két szakfordító kolléga dolgozik. Ez a kettős minőség-ellenőrzési rendszer teszi lehetővé, hogy elkerülhetőek legyenek az esetleges hibák a kész fordításban, így minden fordítás a tőlünk megszokott magas minőségben kerül átadásra az ügyfeleink számára. Szakfordítóinkkal szemben magas szakmai követelményeket támasztunk, ezzel is garantálva a megfelelő minőséget."
      ]
    },
    {
      "icon": "reliable",
      "title": "Megbízhatóság",
      "text": [
        "Nemcsak a minőségre vállalunk garanciát, hanem a fordítási megbízások határidejére is. A fordítás megrendelése után a szakfordító kollégáink azonnal elkezdik a munkát, és kérésre bármikor szívesen tájékoztatjuk Önt a fordítás állapotáról."
      ]
    }
  ],
  "stepsHeading": "Fordítás lépésről lépésre",
  "steps": [
    {
      "icon": "upload",
      "title": "1.",
      "text": [
        "Miután elküldte számunkra a lefordíttatni kívánt szöveget, a projektmenedzsereink a lehető leghamarabb felveszik Önnel a kapcsolatot, és készítenek Önnek egy személyre szabott árajánlatot."
      ]
    },
    {
      "icon": "translate",
      "title": "2.",
      "text": [
        "Ha elfogadja ajánlatunkat, a fordítását azonnal megkezdi az adott nyelvpárra és szakterületre szakosodott kolléga."
      ]
    },
    {
      "icon": "send",
      "title": "3.",
      "text": [
        "A fordítást az árajánlatban megadott határidőn belül e-mailben küldjük meg Önnek."
      ]
    }
  ],
  "stats": [
    {
      "value": 1200,
      "suffix": "+",
      "label": "fordítási projekt évente"
    },
    {
      "value": 86,
      "suffix": "",
      "label": "nyelv"
    },
    {
      "value": 4000,
      "suffix": "+",
      "label": "elégedett ügyfél"
    },
    {
      "value": 6000000,
      "suffix": "+",
      "label": "lefordított karakter évente"
    }
  ],
  "slogan": [
    "Fordítás akár aznapra.",
    "Translation even on the same day.",
    "Übersetzung noch am selben Tag."
  ]
};

export const PAGES_HU: Record<Exclude<PageKey, 'home' | 'thanks'>, PageContent> = {
  "translation": {
    "title": "Gyors Fordítás - akár aznapra",
    "description": "Gyors és precíz fordítás akár aznapra. Egyszerű árajánlatkérés. Garanciát vállalunk a minőségre.",
    "h1": "Fordítás",
    "lead": [
      "Professzionális csapatunk cégeknek és magánszemélyeknek egyaránt készít fordításokat. Minden fordítási projektünkön legalább két szakfordító kolléga dolgozik – akár egy rövid dokumentumról, akár egy nagy terjedelmű gépkönyvről van szó."
    ],
    "cta": true,
    "quote": "standard",
    "service": "translation",
    "blocks": [
      {
        "kind": "text",
        "heading": "Mit kell tudni a fordításról?",
        "paragraphs": [
          "A fordítás írott szöveg egyik nyelvről egy másik nyelvre történő átültetését jelenti. A fordítás során az egyik legfontosabb szabály, hogy nem a jelentést, hanem a szöveg értelmét fordítjuk. A szakfordító tehát mindenekelőtt értelmezi a forrásnyelvi szöveget, majd azt úgy megfogalmazza a célnyelven, hogy a szöveg tartalmilag és stilisztikailag se sérüljön. Fontos tehát, hogy a szakfordítók mind a forrásnyelven, mind a célnyelven jártasak legyenek az adott szöveg témájában, legyen szó akár műszaki, gazdasági, jogi vagy egészségügyi területről.",
          "Magas szintű nyelvtudással és megfelelő szakértelemmel már viszonylag jó minőségű fordításokat lehet készíteni, azonban az igazán profi munkához ennyi nem elég. A szakfordítóknak kiváló helyesírással, hatalmas szókinccsel és némi informatikai affinitással is rendelkezniük kell, ha érvényesülni szeretnének a piacon. A tapasztalataink szerint az alapvető informatikai ismeretek ma már elengedhetetlenek a fordítói pályán. A szakfordítói munka gyakran magában foglalja a szerkesztési és tördelési munkákat is, és nem ritka, hogy felhasználói szintű képszerkesztői ismeretekre is szükség lehet ahhoz, hogy a szakfordítók a fordításokat igényes megjelenésben tudják szállítani. Mindezek mellett az is előfordulhat, hogy a fordítóknak kreativitásra is szükségük van a munka során, pl. szóviccek vagy marketingcélú szlogenek fordításakor."
        ]
      },
      {
        "kind": "steps",
        "heading": "Fordítás lépésről lépésre",
        "steps": [
          {
            "icon": "upload",
            "title": "1.",
            "text": [
              "Miután elküldte számunkra a lefordíttatni kívánt szöveget, a projektmenedzsereink a lehető leghamarabb felveszik Önnel a kapcsolatot, és készítenek Önnek egy személyre szabott árajánlatot."
            ]
          },
          {
            "icon": "translate",
            "title": "2.",
            "text": [
              "Ha elfogadja ajánlatunkat, a fordítását azonnal megkezdi az adott nyelvpárra és szakterületre szakosodott kolléga."
            ]
          },
          {
            "icon": "send",
            "title": "3.",
            "text": [
              "A fordítást az árajánlatban megadott határidőn belül e-mailben küldjük meg Önnek."
            ]
          }
        ],
        "after": [
          "A DONE Translations csapata 86 nyelven és öt fő szakterületen vállal fordítási megbízásokat. Amennyiben további kérdése van a fordítási szolgáltatásainkkal kapcsolatban, kérjük, vegye fel velünk a kapcsolatot az info@donetranslations.hu e-mail-címen."
        ]
      },
      {
        "kind": "features",
        "heading": "Miért válasszon minket?",
        "items": [
          {
            "icon": "award",
            "title": "Profizmus",
            "text": [
              "A fordítói csapatunk minden tagja szakképzett fordító. A fordítóirodánk számára kifejezetten fontos a profizmus, így minden fordítást az adott szöveg témájában jártas szakfordító készít, legyen szó műszaki, gazdasági vagy jogi témájú szakszövegről."
            ]
          },
          {
            "icon": "quality",
            "title": "Minőség",
            "text": [
              "Fordítóirodánkban minden fordítási projekten legalább két szakfordító kolléga dolgozik. Ez a kettős minőség-ellenőrzési rendszer teszi lehetővé, hogy elkerülhetőek legyenek az esetleges hibák a kész fordításban, így minden fordítás a tőlünk megszokott magas minőségben kerül átadásra az ügyfeleink számára. Szakfordítóinkkal szemben magas szakmai követelményeket támasztunk, ezzel is garantálva a megfelelő minőséget."
            ]
          },
          {
            "icon": "reliable",
            "title": "Megbízhatóság",
            "text": [
              "Nemcsak a minőségre vállalunk garanciát, hanem a fordítási megbízások határidejére is. A fordítás megrendelése után a szakfordító kollégáink azonnal elkezdik a munkát, és kérésre bármikor szívesen tájékoztatjuk Önt a fordítás állapotáról."
            ]
          }
        ]
      }
    ]
  },
  "proofreading": {
    "title": "Lektorálás - DONE Translations Fordítóiroda",
    "description": "Egynyelvű szövegek és fordítások lektorálása anyanyelvi szakemberek által. Garanciát vállalunk a minőségre!",
    "h1": "Lektorálás",
    "lead": [
      "A lektorálás a szövegek átnézését és esetleges javítását jelenti. A lektorálás során a szakembereink elsősorban tartalmi egyezés szempontjából ellenőrzik a szövegeket. Emellett minden lektorálási megbízás során nagy hangsúlyt fektetünk a helyesírásra és a központozásra. A lektorálásokat minden esetben anyanyelvi nyelvész és/vagy szakfordító kollégák végzik, így biztos lehet abban, hogy a lehető legkompetensebb személyek fogják az Ön munkáját lektorálni."
    ],
    "cta": true,
    "quote": "standard",
    "service": "proofreading",
    "blocks": [
      {
        "kind": "text",
        "heading": "Lektorált fordítás",
        "paragraphs": [
          "A fordítóirodánkban természetesen lehetőség van arra, hogy lektorált fordítást rendeljen. Ebben az esetben a szakfordító kolléga által elkészített fordítást a minőség-ellenőrzésért felelős kolléga mellett egy lektor is ellenőrzi. A lektorált fordítást azokban az esetekben javasoljuk, ha a fordítást nagyközönségnek szánja, vagy ha a fordítás célja megindokolja azt. Reklámszövegek, folyóiratokba szánt cikkek, fontos szerződések esetében általában erősen ajánljuk a lektorált fordítási szolgáltatás igénybevételét. A lektorált fordítást minden esetben anyanyelvi lektor végzi, és általánosságban a fordítási ár 50%-ába kerül. Amennyiben bizonytalan azzal kapcsolatban, hogy szüksége van-e lektorált fordításra, nyugodtan vegye fel velünk a kapcsolatot!"
        ]
      },
      {
        "kind": "text",
        "heading": "Egynyelvű szövegek lektorálása",
        "paragraphs": [
          "Biztosan előfordult már Önnel is, hogy barátját/ismerősét/kollégáját kérte meg arra, hogy olvasson át egy szöveget esetleges hibák szempontjából. Bizonyos esetekben ezt az „átolvasást” érdemes olyan szakemberekre bízni, akiknek ez a szakmája. Lektoraink nemcsak helyesírás, központozás és nyelvhelyesség szempontjából ellenőrzik az Ön által megírt egynyelvű szöveget, hanem szükség esetén stilisztika, érthetőség és konzisztencia tekintetében is javaslatokat tesznek a szövegre vonatkozóan. Fordítóirodánkat többnyire marketinganyagok és weboldalszövegek lektorálásával keresik meg, de szívesen vállaljuk bármilyen jellegű szöveg átnézését és javítását. Bízza a szövegét lektorra, hogy biztosan magas nyelvi minőségű anyagot adjon ki a kezei közül!"
        ]
      },
      {
        "kind": "spelling",
        "heading": "Kérjen ingyenes helyesírási tanácsadást!",
        "text": "Amennyiben csupán egy-egy kifejezés helyesírásával kapcsolatban bizonytalan, nyelvész kollégáink készséggel állnak a rendelkezésére. Küldje el a problémás kifejezést, és az irodánk ingyenesen segítséget nyújt a kérdéses kifejezés helyesírásával kapcsolatban."
      }
    ]
  },
  "postEditing": {
    "title": "Utószerkesztés (PEMT) - Gyors és költséghatékony fordítás",
    "description": "Az általunk használt fordítóprogramok felismerik a forrásnyelvi szöveg nyelvét, és másodpercek alatt lefordítják az adott szöveget.",
    "h1": "Utószerkesztés (PEMT)",
    "lead": [
      "A mesterségesintelligencia-alapú fordítóprogramok használata az utóbbi években egyre elterjedtebbé vált. Ezek a programok képesek felismerni a forrásnyelvi szöveg nyelvét, és gépi fordítást alkalmazva másodpercek alatt lefordítják az adott szöveget a felhasználó által kiválasztott nyelvre."
    ],
    "cta": true,
    "quote": "standard",
    "service": "post_editing",
    "blocks": [
      {
        "kind": "text",
        "paragraphs": [
          "Jó hír, hogy a technológia elérkezett arra a pontra, hogy nemcsak olyan „népszerű” nyelvpárokban működik megfelelően, mint az angol–német vagy francia–spanyol, hanem „ritkább” nyelvekkel is jól boldogul, mint pl. a magyar.",
          "A fordítószoftverek használata számos előnnyel jár, ezért egyre több fordítóiroda használ gépi fordításokat a fordítási megbízások során. A hagyományos emberi fordításhoz hasonlóan a gépi fordításokon is minden esetben legalább két szakfordító kolléga dolgozik, akik a gépi fordításokat alaposan ellenőrzik."
        ]
      },
      {
        "kind": "features",
        "heading": "Miért érdemes gépi fordítást igénybe venni?",
        "items": [
          {
            "icon": "fast",
            "title": "Gyors",
            "text": [
              "A fordítószoftverek használata jelentősen lerövidítheti a fordítási folyamatot. A gépi fordítás minden esetben gyorsabb, mint a hagyományos emberi fordítás, emellett a fordítószoftverek akár több száz oldalas szöveget is képesek másodpercek alatt lefordítani. A fordítási folyamat itt azonban még nem ér véget – csupán itt kezdődik, hiszen ekkor lépnek képbe a szakfordító kollégák. A gépi fordításnak köszönhetően a szakfordítók egy viszonylag jó minőségű nyersfordítást kapnak, amelyen már csak utószerkesztési munkákat kell végezni."
            ]
          },
          {
            "icon": "cost",
            "title": "Költséghatékony",
            "text": [
              "A gépi fordítás használata minden esetben költséghatékony, mivel a jól előkészített nyersfordításnak köszönhetően a fordító munkaideje akár 30%-kal is csökkenthető. A szakfordítók a gépi fordítások utószerkesztésekor is minden esetben végigolvassák és értelmezik a forrásnyelvi szöveget, majd ellenőrzik a gépi fordítást, így az utószerkesztések ára jellemzően a fordítás és a lektorálás munkadíja között mozog."
            ]
          }
        ],
        "after": [
          "A gépi fordítási technológia fejlődése révén egyre több szöveg és nyelvpár esetében van lehetőség erre a fordítási típusra. Fontos azonban megjegyezni, hogy bonyolult szakszövegek, rossz minőségű forrásnyelvi szövegek és személyes adatokat tartalmazó szövegek esetében nem áll módunkban gépi fordítást alkalmazni. Amennyiben további kérdése van a gépi fordításokkal kapcsolatban, kérjük, vegye fel velünk a kapcsolatot!"
        ]
      }
    ]
  },
  "interpreting": {
    "title": "Tolmácsolás - DONE Translations Fordítóiroda",
    "description": "Professzionális tolmácscsapat – Fordítóirodánk többek között konszekutív és szinkrontolmácsolási szolgáltatásokat is kínál.",
    "h1": "Tolmácsolás",
    "lead": [
      "A tolmácsolás olyan tevékenység, amely során a tolmács szóban végzi a fordítást. Ehhez a folyamathoz azonban nem elég csupán az, hogy a tolmács kiválóan ismerje a munkanyelveket. A tolmácsoknak alapos ismeretekkel kell rendelkezniük egy adott ország illeméről, hagyományairól, szokásairól, valamint tisztában kell lenniük a kulturális különbségekkel is."
    ],
    "cta": true,
    "quote": "interpreting",
    "service": "interpreting",
    "blocks": [
      {
        "kind": "text",
        "paragraphs": [
          "A tolmácsoknak emellett többek között jó koncentrációs képességgel, kiváló memóriával, remek problémamegoldó képességgel is rendelkezniük kell. A tolmács mindig a megbízót képviseli egy adott helyzetben, ezért az is különösen fontos, hogy a tolmács jó benyomást keltsen. Mindemellett fontos, hogy a tolmács megbízható és empatikus legyen.",
          "A megfelelő szakember kiválasztásánál figyelembe kell venni, hogy milyen célból van szükség tolmácsra. Fordítóirodánk négyféle típusú tolmácsolási szolgáltatást kínál az ügyfelek számára: konszekutív tolmácsolás, szinkrontolmácsolás, távtolmácsolás és susotázs. Az alábbiakban további részleteket tudhat meg ezekről a tolmácsolástípusokról."
        ]
      },
      {
        "kind": "features",
        "items": [
          {
            "icon": "consecutive",
            "title": "Konszekutív tolmácsolás",
            "text": [
              "A konszekutív tolmácsolás, avagy követő tolmácsolás során a beszélő minden mondatot vagy kisebb gondolati egységet követően szünetet tart, és a tolmács a jegyzetéből vagy fejből letolmácsolja az elhangzottakat. Ezt a tolmácsolási fajtát legtöbbször üzleti tárgyalásokon alkalmazzák. A tolmács ebben az esetben legtöbbször mindkét nyelvirányba tolmácsol. Speciális tolmácseszközökre ilyenkor általában nincs szükség."
            ]
          },
          {
            "icon": "simultaneous",
            "title": "Szinkrontolmácsolás",
            "text": [
              "A szinkrontolmácsolás esetében a tolmács tolmácsfülkében hallgatja a beszélőt, és a beszélővel szinkronban tolmácsolja az elhangzottakat. Erre a tolmácsolási típusra jellemzően konferenciákon van szükség, ahol a hallgatóság fülhallgatón keresztül követheti a tolmácsolt nyelven az előadást. A szinkrontolmácsok legtöbbször párban dolgoznak, és speciális technikai eszközökre is szükség van a munkához."
            ]
          },
          {
            "icon": "remote",
            "title": "Távtolmácsolás",
            "text": [
              "A távtolmácsolás során a tolmács online (pl. Zoomon keresztül) vagy telefonon végzi a tolmácsolást. Erre rendszerint online videokonferenciákon van szükség. Ennél a tolmácsolási fajtánál – a konszekutív tolmácsoláshoz hasonlóan – a tolmács mondatonként vagy rövidebb gondolati egységenként tolmácsolja az elhangzottakat."
            ]
          },
          {
            "icon": "whisper",
            "title": "Susotázs",
            "text": [
              "A susotázs vagy más néven fülbesúgásos tolmácsolás olyan szinkrontolmácsolási szolgáltatás, amely során a tolmács jellemzően csak egy ember számára tolmácsol. A susotázs során a tolmács a beszélővel szinkronban az ügyfél fülébe súgja az elhangzottakat. Ezt a tolmácsolási technikát alkalmazzák bírósági tárgyalások tolmácsolása során is."
            ]
          }
        ],
        "after": [
          "Amennyiben további kérdése van a tolmácsolási szolgáltatásokkal kapcsolatban, vagy nem biztos abban, melyik tolmácsolási típus lenne a megfelelő az Ön számára, kollégáink szívesen a rendelkezésére állnak."
        ]
      }
    ]
  },
  "technical": {
    "title": "Műszaki szakfordítás - DONE Translations Fordítóiroda",
    "description": "Használati utasítások, gépkönyvek, biztonsági adatlapok fordítása – autóipar, építészet, gépészet, vegyipar.",
    "h1": "Műszaki fordítás",
    "lead": [
      "Fordítóirodánk elsősorban cégeknek készít műszaki fordításokat. A műszaki szakfordító kiválasztásánál mindig figyelembe vesszük, hogy a szakember megfelelő ismeretekkel és szaktudással rendelkezzen az adott témában, legyen szó akár gépészetről, autóiparról, vasútiparról, hídépítészetről vagy faiparról."
    ],
    "cta": true,
    "quote": "standard",
    "service": "translation",
    "blocks": [
      {
        "kind": "text",
        "paragraphs": [
          "A terminológiai adatbázis kiépítése díjmentes, azonban az Ön közreműködésére is szükségünk van. Előfordulhat, hogy a szakfordítók a szakkifejezések pontosítása érdekében kérdéseket tesznek fel Önnek. Kérjük, vegye figyelembe, hogy a fordítás minősége szempontjából elsődleges fontosságú, hogy a szakfordító kolléga hiánytalanul megértse a forrásnyelvi szöveget."
        ]
      },
      {
        "kind": "features",
        "heading": "Mire számíthat, ha szakfordítást rendel?",
        "items": [
          {
            "icon": "diploma",
            "title": "Szakértelem",
            "text": [
              "A szakfordítás során nem elegendő csupán az, hogy a fordító kiválóan ismerje a forrás- és a célnyelvet. A szakfordítónak megfelelő ismeretekkel is rendelkeznie kell az adott szakterületen."
            ]
          },
          {
            "icon": "proofread",
            "title": "Pontosság",
            "text": [
              "A szakfordításban különösen fontos, hogy a fordítás a lehető legpontosabb legyen. A DONE Translations ezt a kettős minőség-ellenőrzési rendszerével biztosítja, amelynek keretében minden szakfordításon legalább két szakfordító kolléga dolgozik."
            ]
          },
          {
            "icon": "coherence",
            "title": "Koherencia",
            "text": [
              "A szakfordítások megkövetelik az adott szakterületnek megfelelő szókincs használatát. Fontos, hogy a fordítás során mindig ugyanazt a kifejezést használja a fordító ugyanarra a fogalomra, és hogy a szöveg egésze koherens legyen."
            ]
          },
          {
            "icon": "target",
            "title": "Egyértelműség",
            "text": [
              "A szakfordítások során kerülni kell az olyan megfogalmazásmódokat, amelyek a szöveget többértelművé teszik. A szakfordításnak félreérthetetlennek kell lennie."
            ]
          }
        ]
      },
      {
        "kind": "list",
        "heading": "A leggyakoribb műszaki szövegek, amelyeket fordítunk:",
        "items": [
          "Használati utasítások",
          "Kézikönyvek",
          "Szerelési és karbantartási utasítások",
          "Műszaki rajzok",
          "Dokumentációk",
          "Biztonsági adatlapok"
        ]
      },
      {
        "kind": "list",
        "heading": "Szakterületek:",
        "items": [
          "Acélipar",
          "Anyagtudomány",
          "Autóipar és járműgyártás",
          "Biotechnológia",
          "Biztonságtechnika",
          "Elektronika",
          "Élelmiszeripar és élelmiszerbiztonság",
          "Energiaipar és megújuló energiaforrások",
          "Építészet",
          "Fémmegmunkálás",
          "Gépgyártás és gépészet",
          "Hadiipar",
          "Hajóipar",
          "Hídépítészet",
          "Hulladékkezelés és újrahasznosítás",
          "Informatika és számítástechnika",
          "Környezetvédelem és fenntarthatóság",
          "Logisztika",
          "Nyomdaipar",
          "Repülés és űrtechnika",
          "Telekommunikáció",
          "Textilipar",
          "Vasútipar",
          "Vegyipar",
          "Vízgazdálkodás"
        ],
        "after": [
          "A DONE Translations csapata 34 nyelven vállal műszaki szakfordítási megbízásokat. Amennyiben további kérdése van a fordítási szolgáltatásainkkal kapcsolatban, kérjük, vegye fel velünk a kapcsolatot az info@donetranslations.hu e-mail-címen."
        ]
      }
    ]
  },
  "financial": {
    "title": "Gazdasági fordítás - DONE Translations Fordítóiroda",
    "description": "Pénzügyi beszámolók, mérlegek fordítása. Minden esetben egyedi árajánlat. Gyors, precíz, megbízható gazdasági fordítások.",
    "h1": "Gazdasági fordítás",
    "lead": [
      "A pénzügyi és gazdasági szakszövegek fordítását gazdasági szakfordítók készítik. Ezeken a fordításokon rendszerint olyan fordítók dolgoznak, akik nemcsak szakképzett fordítók, hanem rendelkeznek közgazdászvégezettséggel is."
    ],
    "cta": true,
    "quote": "standard",
    "service": "translation",
    "blocks": [
      {
        "kind": "text",
        "paragraphs": [
          "A gazdasági szakfordítóink a széles körű szakmai ismereteik révén jól ismerik az üzleti világ sajátosságait és a gazdasági folyamatokat. A gazdasági szakfordítóink naprakész információkkal rendelkeznek a világgazdaság aktuális trendjeiről és változásairól. Emellett folyamatosan követik a piaci eseményeket, és figyelemmel kísérik a gazdasági híreket és jelentéseket, így a legújabb szakzsargon sem fog ki rajtuk. A folyamatos képzés és az állandó információgyűjtés teszi lehetővé, hogy a szakembereink mindig naprakészek legyenek.",
          "A pénzügyi fordításokhoz általában szigorú határidők és magas elvárások társulnak. A pénzügyi szakfordítóink azonban jól megbirkóznak ezekkel a kihívásokkal, és biztosítani tudják, hogy a fordítások időben elkészüljenek úgy, hogy a munkák minőségileg is kifogástalanok legyenek."
        ]
      },
      {
        "kind": "features",
        "heading": "Mire számíthat, ha szakfordítást rendel?",
        "items": [
          {
            "icon": "diploma",
            "title": "Szakértelem",
            "text": [
              "A szakfordítás során nem elegendő csupán az, hogy a fordító kiválóan ismerje a forrás- és a célnyelvet. A szakfordítónak megfelelő ismeretekkel is rendelkeznie kell az adott szakterületen."
            ]
          },
          {
            "icon": "proofread",
            "title": "Pontosság",
            "text": [
              "A szakfordításban különösen fontos, hogy a fordítás a lehető legpontosabb legyen. A DONE Translations ezt a kettős minőség-ellenőrzési rendszerével biztosítja, amelynek keretében minden szakfordításon legalább két szakfordító kolléga dolgozik."
            ]
          },
          {
            "icon": "coherence",
            "title": "Koherencia",
            "text": [
              "A szakfordítások megkövetelik az adott szakterületnek megfelelő szókincs használatát. Fontos, hogy a fordítás során mindig ugyanazt a kifejezést használja a fordító ugyanarra a fogalomra, és hogy a szöveg egésze koherens legyen."
            ]
          },
          {
            "icon": "target",
            "title": "Egyértelműség",
            "text": [
              "A szakfordítások során kerülni kell az olyan megfogalmazásmódokat, amelyek a szöveget többértelművé teszik. A szakfordításnak félreérthetetlennek kell lennie."
            ]
          }
        ]
      },
      {
        "kind": "list",
        "heading": "A leggyakoribb gazdasági szövegek, amelyeket fordítunk:",
        "items": [
          "Pénzügyi beszámolók és elemzések",
          "Adóbevallások",
          "Mérlegek",
          "Szakmai cikkek és tanulmányok",
          "Kereskedelmi és pénzügyi statisztikák"
        ],
        "after": [
          "A DONE Translations csapata 27 nyelven vállal gazdasági szakfordítási megbízásokat. Amennyiben további kérdése van a fordítási szolgáltatásainkkal kapcsolatban, kérjük, vegye fel velünk a kapcsolatot az info@donetranslations.hu e-mail-címen."
        ]
      }
    ]
  },
  "legal": {
    "title": "Jogi fordítás - DONE Translations Fordítóiroda",
    "description": "Szerződések, jegyzőkönyvek, okiratok, bírósági dokumentumok vagy más egyéb jogi szövegek precíz fordítása.",
    "h1": "Jogi fordítás",
    "lead": [
      "Ha szerződéseket, jegyzőkönyveket, okiratokat, bírósági dokumentumokat vagy más egyéb jogi szöveget szeretne lefordíttatni, mindenképpen jogi szakfordítóra bízza a munkát. A jogi szövegek fordítása esetén elengedhetetlen, hogy a fordító tisztában legyen mind a forrásnyelvi, mind a célnyelvi jog jogrendszerével. A jogi szakszövegek fordítása során mindig kiemelt figyelmet fordítunk a megfelelő fordító kiválasztására."
    ],
    "cta": true,
    "quote": "standard",
    "service": "translation",
    "blocks": [
      {
        "kind": "text",
        "paragraphs": [
          "A jogi szakfordítóink feladata, hogy a jogi dokumentumok tartalmát és jelentését a lehető legpontosabban ültessék át az adott célnyelvre. A jogi fordítások esetében a szakfordítóknak különös precizitással kell végezniük a munkájukat, mivel a hibás vagy pontatlan fordítások súlyos jogi következményeket vonhatnak maguk után. A jogi szakfordítóink szükség esetén jogi szakértőkkel is konzultálnak, hogy biztosítsák a fordítások helyességét és pontosságát.",
          "Bizonyos szövegek esetében a fordítás sikeressége szempontjából kulcsfontosságú lehet a jogi szakfordító és az ügyfél közötti szoros együttműködés is. Előfordulhat, hogy a lefordítandó szöveg tartalmának teljes megértéséhez a fordítónak további információkra van szüksége, ezért arra kérjük, hogy szükség esetén aktív kommunikációval támogassa a munkánkat."
        ]
      },
      {
        "kind": "features",
        "heading": "Mire számíthat, ha szakfordítást rendel?",
        "items": [
          {
            "icon": "diploma",
            "title": "Szakértelem",
            "text": [
              "A szakfordítás során nem elegendő csupán az, hogy a fordító kiválóan ismerje a forrás- és a célnyelvet. A szakfordítónak megfelelő ismeretekkel is rendelkeznie kell az adott szakterületen."
            ]
          },
          {
            "icon": "proofread",
            "title": "Pontosság",
            "text": [
              "A szakfordításban különösen fontos, hogy a fordítás a lehető legpontosabb legyen. A DONE Translations ezt a kettős minőség-ellenőrzési rendszerével biztosítja, amelynek keretében minden szakfordításon legalább két szakfordító kolléga dolgozik."
            ]
          },
          {
            "icon": "coherence",
            "title": "Koherencia",
            "text": [
              "A szakfordítások megkövetelik az adott szakterületnek megfelelő szókincs használatát. Fontos, hogy a fordítás során mindig ugyanazt a kifejezést használja a fordító ugyanarra a fogalomra, és hogy a szöveg egésze koherens legyen."
            ]
          },
          {
            "icon": "target",
            "title": "Egyértelműség",
            "text": [
              "A szakfordítások során kerülni kell az olyan megfogalmazásmódokat, amelyek a szöveget többértelművé teszik. A szakfordításnak félreérthetetlennek kell lennie."
            ]
          }
        ]
      },
      {
        "kind": "list",
        "heading": "A leggyakoribb jogi szövegek, amelyeket fordítunk:",
        "items": [
          "Szerződések, például munkaszerződések, adásvételi szerződések",
          "Jogszabályok, rendeletek, törvények és szabályozások",
          "Bírósági dokumentumok"
        ],
        "after": [
          "A DONE Translations csapata 24 nyelven vállal jogi szakfordítási megbízásokat. Amennyiben további kérdése van a fordítási szolgáltatásainkkal kapcsolatban, kérjük, vegye fel velünk a kapcsolatot az info@donetranslations.hu e-mail-címen."
        ]
      }
    ]
  },
  "medical": {
    "title": "Egészségügyi fordítás - DONE Translations Fordítóiroda",
    "description": "Zárójelentések, orvosi leletek, betegtájékoztatók fordítása. Pontos és megbízható egészségügyi fordítás.",
    "h1": "Egészségügyi fordítás",
    "lead": [
      "Az egészségügyi fordítások során mindig nagy hangsúlyt fektetünk arra, hogy a szakfordító kellő ismerettel és szaktudással rendelkezzen az adott témában. Az egészségügyi szakfordítóink alaposan ismerik az orvosi terminológiát, eljárásokat és protokollokat. Ez biztosítja, hogy a fordítások mindig pontosak és megbízhatóak legyenek."
    ],
    "cta": true,
    "quote": "standard",
    "service": "translation",
    "blocks": [
      {
        "kind": "text",
        "paragraphs": [
          "Az egészségügyi fordítások során gyakran találkozunk speciális terminológiával és szakszavakkal. Szakfordítóink pontosan ismerik ezeket a kifejezéseket, legyen szó akár a legújabb orvostechnológiai terminusról. Ez annak köszönhető, hogy az egészségügyi szakfordítóink folyamatosan naprakészek, és állandóan követik az orvosi szakirodalom és kutatások legfrissebb eredményeit.",
          "Az egészségügyi dokumentumok gyakran tartalmaznak olyan kényes adatokat, mint például beteginformációkat, orvosi diagnózisokat, kezelési tervet és egyéb bizalmas részleteket. Fordítóink a betegek személyes adatait mindig bizalmasan kezelik. Az egészségügyi dokumentumok fordítása során az adatok védelme és biztonsága számunkra kiemelt fontosságú. Minden rendelkezésünkre bocsátott dokumentumot bizalmasan és az adatvédelmi törvényeknek megfelelően kezelünk."
        ]
      },
      {
        "kind": "features",
        "heading": "Mire számíthat, ha szakfordítást rendel?",
        "items": [
          {
            "icon": "diploma",
            "title": "Szakértelem",
            "text": [
              "A szakfordítás során nem elegendő csupán az, hogy a fordító kiválóan ismerje a forrás- és a célnyelvet. A szakfordítónak megfelelő ismeretekkel is rendelkeznie kell az adott szakterületen."
            ]
          },
          {
            "icon": "proofread",
            "title": "Pontosság",
            "text": [
              "A szakfordításban különösen fontos, hogy a fordítás a lehető legpontosabb legyen. A DONE Translations ezt a kettős minőség-ellenőrzési rendszerével biztosítja, amelynek keretében minden szakfordításon legalább két szakfordító kolléga dolgozik."
            ]
          },
          {
            "icon": "coherence",
            "title": "Koherencia",
            "text": [
              "A szakfordítások megkövetelik az adott szakterületnek megfelelő szókincs használatát. Fontos, hogy a fordítás során mindig ugyanazt a kifejezést használja a fordító ugyanarra a fogalomra, és hogy a szöveg egésze koherens legyen."
            ]
          },
          {
            "icon": "target",
            "title": "Egyértelműség",
            "text": [
              "A szakfordítások során kerülni kell az olyan megfogalmazásmódokat, amelyek a szöveget többértelművé teszik. A szakfordításnak félreérthetetlennek kell lennie."
            ]
          }
        ]
      },
      {
        "kind": "list",
        "heading": "A leggyakoribb egészségügyi szövegek, amelyeket fordítunk:",
        "items": [
          "Orvosi leletek",
          "Zárójelentések",
          "Betegtájékoztatók",
          "Orvosi szakcikkek és publikációk"
        ],
        "after": [
          "A DONE Translations csapata 16 nyelven vállal egészségügyi szakfordítási megbízásokat. Amennyiben további kérdése van a fordítási szolgáltatásainkkal kapcsolatban, kérjük, vegye fel velünk a kapcsolatot az info@donetranslations.hu e-mail-címen."
        ]
      }
    ]
  },
  "marketing": {
    "title": "Marketing fordítás - DONE Translations Fordítóiroda",
    "description": "Marketinganyagok kreatív fordítása a legjobb szakemberek által. Garanciát vállalunk a minőségre. Minden esetben egyedi árajánlat.",
    "h1": "Marketingszövegek fordítása",
    "lead": [
      "A marketingszövegek fordítása talán az egyik legizgalmasabb fordítási szakterület, ahol a szaktudás és a kreativitás találkozik."
    ],
    "cta": true,
    "quote": "standard",
    "service": "translation",
    "blocks": [
      {
        "kind": "text",
        "paragraphs": [
          "Marketingszövegek – például reklámok, hirdetések, médiaanyagok, közösségimédia-bejegyzések – fordításakor a szakfordítónak gyakran szójátékokat, rímeket, frappáns és figyelemfelkeltő szlogeneket kell fordítania. Ez korántsem annyira egyszerű, mint amilyennek tűnik. A marketinganyagok fordításakor rengeteg tényezőt figyelembe kell venni. Fontos, hogy a fordító tisztában legyen azzal, hogy ki a célközönség, valamint minden más információra szüksége van ahhoz, hogy a fordítás ugyanolyan hatást érjen el a célnyelven, mint a forrásnyelven.",
          "Fordítóirodánkban a nagy kreativitást igénylő marketinganyagok fordításán általában több szakfordító ötletel egyszerre. Amennyiben pl. egy szlogent szeretne lefordíttatni egy másik nyelvre, kérésére több fordítási javaslatot is biztosítunk."
        ]
      },
      {
        "kind": "features",
        "heading": "Mire számíthat, ha szakfordítást rendel?",
        "items": [
          {
            "icon": "diploma",
            "title": "Szakértelem",
            "text": [
              "A szakfordítás során nem elegendő csupán az, hogy a fordító kiválóan ismerje a forrás- és a célnyelvet. A szakfordítónak megfelelő ismeretekkel is rendelkeznie kell az adott szakterületen."
            ]
          },
          {
            "icon": "proofread",
            "title": "Pontosság",
            "text": [
              "A szakfordításban különösen fontos, hogy a fordítás a lehető legpontosabb legyen. A DONE Translations ezt a kettős minőség-ellenőrzési rendszerével biztosítja, amelynek keretében minden szakfordításon legalább két szakfordító kolléga dolgozik."
            ]
          },
          {
            "icon": "coherence",
            "title": "Koherencia",
            "text": [
              "A szakfordítások megkövetelik az adott szakterületnek megfelelő szókincs használatát. Fontos, hogy a fordítás során mindig ugyanazt a kifejezést használja a fordító ugyanarra a fogalomra, és hogy a szöveg egésze koherens legyen."
            ]
          },
          {
            "icon": "target",
            "title": "Egyértelműség",
            "text": [
              "A szakfordítások során kerülni kell az olyan megfogalmazásmódokat, amelyek a szöveget többértelművé teszik. A szakfordításnak félreérthetetlennek kell lennie."
            ]
          }
        ]
      },
      {
        "kind": "list",
        "heading": "A leggyakoribb marketingszövegek, amelyeket fordítunk:",
        "items": [
          "Általános marketinganyagok",
          "Reklámok",
          "Hirdetések",
          "Közösségimédia-bejegyzések",
          "Szlogenek"
        ],
        "after": [
          "A DONE Translations csapata 20 nyelven vállal marketingfordítási megbízásokat. Amennyiben további kérdése van a fordítási szolgáltatásainkkal kapcsolatban, kérjük, vegye fel velünk a kapcsolatot az info@donetranslations.hu e-mail-címen."
        ]
      }
    ]
  },
  "languages": {
    "title": "Fordítás 86 nyelvre - DONE Translations Fordítóiroda",
    "description": "Fordítás és tolmácsolás angol, német, francia, olasz, spanyol, orosz, arab, kínai és még sok más nyelven. Garancia a minőségre.",
    "h1": "Nyelvek",
    "lead": [
      "amelyekkel irodánk foglalkozik"
    ],
    "cta": false,
    "quote": "standard",
    "service": "translation",
    "blocks": [
      {
        "kind": "languages",
        "groups": [
          [
            "magyar",
            "angol",
            "német",
            "francia",
            "spanyol",
            "orosz"
          ],
          [
            "albán",
            "arab",
            "bosnyák",
            "mongol",
            "bolgár",
            "horvát",
            "kínai",
            "cseh",
            "dán",
            "holland",
            "koreai",
            "finn",
            "újgörög",
            "ógörög",
            "latin",
            "hindi",
            "héber",
            "olasz",
            "japán",
            "indonéz",
            "lett",
            "litván",
            "macedón",
            "maláj",
            "norvég",
            "lengyel",
            "portugál",
            "román",
            "szerb",
            "szlovák",
            "szlovén",
            "svéd",
            "thai",
            "török",
            "katalán",
            "ukrán",
            "urdu",
            "vietnámi",
            "észt"
          ],
          [
            "nepáli",
            "örmény",
            "bengáli",
            "perzsa",
            "grúz",
            "izlandi",
            "kazah",
            "montenegrói",
            "tagalog",
            "khmer",
            "tádzsik",
            "kirgiz",
            "baszk",
            "pastu",
            "ujgur",
            "máltai",
            "haiti kreol",
            "belarusz",
            "afrikaans",
            "feröeri",
            "jiddis",
            "flamand",
            "hawaii",
            "volof",
            "türkmén",
            "skót gael",
            "ír",
            "szanszkrit",
            "eszperantó",
            "klingon",
            "szamoai",
            "tamil",
            "tibeti",
            "grönlandi",
            "luxemburgi",
            "zulu",
            "azeri",
            "pandzsábi",
            "kurd",
            "üzbég",
            "lovári"
          ]
        ]
      }
    ]
  },
  "prices": {
    "title": "Árak - DONE Translations Fordítóiroda",
    "description": "Egyszerű ajánlatkérési felület. Minden esetben egyedi árajánlatot készítünk Önnek. Kollégáink készséggel állnak a rendelkezésére.",
    "h1": "Árak",
    "lead": [],
    "cta": false,
    "quote": "standard",
    "service": "translation",
    "blocks": [
      {
        "kind": "price",
        "highlight": "Szakfordítás 3,0 Ft/karakter ártól (szóközökkel együtt).",
        "paragraphs": [
          "Kérjük, vegye figyelembe, hogy minden esetben egyéni árajánlatot adunk. A fordítás ára függ a nyelvpártól, a szakterülettől, a határidőtől, a forrásnyelvi dokumentum formátumától és sok más tényezőtől. Ebből kifolyólag arra kérjük Önt, hogy küldje el a lefordíttatni kívánt dokumentumot. A projektmenedzsereink a lehető leghamarabb felveszik Önnel a kapcsolatot, és egyedi árajánlatot készítenek Önnek. Az árajánlat ingyenes, és semmilyen kötelezettséggel nem jár."
        ]
      }
    ]
  },
  "quote": {
    "title": "Ajánlatkérés - DONE Translations Fordítóiroda",
    "description": "Egyszerű ajánlatkérési felület – fordítás, tolmácsolás, lektorálás.",
    "h1": "Ajánlatkérés",
    "lead": [],
    "cta": false,
    "quote": "standard",
    "service": "translation",
    "blocks": [
      {
        "kind": "contact"
      }
    ]
  },
  "about": {
    "title": "DONE Translations Fordítóiroda",
    "description": "Fordítás több szakterületre, lektorálás, utószerkesztés, tolmácsolás szolgáltatás cégeknek és magánszemélyeknek egyaránt.",
    "h1": "Rólunk",
    "lead": [
      "Csapatunk 2018 óta foglalkozik fordítással és tolmácsolással. A DONE Translations kezdetekben kizárólag német–magyar és magyar–német nyelvpárban, elsősorban műszaki szakterületen nyújtott nyelvi szolgáltatásokat. A szakma iránti elkötelezettségünk kifizetődött. Mára már 86 különböző nyelven, szinte minden szakterületen vállalunk fordítási és tolmácsolási megbízásokat. Ez mindenekelőtt a meglévő partnereinknek és a kiváló szakfordítóinknak köszönhető."
    ],
    "cta": true,
    "quote": "standard",
    "service": "translation",
    "blocks": [
      {
        "kind": "text",
        "paragraphs": [
          "Minden egyes projektünk során arra törekszünk, hogy a lehető legmagasabb minőségű nyelvi szolgáltatást nyújtsuk. A megbízások során mindig az ügyfeleink elégedettsége a prioritás számunkra. Büszkék vagyunk arra, hogy sok ügyfelünk hosszú évek óta velünk dolgozik.",
          "Ha professzionális fordításra vagy tolmácsolásra van szüksége, keressen minket bizalommal. Projektmenedzsereink készséggel válaszolnak minden felmerülő kérdésére."
        ]
      }
    ]
  },
  "careers": {
    "title": "Karrier - DONE Translations Fordítóiroda",
    "description": "Mindig nyitottak vagyunk új szakfordítók és tolmácsok jelentkezésére. Amennyiben van még kapacitása új megbízásokra, jelentkezzen hozzánk!",
    "h1": "Karrier",
    "lead": [],
    "cta": false,
    "quote": false,
    "service": "translation",
    "blocks": [
      {
        "kind": "text",
        "heading": "Mindig nyitottak vagyunk új szakfordítók és tolmácsok jelentkezésére.",
        "paragraphs": [
          "Amennyiben van még kapacitása új megbízásokra, jelentkezzen hozzánk az alábbiakban ismertetett módon."
        ]
      },
      {
        "kind": "list",
        "heading": "Elvárások",
        "items": [
          "Szakfordítói vagy tolmácsvégzettség",
          "A forrásnyelv és a célnyelv tökéletes ismerete",
          "Kiváló helyesírás",
          "Legalább egy CAT-szoftver magas szintű ismerete és használata",
          "Alapvető számítástechnikai ismeretek"
        ]
      },
      {
        "kind": "list",
        "heading": "Amit kínálunk",
        "items": [
          "Folyamatos visszajelzés és szakmai fejlődési lehetőség",
          "Izgalmas projektek",
          "Rugalmasság",
          "Kedves, támogató projektmenedzsment",
          "Természetesen mindig pontos kifizetés"
        ]
      },
      {
        "kind": "steps",
        "heading": "Hogyan jelentkezzek?",
        "steps": [
          {
            "icon": "mail",
            "title": "Jelentkezés",
            "text": [
              "Küldje el az önéletrajzát a karrier@donetranslations.hu e-mail-címre. Kérjük, adja meg, milyen nyelvről milyen nyelvre fordít, a munkadíját, valamint a főbb szakterületeit."
            ]
          },
          {
            "icon": "translate",
            "title": "Próbafordítás",
            "text": [
              "Amennyiben megfelel a követelményeknek, küldeni fogunk Önnek egy próbafordítást."
            ]
          },
          {
            "icon": "bell",
            "title": "Értesítés",
            "text": [
              "A próbafordítás eredményről 10 munkanapon belül értesítjük."
            ]
          }
        ]
      }
    ]
  },
  "imprint": {
    "title": "Impresszum - DONE Translations",
    "description": null,
    "h1": "Impresszum",
    "lead": [],
    "cta": false,
    "quote": false,
    "service": "translation",
    "blocks": [
      {
        "kind": "legal",
        "items": [
          {
            "tag": "h3",
            "text": "Szatmáry Máté e. v."
          },
          {
            "tag": "p",
            "text": "Székhely: 3532 Miskolc, Gyula u. 20/D."
          },
          {
            "tag": "p",
            "text": "E-mail-cím: info@donetranslations.hu"
          },
          {
            "tag": "p",
            "text": "Adószám: 68419752-1-25"
          },
          {
            "tag": "h3",
            "text": "Tárhelyszolgáltató"
          },
          {
            "tag": "p",
            "text": "Rackforest Zrt."
          },
          {
            "tag": "p",
            "text": "Székhely: 1132 Budapest, Victor Hugo utca 11. 5.em. B05001."
          },
          {
            "tag": "p",
            "text": "Cégjegyzékszám 01-10-142004"
          },
          {
            "tag": "p",
            "text": "Adószám: 32056842-2-41"
          }
        ]
      }
    ]
  },
  "privacy": {
    "title": "Adatvédelmi nyilatkozat - DONE Translations",
    "description": null,
    "h1": "ADATVÉDELMI NYILATKOZAT",
    "lead": [],
    "cta": false,
    "quote": false,
    "service": "translation",
    "blocks": [
      {
        "kind": "legal",
        "items": [
          {
            "tag": "p",
            "text": "1. BEVEZETŐ Számunkra nagyon fontos, hogy betartsuk az aktuálisan érvényes adatvédelmi szabályozást és törvényeket, így az alábbiakban részletesen tárgyaljuk és bemutatjuk a donetranslations.hu oldal és Szatmáry Máté e.v. adatvédelemre irányuló lépéseit, és az adatgyűjtéssel kapcsolatos folyamatait. Az adatokat Szatmáry Máté e. v. kezeli, és ő felelős a személyes adatok kezeléséért."
          },
          {
            "tag": "p",
            "text": "Kapcsolati adatok: Teljes név: Szatmáry Máté e. v. E-mail-cím: info@donetranslations.hu Postai cím: 3532 Miskolc, Gyula u. 20/D."
          },
          {
            "tag": "p",
            "text": "2. MILYEN SZEMÉLYES ADATOKAT KEZELÜNK, ÉS MILYEN OKKAL? A személyes adatok azok, amik egyértelműen lehetővé teszik egy egyén pontos azonosítását. A donetranslations.hu oldalon az alábbi személyes adatokat kezeljük, a jogalap pontos megjelölésével:"
          },
          {
            "tag": "p",
            "text": "KOMMUNIKÁCIÓS ADATOK Ide tartozik bármilyen üzenet, amit a weboldalon keresztül, e-mailben, közösségimédia-üzenetben vagy bármilyen kommunikációs formában eljuttat hozzánk. Ezeket az adatokat azért dolgozzuk fel, és tartjuk meg, hogy a rendeléseket teljesíteni tudjuk, és hogy esetleges jogi igények esetén döntési alapot szolgáltassanak. A jogalapunk ennek a feldolgozására a felhasználó igazolható érdeklődése a tevékenységünk felé, ami megnyilvánul a nekünk címzett üzenetekben."
          },
          {
            "tag": "p",
            "text": "VÁSÁRLÓI ADATOK Amibe beletartozik minden adat, ami a termékek és szolgáltatások vásárlásával kapcsolatos, mint például a vásárló neve, szállítási és számlázási címe, e-mail-címe, telefonszáma, a vásárolt termék adatai. Ezeket az adatokat a rendelések sikeres teljesítése érdekében dolgozzuk fel, és hogy jogilag megfelelő feljegyzéseink legyenek a vásárlásokról. Az adatok tárolásának jogalapja a rendeléssel létrejövő szerződés teljesítése a vásárló és Szatmáry Máté e. v. között."
          },
          {
            "tag": "p",
            "text": "FELHASZNÁLÓI ADATOK Amibe beletartoznak a weboldal használata során keletkező adatok, amik lehetővé teszik az oldal technikai működését, hogy az oldal biztonságát megőrizzük, hogy mentéseket tároljunk a felhasználók tevékenységéről, és hogy Ön mindig a lehető legrelevánsabb tartalomhoz férjen hozzá. Az adatok feldolgozásának jogalapja a felhasználó egyértelmű érdeklődése a tevékenységünk felé, aminek a biztosításához és az oldal technikai működéséhez ezeknek a tárolása szükséges."
          },
          {
            "tag": "p",
            "text": "TECHNIKAI ADATOK Amibe beletartoznak az oldal használata során keletkezett adatok, mint az IP-cím, a bejelentkezési információk, böngészőadatok, az egyes oldalak látogatási ideje, oldalmegtekintések és navigációs utak, az oldalak látogatásának száma és időpontja, időzónák, és a készülék adatai, amivel megtekinti az oldalt. Az adatok forrása az analitikai szoftverünk. Ezeket az adatokat azért dolgozzuk fel, hogy kielemezzük a felhasználók szokásait az oldalon, megőrizzük az oldalunk biztonságos működését, és megértsük az egyes marketingdöntéseink hasznosságát. Az adatok feldolgozásának jogalapja a felhasználó egyértelmű érdeklődése a tevékenységünk felé, ami lehetővé teszi a számunkra, hogy a biztonsági elvárásoknak megfelelően feldolgozzuk ezeket az adatokat, és az üzlet növelésére felhasználjuk a hatásosabb működés érdekében."
          },
          {
            "tag": "p",
            "text": "MARKETINGADATOK Amibe beletartoznak a látogató preferenciái, hogy milyen marketingtartalmat fogad tőlünk szívesen. Ezeket az adatokat azért dolgozzuk fel, hogy a szolgáltatásainkhoz kapcsolódó reklámot küldjünk, ami felé a felhasználó érdeklődést fejezett ki. Az adatok feldolgozásának jogalapja a felhasználó egyértelmű érdeklődése a tevékenységünk felé, ami lehetővé teszi a számunkra, hogy a biztonsági elvárásoknak megfelelően feldolgozzuk ezeket az adatokat, és az üzlet növelésére felhasználjuk a hatásosabb működés érdekében. A gyűjtött adatokat időnként felhasználhatjuk olyan célokra, mint célzott, releváns hirdetések biztosítása a Facebook™-platformon, illetve különböző dinamikus hirdetési felületeken, és arra, hogy mérjük a hirdetések hatásos működését. Az adatok feldolgozásának jogalapja a felhasználó egyértelmű érdeklődése a tevékenységünk felé, ami lehetővé teszi a számunkra, hogy a biztonsági elvárásoknak megfelelően feldolgozzuk ezeket az adatokat, és az üzlet növelésére felhasználjuk a hatásosabb működés érdekében. A tevékenységünk során nem gyűjtünk olyan érzékeny adatokat, mint etnikai hovatartozás, vallási szemlélet, szexuális élet és orientáció, politikai vélemények és szakszervezeti tagság, vagy egészségügyi háttér, és genetikai vagy biometrikai információk."
          },
          {
            "tag": "p",
            "text": "3. HOGYAN GYŰJTÜNK ADATOKAT? Személyes adatokat gyűjthetünk olyan módon, hogy a felhasználó direkten biztosítja a számunkra (például egy üzenet küldésével). Továbbá bizonyos adatok automatikusan gyűjtésre kerülnek az oldal használata során, például ún. „cookie”-kkal és hasonló technológiákkal. Ezek csak a felhasználó hozzájárulásának megadása után lépnek működésbe. Bővebb információért kérjük nézze meg a Cookie-nyilatkozatunkat. Bizonyos adatokat külső partnerektől fogadunk, mint például analitikai szolgáltatóktól, mint a Google (EU-n kívüli partner), hirdetési hálózatoktól, mint a Facebook™ (EU-n kívüli partner)."
          },
          {
            "tag": "p",
            "text": "4. AZ ADATVÉDELEMMEL KAPCSOLATOS GYAKORLATI LÉPÉSINK Szatmáry Máté e. v. számára rendkívül fontos a felhasználók adatainak védelme, és a hatályos szabályozásnak való megfelelés. Ezért az oldalon végzett adatvédelmi hatásvizsgálat után listát készítettünk a gyűjtött adatokról, azoknak a szükségességéről és jogalapjáról, és törvényi megfelelőségéről."
          },
          {
            "tag": "p",
            "text": "• Az űrlapokon megadott és oldalon keletkező adatok védelme érdekében SSL minősítést alkalmazunk a teljes weboldalon (Let’s Encrypt Authority X3 certifikáció). • Az oldal támadás elleni védelme érdekében prémium biztonsági szoftvert (iThemes Security Pro) alkalmazunk, hogy az ún. „brute force” és vírusos támadások ellen védjük a tárolt adatokat. • Az oldal adatbázisaiban a vásárlási és felhasználói adatok titkosított formában (pszeudonimizált módon) vannak tárolva, így nem olvashatók külső fél számára. • Jelen adatvédelmi nyilatkozatban űrlapokon keresztül biztosítjuk a felhasználók számára a személyes adataik kezelésével kapcsolatos információk igénylését, a személyes adataik módosítását vagy törlését."
          },
          {
            "tag": "p",
            "text": "Időnként az üzleti tevékenységünk érdekében szükségszerű szolgáltató partnereink számára adatokat biztosítani (például tárhelyszolgáltató, hírlevélküldő szoftver). Ilyen esetben mindig úgy választunk, hogy a GDPR rendelet elvárásainak megfeleljenek, és USA-bázisú partner esetében az EU-US Privacy Shield adatvédelmi kezdeményezésben részt vegyenek, valamint adatkezelési szerződést iratunk velük alá, biztosítva az adatok felelős kezelését."
          },
          {
            "tag": "p",
            "text": "5. MARKETINGKOMMUNIKÁCIÓ A vállalkozás tevékenysége során nélkülözhetetlen fontosságú a marketingkommunikáció folytatása. Az ezzel kapcsolatos adatkezelés jogalapja az érdeklődés mutatása a szolgáltatásaink felé, vagy a felhasználók kifejezett hozzájárulása. Az Európai Unió Privacy and Electronic Communications Regulations (PECR) szabályozása alapján marketingcélú üzeneteket küldünk a felhasználóinknak, ha vásároltak tőlünk, vagy kifejezetten hozzájárultak marketingüzenetek fogadásához. A hozzájárulás felfüggesztését, és az üzenetekről való leiratkozást minden esetben jól látható módon lehetővé tesszük. Minden egyes e-mail alján megtalálható a leiratkozáshoz szükséges link, vagy az adatbázisból való eltávolítás az info@donetranslations.hu e-mail-címen kérhető. A marketingkommunikációról való leiratkozás esetén is küldhetünk üzeneteket, de csak a rendelések teljesítésére vonatkozóan."
          },
          {
            "tag": "p",
            "text": "6. MEGJEGYZÉS A SZEMÉLYES ADATOKRA VONATKOZÓAN Időnként szükségszerű bizonyos személyes adatokat megosztani bizonyos partnereinkkel a normál üzletmenet fenntartása érdekében: – IT-szolgáltatók, és a számítástechnikai rendszereken hibaelhárítást és karbantartást végző szolgáltatók; – Szakértői partnerek, mint könyvelők, biztosítók; – Kormányzati szervek, amik a tevékenységünkről kérnek beszámolást; Nemzetközi adattranszferek A felhasználók adatait időnként az üzletmenet fenntartása érdekében szükségszerű megosztanunk az Európai Gazdasági Térségen (EGT) kívül szolgáltató partnerekkel. Az EGT-n kívüli országok sok esetben nem biztosítanak azonos szintű védelmet az adatoknak, ezért az európai törvények tiltják az adatok kivitelét a megfelelő feltételek teljesülésének hiányában. Bármikor, amikor a személyes adatok az EGT-n kívülre kerülnek, megtesszük a 4. pontban tárgyalt lépéseken felül az alábbiakat az adatok biztonságos kezelésének érdekében: – Csak olyan országokba továbbítjuk az adatokat, amiket az Európai Bizottság adatbiztonság szempontjából megfelelőnek tart. – Csak olyan USA-bázisú szolgáltatásokat használunk, amik része az EU-US Privacy Shield elnevezésű adatbiztonsági kezdeményezésnek. Ha a fentiek nem teljesülnek, a kifejezett hozzájárulását kérjük a felhasználóknak az adattranszfer megtételére. A hozzájárulás bármikor visszavonható. Külső oldalakra vezető linkek Ez az oldal időnként tartalmaz külső oldalakra vezető linkeket, vagy az oldalba beágyazva találhatóak kódrészletek, amik külső szolgáltatások működését biztosítják. Ezeknek a linkeknek a kattintása, vagy a beágyazott megoldások használata lehetővé teheti külső partnereknek, hogy adatokat gyűjtsenek a felhasználókról. Bár mindent megteszünk a partnerek megfelelő átvizsgálása érdekében, de nincs irányításunk az ő adatvédelmi elveik felett, és nem vagyunk felelősek az ő adatkezelési elveikért."
          },
          {
            "tag": "p",
            "text": "7. AZ ADATKEZELÉS IDŐTARTAMA A felhasználók adatait mindig csak addig tároljuk, amíg jogi/könyvelési/adatszolgáltatási kötelezettségeink azt kötelezővé teszik, illetve a szolgáltatás működtetéséhez szükséges. Amikor a tárolás időtartamáról döntünk, figyelembe vesszük az adatok mennyiségét, jellegét és érzékenységét, és a kiszivárgásának potenciális hatását adatvédelmi incidens esetén. Adózási okokból szükséges megőriznünk a vásárlók számlázási és vásárlási adatait legalább 8 évig, hogy jogi kötelezettségeinknek eleget tegyünk. Bizonyos körülmények között anonimizált formában felhasználhatjuk az adatokat statisztikai célokra, ami esetben tájékoztatás nélkül tároljuk korlátlan ideig az adatokat."
          },
          {
            "tag": "p",
            "text": "8. A LÁTOGATÓ JOGAI Az Európai Unió állampolgáraként a General Data Protection Regulation (GDPR) elnevezésű törvény a következő jogokat biztosítja az oldal felhasználóinak: a) Hozzáférés a személyes adatokhoz Az oldal felhasználóinak jogában áll kérnie egy másolatot a Szatmáry Máté e. v. által tárolt személyes adatokról. A kérés általános esetben ingyenesen teljesítésre kerül, a kérvényezés után 14 napon belül. Ismételt, visszaélésszerű, indok nélküli adatkérvényezés esetén Szatmáry Máté e. v. egy mérsékelt összeget számíthat fel az adatok biztosítására, és további időre lehet szükség az adatok biztosításához. Továbbá Szatmáry Máté e. v. kéri a személyazonosság bizonyítását az adatok kiadása előtt, ezzel megelőzve a visszaélésszerű használatot. A személyes adatok kikéréséhez, kérjük, használja az alábbi kapcsolatfelvételi űrlapot: Adatigénylés / Adattörlés / Adatkorlátozás"
          },
          {
            "tag": "p",
            "text": "KONTAKTFELÜLET BEILLESZTÉSE b) Személyes adatok módosítása Amennyiben a személyes adatok módosultak, vagy tévesen lettek megadva, a felhasználóknak joga van az adatok módosítását kérni. A személyes adatok módosításához, kérjük, keressen fel minket az info@donetranslations.hu e-mail-címen. c) Személyes adatok törlésének kérése A felhasználóknak joga van az összes személyes adatuk törlését kérni. A kérést ingyenesen teljesítjük a kérést követő 14 napon belül. A személyes adatok törlése után a felhasználói fiók nem lesz elérhető, így az esetleg megvásárolt anyagok is elérhetetlenné válnak, mivel a felhasználói fiókhoz kapcsolódó személyes adatok elengedhetetlenül szükségesek a szolgáltatás eléréséhez. A Szatmáry Máté e. v. kéri a személyazonosság bizonyítását a személyes adatok törlése előtt, ezzel megelőzve a visszaélésszerű használatot. A személyes adatok törléséhez, kérjük, használja a fenti kapcsolatfelvételi űrlapot. d) A személyes adatok feldolgozásának korlátozásának kérése A felhasználóknak joga van kérésben korlátozni az adataik rendelkezésére bocsátását harmadik felek (szolgáltató partnerek) számára. A kérés benyújtása során megnevezhetők a korlátozni kívánt szolgáltató partnerek is. Fontos megjegyezni, hogy bizonyos szolgáltatókkal való együttműködés nélkülözhetetlen az oldal működéséhez, így az ő korlátozásuk esetén az oldal szolgáltatásai elérhetetlenné válnak a felhasználó számára. Szatmáry Máté e. v. kéri a személyazonosság bizonyítását a személyes adatok átadásának korlátozása előtt, ezzel megelőzve a visszaélésszerű használatot. A személyes adatok átadásának korlátozásához, kérjük, használja a fenti kapcsolatfelvételi űrlapot: Magyarországon az adatvédelemmel foglalkozó hivatalos szerv a Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH). A felhasználók az adatvédelemmel kapcsolatos jogaikról a NAIH honlapján tájékozódhatnak bővebben. Nemzeti Adatvédelmi és Információszabadság Hatóság, 1125 Budapest, Szilágyi Erzsébet fasor 22/C. Levelezési cím: 1530 Budapest, Pf.: 5., Telefon: 06.1.391.1400, Fax: 06.1.391.1410, E-mail: ugyfelszolgalat@naih.hu Honlap: http://www.naih.hu"
          },
          {
            "tag": "p",
            "text": "9. ANONIMIZÁLT ADATOK ÉS „COOKIE-K” A donetranslations.hu oldal e-mailekben és hirdetésekben ún. „cookie”-kat és ehhez hasonló technológiákat használ, mint pl. követőkódok, remarketingcímkék, pixelek, amik a felhasználó hozzájárulása után lépnek működésbe. Ezek a technológiák segítenek nekünk jobban megérteni a felhasználók viselkedését és érdeklődését, ezzel segítve a magasabb színvonalú és hatékonyabb működésünket. A célunk az, hogy a donetranslations.hu használata minél felhasználóbarátabb és személyesebb legyen. Amennyiben a felhasználó szeretné megtiltani ezeknek a technológiáknak a nem személyes adatok rögzítését, az az alábbi módokon tehető meg: – a webhelyen megjelenő cookie-figyelmeztetések segítségével letiltható ezek betöltődése; – a böngészőben a „cookie”-k letiltásával; A donetranslations.hu oldalon található további cookie-kkal és követőkódokkal kapcsolatban további információt a Cookie-nyilatkozatunkban találhat."
          }
        ]
      }
    ]
  },
  "cookies": {
    "title": "Cookie Nyilatkozat - DONE Translations",
    "description": null,
    "h1": "COOKIE NYILATKOZAT",
    "lead": [],
    "cta": false,
    "quote": false,
    "service": "translation",
    "blocks": [
      {
        "kind": "legal",
        "items": [
          {
            "tag": "p",
            "text": "A „cookie”-k (továbbiakban: „cookie” vagy „süti”) olyan kis szöveges fájlok, amelyeket egy weboldal felhasználhat arra, hogy még hatékonyabbá tegye a felhasználói élményt."
          },
          {
            "tag": "p",
            "text": "Néhány „süti” csak átmeneti és eltűnik a böngésző bezárásával, míg léteznek tartós változatok is, melyek huzamosabb ideig számítógépén maradnak. A jogszabályok szerint a sütiket abban az esetben tárolhatjuk a látogató eszközén, ha erre feltétlenül szükség van a weboldalunk működése érdekében."
          },
          {
            "tag": "p",
            "text": "Minden egyéb típusú süti használatához a látogató engedélyére van szükségünk. Jelen weboldal különféle sütiket használ. A weboldalon megjelenő néhány sütit harmadik fél szolgáltatóink helyezik el."
          },
          {
            "tag": "p",
            "text": "A böngészők lehetőséget adnak a sütibeállítások megváltoztatására. A legtöbb böngésző alapértelmezettként automatikusan elfogadja a sütiket, de ez megváltoztatható annak érdekében, hogy a beállítást követően megakadályozza az automatikus elfogadást."
          },
          {
            "tag": "p",
            "text": "Ha többet szeretne megtudni a böngésző beállításainak módosításáról, nézze át a böngésző utasításait vagy súgóját. A legnépszerűbb böngészők sütibeállításairól az alábbi linkeken tájékozódhat:"
          },
          {
            "tag": "p",
            "text": "Google Chrome"
          },
          {
            "tag": "p",
            "text": "Firefox"
          },
          {
            "tag": "p",
            "text": "Microsoft Edge"
          },
          {
            "tag": "p",
            "text": "Safari"
          },
          {
            "tag": "h2",
            "text": "HOL TÖRTÉNIK MEG TÁJÉKOZTATÁS ÉS A HOZZÁJÁRULÁS A SÜTIKEZELÉSSEL KAPCSOLATBAN?"
          },
          {
            "tag": "p",
            "text": "Amikor a honlapunkat első alkalommal látogatja meg, akkor egy pop-up (felugró) ablak jelenik meg a képernyő tetején, és meg tudja határozni azt, hogy mely sütikhez adja a hozzájárulását."
          },
          {
            "tag": "p",
            "text": "Ezen tájékoztató ablak tartalmaz egy linket ehhez az Adatvédelmi Nyilatkozathoz is is."
          },
          {
            "tag": "h2",
            "text": "SÜTIK TÍPUSAI"
          },
          {
            "tag": "p",
            "text": "3.1. Elengedhetetlenül szükséges sütik"
          },
          {
            "tag": "p",
            "text": "Az elengedhetetlen sütik weboldalunk használhatóságát segítik azáltal, hogy engedélyeznek olyan alapvető funkciókat, mint az oldalon való navigáció és a weboldal biztonságos területeihez való hozzáférés."
          },
          {
            "tag": "p",
            "text": "A weboldal ezen sütik nélkül nem tud megfelelően működni."
          },
          {
            "tag": "li",
            "text": "PHPSESSID: A felhasználói munkamenet állapotát megőrzi az oldalkérések között (a böngésző bezárásáig);"
          },
          {
            "tag": "li",
            "text": "CookieConsent: Eltárolja a felhasználó sütikezelési nyilatkozatát az adott domainen (1 év);"
          },
          {
            "tag": "li",
            "text": "__cfduid: A Cloudflare tartalomkiszolgáló azonosítja az internetes forgalmat (1 év);"
          },
          {
            "tag": "li",
            "text": "JSESSIONID: Egyedi, anonim azonosítót rendel minden oldalmegnyitáshoz az oldal használhatóságának javítása érdekében (a böngésző bezárásáig)."
          },
          {
            "tag": "p",
            "text": "3.2. Preferenciális sütik"
          },
          {
            "tag": "p",
            "text": "A preferenciális sütik használatával olyan információkat tudunk megjegyezni, amelyek megváltoztatják a weboldal bizonyos magatartását, illetve kinézetét, erre példa lehet az Ön által előnyben részesített nyelv vagy a régió, amelyben tartózkodik."
          },
          {
            "tag": "p",
            "text": "3.3. Statisztikai célú sütik"
          },
          {
            "tag": "p",
            "text": "Az adatok névtelen formában való gyűjtésén és jelentésén keresztül a statisztikai sütik segítenek a weboldal tulajdonosának abban, hogy megértse, hogyan lépnek interakcióba a látogatók a weboldallal."
          },
          {
            "tag": "p",
            "text": "3.4. Marketing célú sütik"
          },
          {
            "tag": "p",
            "text": "A személyre szabott sütiket a látogatók weboldal-tevékenységének nyomon követésére használjuk. A cél az, hogy minél relevánsabb hirdetéseket tegyünk közzé az egyéni felhasználók számára, preferenciájuknak megfelelő tartalmat jelenítsünk meg, valamint aktivitásra buzdítsuk őket."
          },
          {
            "tag": "li",
            "text": "ads/ga-audiences: A Google Adwords használja, olyan felhasználók célzásához, akiknek a böngészési szokásaik alapján magasabb vásárlási hajladósága feltételezhető (a böngésző bezárásáig);"
          },
          {
            "tag": "li",
            "text": "pref: Egyedi azonosítót rögzít, melyből a Google statisztikát készít a felhasználó által YouTube-on megtekintett videókról (8 hónap);"
          },
          {
            "tag": "li",
            "text": "fr: A Facebook használja, olyan felhasználók célzásához, akiknek a böngészési szokásaik alapján magasabb vásárlási hajladósága feltételezhető (3 hónap);"
          },
          {
            "tag": "li",
            "text": "tr: A Facebook használja, olyan felhasználók célzásához, akiknek a böngészési szokásaik alapján magasabb vásárlási hajladósága feltételezhető (a böngésző bezárásáig)."
          },
          {
            "tag": "h2",
            "text": "A SÜTIK BEÁLLÍTÁSAINAK ELLENŐRZÉSE ÉS LETILTÁSA"
          },
          {
            "tag": "p",
            "text": "A modern böngészők engedélyezik a „sütibeállítások” módosítását. A böngészők egy része alapértelmezettként automatikusan elfogadja a „sütiket”, de ez a beállítás is megváltoztatható annak érdekében, hogy a jövőre nézve megakadályozza a látogató az automatikus elfogadást."
          },
          {
            "tag": "p",
            "text": "Átállítás esetén a böngésző a továbbiakban minden alkalommal felajánlja a „sütik beállításának” választási lehetőségét."
          },
          {
            "tag": "p",
            "text": "Az Adatkezelő a „sütik” engedélyezése esetén sem jegyez meg semmilyen azonosítót vagy jelszót. A látogató a „sütik” elfogadása esetén is teljes biztonságban használhatja a szolgáltatásokat."
          },
          {
            "tag": "p",
            "text": "Felhívjuk látogatóink figyelmét, hogy mivel a „sütik” célja a weboldal használhatóságának és folyamatainak támogatása, valamint megkönnyítése, a „sütik” letiltása esetén nem tudjuk garantálni, hogy a látogató képes lesz a weboldal valamennyi funkciójának teljes körű használatára."
          },
          {
            "tag": "p",
            "text": "A weboldal ez esetben a tervezettől eltérően működhet a böngészőben."
          }
        ]
      }
    ]
  }
};
