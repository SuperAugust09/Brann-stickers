# 🔴 Brann Ultras Stickers – Nettside

Enkel nettbutikk for SK Brann Ultras-stickers. Bygget med vanilla HTML/CSS/JS og Netlify Functions for Stripe-betaling.

## Filstruktur

```
brann-stickers/
├── index.html          ← Forside
├── produkter.html      ← Produktoversikt
├── produkt.html        ← Enkeltprodukt med antallsvalg
├── suksess.html        ← Takk-side etter betaling
├── style.css           ← All styling (rød/hvitt Brann-tema)
├── products.js         ← Produktdata – REDIGER HER
├── netlify.toml        ← Netlify-konfig
├── package.json        ← Stripe-avhengighet
└── functions/
    └── create-checkout.js  ← Netlify Function for Stripe
```

---

## 🚀 Deploy til Netlify

### Steg 1 – Last opp til GitHub
1. Opprett et nytt GitHub-repo (f.eks. `brann-stickers`)
2. Last opp alle filene i denne mappen
3. Push til `main`-branch

### Steg 2 – Koble til Netlify
1. Gå til [netlify.com](https://netlify.com) og logg inn
2. Trykk **"Add new site" → "Import an existing project"**
3. Velg GitHub og velg repoet ditt
4. Build settings kan stå tomme (ingen byggsteg)
5. Trykk **"Deploy site"**

### Steg 3 – Sett opp Stripe
1. Opprett konto på [stripe.com](https://stripe.com)
2. Gå til **Developers → API keys**
3. Kopier **Secret key** (starter med `sk_live_...` eller `sk_test_...` for testing)
4. I Netlify: gå til **Site settings → Environment variables**
5. Legg til:
   - Key: `STRIPE_SECRET_KEY`
   - Value: din Stripe secret key
6. Redeploy siden (Deploys → Trigger deploy)

### Steg 4 – Test betalingen
- Bruk Stripe test-nøkkel (`sk_test_...`) og testkort `4242 4242 4242 4242`
- Når alt fungerer, bytt til live-nøkkel

---

## ✏️ Endre produkter

Åpne `products.js` og rediger `PRODUCTS`-arrayet:

```js
{
  id: 'mitt-produkt',        // Unik ID (ingen mellomrom)
  name: 'Produktnavn',
  tagline: 'Kort beskrivelse',
  description: 'Lang beskrivelse på produktsiden',
  cat: 'klassisk',           // klassisk | ultras | kamp
  emoji: '🛡️',               // Vises som produktbilde (bytt ut med ekte bilde later)
  prices: {
    50: 249,                 // Pris i NOK for 50 stk
    100: 399,
    200: 649,
  },
},
```

## 🖼️ Legge til ekte produktbilder

I `produkt.html`, finn `.product-detail-img`-div og bytt ut emoji med en `<img>`-tag:
```html
<img src="bilder/mitt-produkt.png" alt="Produktnavn sticker">
```

---

## 📧 Kontaktepost

Søk og erstatt `hei@brannultras.no` i alle HTML-filer med din faktiske e-postadresse.
