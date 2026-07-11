# Portfolio personale — React + Tailwind + Admin Panel nascosto

Sito portfolio dark, in stile "Apple glassmorphism", con un pannello di amministrazione
nascosto per gestire tutti i contenuti dal browser, senza toccare il codice.

## Avvio rapido

```bash
npm install
npm run dev
```

Apri l'indirizzo mostrato in terminale (di solito `http://localhost:5173`).

Per generare la versione di produzione:

```bash
npm run build
npm run preview
```

## Struttura del progetto

```
src/
  config/siteConfig.js       ← nome, bio, social, password admin, categorie
  data/seedContent.js        ← contenuti di esempio mostrati al primo avvio
  context/ContentContext.jsx ← stato dei contenuti + salvataggio in localStorage
  context/AuthContext.jsx    ← autenticazione dell'area admin
  components/
    Header.jsx, Footer.jsx
    Home.jsx, ContentCard.jsx, ContentDetail.jsx
    AdminLogin.jsx, AdminDashboard.jsx, ContentForm.jsx
  App.jsx                    ← routing
```

## Personalizzazione (senza toccare il resto del codice)

Apri **`src/config/siteConfig.js`** e modifica:

- `SITE_CONFIG.name` → il tuo nome, mostrato in alto a sinistra nell'header
- `SITE_CONFIG.role`, `tagline`, `bio` → testo dell'introduzione in home
- `SITE_CONFIG.social` → link a GitHub, LinkedIn, email
- `ADMIN_PASSWORD` → **cambia questa password prima di pubblicare il sito**
- `CATEGORIES` → le categorie disponibili nel form dell'admin panel

I contenuti di esempio in `src/data/seedContent.js` vengono usati solo al primissimo
avvio: appena salvi qualcosa dal pannello admin, i tuoi dati (salvati nel browser
tramite `localStorage`) prendono il sopravvento.

## Come accedere al pannello admin

Ci sono due modi, entrambi discreti (nessun link visibile nel sito):

1. Vai direttamente all'indirizzo `/admin` (es. `http://localhost:5173/admin`)
2. Doppio click sul piccolo punto `·` accanto al copyright, in fondo alla pagina

Inserisci la password impostata in `ADMIN_PASSWORD` (di default `Admin2026!`).
La sessione resta attiva finché non premi "Esci" o chiudi il browser.

## Come funziona la gestione dei contenuti

- Ogni contenuto ha: titolo, categoria, descrizione, un blocco di codice opzionale
  (con evidenziazione della sintassi) e un'immagine (URL).
- Dal pannello puoi creare, modificare ed eliminare contenuti: le modifiche sono
  salvate istantaneamente e visibili subito in home e nella pagina di dettaglio.
- I dati sono persistiti nel `localStorage` del browser (chiave `portfolio_content_v1`).
  Per un sito con più editor o accesso da più dispositivi, questa struttura si può
  sostituire in un secondo momento con un vero backend (es. Supabase, Firebase,
  o una piccola API) senza cambiare i componenti dell'interfaccia: basta adattare
  `ContentContext.jsx`.

## Note tecniche

- **Routing**: React Router. `/admin` non è mai linkata nell'interfaccia pubblica.
- **Editor codice**: `react-syntax-highlighter` (tema scuro coerente col design).
- **Icone**: `lucide-react`.
- **Stile**: Tailwind CSS con classi glass riutilizzabili definite in `src/index.css`
  (`.glass`, `.glass-strong`).

## Deploy

Il progetto è una semplice app Vite/React: puoi pubblicarla gratuitamente su
Vercel, Netlify o Cloudflare Pages collegando la cartella del progetto (comando
di build: `npm run build`, cartella di output: `dist`).

Se pubblichi su un hosting statico che non gestisce automaticamente le rotte
client-side, ricordati di configurare il redirect di tutte le rotte verso
`index.html` (necessario perché `/admin` e `/content/:id` sono gestite da
React Router).
