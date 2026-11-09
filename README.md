# Done Translations – frontend

Ügyfélszerzésre optimalizált weboldal egy fordítóiroda számára, **Angular 21**-ben, admin felülettel.
A hozzá tartozó backend (Laravel): [mate_back](https://github.com/megyerimark/mate_back).

## Fejlesztés

Kell hozzá: Node.js 22 (legalább 22.12) vagy újabb, és a futó Laravel backend.

```bash
npm install
npm start            # http://localhost:4200
```

A `/api` hívásokat a fejlesztői szerver a `http://localhost:8000`-en futó Laravelhez továbbítja (`proxy.conf.json`).

## Tartalom és SEO

Az oldal **a régi donetranslations.hu (WordPress) oldalainak szövegét és címeit** használja, változtatás nélkül,
hogy a Google-helyezés megmaradjon. Csak a dizájn új.

- **`src/app/content/pages.hu.ts`**: a 18 régi oldal magyar szövege, címe (title) és leírása (description), szó szerint.
  A régi oldalból generáltuk; ha szöveget módosítasz, itt tedd (de a SEO miatt gondold meg kétszer).
- **`src/app/content/pages.en.ts`**: az angol változat (a magyar fordítása). **Élesítés előtt érdemes átnézni.**
- **`src/app/content/ui.ts`**: a felület közös szövegei (menü, gombok, űrlap, lábléc) és az elérhetőségek.
- **`src/app/content/paths.json`**: az oldalak címei. A magyarok **a régi WordPress címek, perjellel a végén**
  (`/forditas/`, `/jogi-forditas/` …) – ezeket ne változtasd meg. Az angolok: `/en/translation/` stb.

Amit a Google kap:

- **Előrenderelés**: buildeléskor minden oldal (mindkét nyelven, 38 oldal) kész HTML-ként készül el, benne a teljes
  szöveggel, a címmel, a leírással, a kanonikus címmel és a nyelvi párokkal (`hreflang`).
- **`sitemap.xml`** és **`robots.txt`**: a buildeléskor generálódnak (`scripts/generate-sitemap.mjs`).
- A régi Yoast sitemap címei (`/sitemap_index.xml`, `/page-sitemap.xml`) a backendben átirányítanak az újra.
- Megosztási kép: `public/og-image.png`. A cég adatai a keresőknek: `src/index.html` (JSON-LD).

Ellenőrzés: a régi oldal mind a 299 szövegrésze, és mind a 18 oldal címe és leírása szó szerint megvan az új oldalakon.
Ami szándékosan kimaradt: a régi főoldal „Visszajelzések” és „Partnereink” része (sablonszöveg volt: „Lorem ipsum”, „John Doe”).

## Admin felület

A **`/admin`** címen érhető el (pl. `https://donetranslations.hu/admin`). Admin felhasználót a backendben kell létrehozni (lásd ott).

- Összesítő számok állapot szerint (kattintásra szűr), keresés név, e-mail, telefon vagy megjegyzés alapján
- Részletek panel: válasz e-mailben egy kattintással, hívás, a feltöltött dokumentum letöltése
- Látszik, melyik szolgáltatásra kérték (fordítás, lektorálás, utószerkesztés, tolmácsolás + típusa, helyesírási tanácsadás)
  és hogy a magyar vagy az angol oldalról jött (EN jelölés; az ügyfél angolul kapta a visszaigazolást)
- Állapotok: **Új → Folyamatban → Ajánlat elküldve → Megrendelve / Elmaradt**
- Belső jegyzet (az ügyfél nem látja), törlés megerősítéssel
- **Utánkövetés**: ha egy elküldött ajánlatra 3 napja nem jött válasz, sáv jelzi a lista fölött, és egy kattintással kiszűrhetők
- **Ár** minden ajánlatkéréshez (Ft); a statisztika ebből számolja a megrendelések értékét és az átlagos megrendelést
- **Válaszsablonok** az ügyfél nyelvén (árajánlat, hiányzó adat, megrendelés visszaigazolása, utánkövetés): előre kitöltött
  levelet nyitnak a levelezőben. A szövegek: `src/app/admin/reply-templates.ts`
- **Előzmények és kommunikációs napló**: állapot-, ár- és jegyzetváltozások, rögzített hívások/e-mailek/találkozók
  (a válaszsablon megnyitása automatikusan bekerül)
- **Valós idejű jelzés**: percenként ellenőriz; új kérésnél felugró jelzés, számláló a fül címében, csengő a fejlécben,
  kérésre asztali értesítés
- **Teendők**: feladatok határidővel (önállóan vagy ajánlatkéréshez kötve), a lejártak pirossal, kész-pipa
- **Ügyféladatlap**: a részleteknél az ugyanattól az e-mail-címtől érkezett korábbi kérések és a megrendelések értéke
- **Statisztika**: havi/heti bontás, darabszám vagy megrendelési érték, megrendelési arány szolgáltatásonként,
  medián válaszidő
- **Vélemények és partnerek** (`/admin/velemenyek`): a weboldal „Ügyfeleink mondták” szakaszát tölti; csak a publikált látszik
- Szűrés dátum szerint (ettől–eddig), **Excel letöltése** a szűrésnek megfelelő összes ajánlatkéréssel
- **Statisztika** (`/admin/statisztika`): utolsó 12 hónap / idén / teljes időszak; ajánlatkérések és megrendelések száma,
  megrendelési arány, havi oszlopdiagram (táblázatként is), bontás szolgáltatás, állapot, célnyelv, határidő és oldal szerint
- Külön töltődik be, a nyilvános oldalt nem lassítja. A bejelentkezés 12 óráig érvényes.

Kód: `src/app/admin/`, megjelenés: `src/admin.css`.

## Élesítés

**A) Egy domainen a Laravellel (ajánlott, átlagos PHP tárhelyre):**

```bash
npm run build:backend
```

Lebuildeli és előrendereli az oldalt, majd átmásolja a mellette lévő `mate_back` (vagy `backend`) mappába:
a statikus fájlokat (js, css, képek, sitemap) a `public`-ba, az oldalak HTML-jét a `resources/frontend`-be.
Más helyen lévő backendhez: `BACKEND_DIR=/ut/a/mate_back npm run build:backend`. Utána csak a backendet kell feltölteni.

**B) Külön domainen a backendtől:** a `src/environments/environment.ts`-ben az `apiUrl`-be írd a backend címét,
majd `npm run build`, és a `dist/frontend/browser` mappát töltsd fel. Ilyenkor a perjeles címeket és a 404-et
a webszervernek kell kezelnie, ezért az A) változatot javasoljuk.

## Arculat

**Ivory + Forest Green, sárgaréz arany részletekkel.** Világos elefántcsont háttér, mélyzöld gombok és kiemelések, apró arany részletek.

| Szín | Kód | Mire |
|---|---|---|
| Elefántcsont | `#F7F5EF` | háttér |
| Fehér | `#FFFFFF` | kártyák, űrlap |
| Mélyzöld | `#245B48` | gombok, kiemelt szavak, logó |
| Sötétzöld-szürke | `#202A26` | fő szöveg |
| Zsályaszürke | `#5E6B64` | másodlagos szöveg |
| Halvány zsálya | `#A7B9AD` | csak díszítés (szövegnek túl világos) |
| Sárgaréz arany | `#C29B4A` | kitöltések: címke, jelek, pontok |
| Óarany | `#8C6420` | ha az arany maga a szöveg |

- A színek a `src/styles.css` elején vannak, egy helyen.
- Megosztási kép (Facebook, Messenger): `public/og-image.png`.
- Ikonok: `src/app/components/icon.ts` (saját vonalas ikonok, zöld körvonal arany részlettel).

## Effektek

- **Nyitóképernyő**: balra a régi oldal szövegei (SEO), jobbra a csapat fotója két kis kártyával
  („Két szakfordító minden fordításon”, „Akár aznapra kész”). Az egérre semmi nem reagál.
  A fotó: `public/images/done-translations-csapat.{jpg,webp}` (+ `-640.webp` mobilra). Ha lesz saját fotó,
  ezeket a fájlokat kell lecserélni (fekvő, kb. 3:2, legalább 1000 px széles); a kártyák szövege a `src/app/content/ui.ts` `hero` részében van.
- Nincs rögzített vagy a görgetéshez kötött effekt: a kártyák egyszer, finoman beúsznak, a számlálók felpörögnek,
  a nyelvi szalag lassan, magától úszik. (GSAP nélkül, saját ~40 sor kóddal.)

A főoldal szakaszai: nyitóképernyő → nyelvi szalag → szolgáltatások → szakterületek (nyelvszámmal) → lépések →
rólunk + számok → miért mi → árak + gyakori kérdések → ajánlatkérő űrlap → záró felhívás.
A kiegészítő szakaszok szövege a `src/app/content/ui.ts` `HOME_EXTRA` részében van; csak a régi oldalon is szereplő tényeket használ.

Ha a látogató csökkentett mozgást kért, a beúsztatások elmaradnak.

## További tippek több ügyfélhez

- **Google Cégprofil** (Google Maps) létrehozása, és vélemény kérése minden elégedett ügyféltől
- Az oldal beküldése a Google Search Console-ba
- Külön aloldalak a legkeresettebb témákra (pl. „bizonyítvány fordítás angolra”)
