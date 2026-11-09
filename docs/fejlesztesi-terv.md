# DONE Translations – prémium továbbfejlesztés: elemzés és terv

## 1. Kiinduló állapot (elemzés)

**Frontend** (`mate_front`, Angular 21, standalone + signals, zoneless, statikus előrenderelés / SSR)
- Útvonalak a `content/paths.json`-ból, magyarul és angolul (régi WordPress címek, záró perjellel). Admin: `/admin`, csak böngészőben fut.
- Tartalom: `content/pages.hu.ts` (a régi oldal szövegei szó szerint – SEO, **nem módosítható**), `pages.en.ts`, `ui.ts` (felület, kiegészítő szakaszok).
- Oldalak: `pages/home` (főoldal), `pages/content-page` (minden aloldal blokkokból), köszönő oldal, 404.
- Komponensek: `components/header`, `footer`, `quote-section` + `quote-form` (3 mód: standard, tolmácsolás, helyesírás), `icon`, `hero/hero`.
- Animáció: `home.ts` – IntersectionObserver beúszás + számláló; CSS szalag. (GSAP, three.js már kikerült.)
- SEO: `services/site.service.ts` oldalanként egyedi title/description, canonical, hreflang (hu/en/x-default), og:*; `index.html` Organization + WebSite JSON-LD; sitemap generálás buildkor.
- Arculat (`styles.css`): elefántcsont `--bg #f7f5ef`, mélyzöld `--accent #245b48`, arany `--warm #c29b4a`, Inter Tight + Inter, 20 px-es lekerekítés.

**Backend** (`mate_back`, Laravel 13, Sanctum)
- `POST /api/quote-requests` (rate limit 5/perc, 30/nap; honeypot; reCAPTCHA v3; egy fájl, 8 MB), két levél (`QuoteMailer`), állapotuk mentve.
- Admin API: lista/szűrés/export (xlsx), statisztika, ár, utánkövetés, előzmények (`quote_request_events`), levél újraküldés, felhasználók, jelszócsere.
- `FrontendController` szolgálja ki az előrenderelt HTML-t (trailing-slash 301, régi sitemapok, valódi 404).
- 43 PHPUnit teszt.

**Talált hibák / hiányok**
| # | Probléma | Hol | Javítás (fázis) |
|---|---|---|---|
| 1 | `quote_requests.created_at` és `email` nincs indexelve, pedig a lista, a statisztika és az ügyféladatlap ezekre szűr/rendez | migráció | új, visszafordítható index-migráció (5) |
| 2 | Ajánlatkérésenként csak 1 fájl tölthető fel | `StoreQuoteRequest`, űrlap | több fájl, külön táblában; a régi oszlop olvasható marad (4) |
| 3 | A JSON-LD csak magyar, az angol oldalakon is | `index.html` | nyelvenkénti + oldalankénti (BreadcrumbList, Service) strukturált adat (6) |
| 4 | Google Fonts render-blokkoló CSS | `index.html` | nem blokkoló betöltés (6) |
| 5 | Egyfajta kártya ismétlődik a szekciókban (szolgáltatás, miért mi, lépések) | `home.html`, `styles.css` | egyedi kompozíciók (3) |
| 6 | Nincs valós idejű jelzés az adminban új ajánlatkérésről | admin | szavazás (polling) + fül-jelvény + asztali értesítés (5) |

## 2. Döntések a korábbi visszajelzések alapján

- **Egérkövető effektek nincsenek** (mágneses gomb, döntött kártya, kurzor): a megrendelő korábban kifejezetten kérte a kivételüket. Helyettük: CSS-alapú hover (nyíl, ikon, árnyék), gördítéshez kötött **finom** parallax.
- **Nincs scroll hijacking és vízszintes görgetés-elfogás** (az előző „élő fordítás” és vízszintes lépések nem tetszettek). A „sticky storytelling” natív `position: sticky`-vel készül, a görgetést nem veszi át.
- **Nincs kitalált tartalom**: vélemény, referencia, partnerlogó csak az adminból feltöltve jelenik meg; amíg nincs, a szekció nem látszik.
- A régi oldal szövegei (299 db) szó szerint maradnak – minden fázis után ellenőrizve (`compare.py`).

## 3. Fázisok, fájlokra bontva

### 2. fázis – Hero, navigáció
- `hero/hero.html|ts`, `styles.css`: többsoros, karakteres cím (súlykontraszt, arany aláhúzás-rajzolás), rétegzett fotókompozíció (arany keret-réteg, papírtextúra, maszk), clip-path belépő animáció, lebegő infócímkék (2 szakfordító, akár aznapra, 86 nyelv), gördítéses parallax a fotón, CTA nyíl-interakció.
- `components/header.ts`: gördítési folyamatjelző (vékony arany sáv), összehúzódó fejléc, teljes képernyős mobilmenü lépcsőzetes megjelenéssel.
- Új, újrahasznosítható: `components/reveal.directive.ts` (IntersectionObserver, stagger, clip-path, csökkentett mozgás) – a `home.ts` saját megoldása ebbe költözik.

### 3. fázis – Szolgáltatások, Nyelvek világa, gördítési élmény
- `home.html`: szolgáltatások bento-elrendezésben (a Fordítás kiemelt, a többi eltérő méret/viselkedés), rajzolódó ikonok, kör-nyíl.
- Új: `components/language-world.ts`: saját, könnyű SVG pont-világtérkép (előre generált, ~kis méretű adat, nincs könyvtár), régiók kiemelése, Magyarországról induló animált ívek, hover/fókusz/érintés: régió nyelvei; a 86 nyelv a Nyelvek oldal valódi listájából.
- Lépések: sticky storytelling (bal oldalon rögzülő cím és folyamatjelző, jobbra a lépések).

### 4. fázis – Bizalomépítés, ajánlatkérő
- Backend: `testimonials` és `partners` tábla + modell + admin CRUD + nyilvános `GET /api/trust` (csak publikált); logófeltöltés.
- Frontend: `components/trust-section.ts` – minőségbiztosítás (valódi szöveg: két szakfordító, anyanyelvi lektor), tapasztalat (2018 óta), vélemények/partnerek, ha vannak.
- Ajánlatkérő (`quote-form`): többlépéses (szolgáltatás → részletek → elérhetőség → összefoglaló), folyamatjelző, dinamikus kérdések, drag & drop több fájl (előnézet, típus, méret), érthető hibák, prémium köszönő képernyő. Backend validáció és reCAPTCHA marad; `documents[]` + a régi `document` mező is elfogadott.

### 5. fázis – Admin / CRM
- Valós idejű jelzés (polling 60 mp, fül-cím számláló, opcionális asztali értesítés).
- Ügyféladatlap: e-mail szerint összes korábbi ajánlatkérés, összérték.
- Feladatok és határidők (`tasks` tábla), kommunikációs napló (hívás/e-mail bejegyzés az előzményekben).
- Statisztika: heti/havi nézet, bevételi grafikon, konverzió szolgáltatásonként, átlagos válaszidő.
- Indexek (created_at, email).

### 6. fázis – SEO, teljesítmény, teljes teszt
- Oldalankénti JSON-LD (BreadcrumbList, Service, LocalBusiness), angol Organization.
- Nem blokkoló betűtípus, képek lazy loading + méretek, Search Console ellenőrző meta (konfigból), analitika csak hozzájárulással (javaslat).
- Teszt: build, 299 szöveg, routing, mobil (iPhone/Android/tablet/laptop/4K képernyőkép), űrlapok E2E, PHPUnit.
