# Apex Tech — Deployment Guide (Milestone 6)

## Architecture

| Layer | Hosting | Why |
|---|---|---|
| Frontend (React/Vite) | GitHub Pages | Required by the project brief; static build output |
| Backend (Node/Express) | Render (free tier) | GitHub Pages cannot run a Node server |
| Database (MySQL) | Railway / Aiven / Render MySQL | Managed instance; local MySQL is not reachable from the internet |

**Key point for the presentation:** the brief specifies GitHub Pages for the
frontend *and* "appropriate hosting solutions for backend services." These are
two separate deploys. GitHub Pages serves static files only — it cannot run
Express or connect to MySQL.

---

## Blocker 1 — Filename casing (fix before any deploy)

`src/context/WIshlistContext.jsx` has a capital `I`, but all five importing
files reference `WishlistContext`. Windows resolves this; Linux build runners
do not. The build fails with:

```
Could not resolve "./context/WishlistContext" from "src/App.jsx"
```

Fix (two steps — Windows ignores a single-step rename):

```bash
cd apex-tech-client/src/context
git mv WIshlistContext.jsx WishlistContext-tmp.jsx
git mv WishlistContext-tmp.jsx WishlistContext.jsx
git commit -m "fix: correct WishlistContext filename casing"
```

Verify before pushing:
```bash
git ls-files apex-tech-client/src/context
# must print WishlistContext.jsx, not WIshlistContext.jsx
```

---

## Blocker 2 — GitHub Pages serves from a subpath

A project site lives at `https://<user>.github.io/<repo>/`, not the domain
root. Vite currently has no `base`, so the built HTML requests `/assets/...`
and gets 404s — you get a blank white page.

In `apex-tech-client/vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Must match the repository name exactly, with leading and trailing slash.
  base: '/apex-tech-Ecom/',
})
```

---

## Blocker 3 — BrowserRouter 404s on refresh

`App.jsx` uses `BrowserRouter`. On GitHub Pages, loading `/shop` directly (or
refreshing on it) returns a 404, because Pages looks for a real `shop` file.
Only the home route works. A marker refreshing on any page mid-demo sees a 404.

Two options:

**Option A — HashRouter (safest for a graded demo).** URLs become
`/#/shop`. Slightly uglier, but it cannot break. One-line change in `App.jsx`:

```js
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
```

**Option B — 404.html fallback.** Keep clean URLs by copying `index.html` to
`404.html` in the build output so Pages serves the app for unknown paths. Add
to `apex-tech-client/package.json` scripts:

```json
"build": "vite build && cp dist/index.html dist/404.html"
```

Recommendation: use Option A for the recorded demo. Fewer moving parts.

---

## Blocker 4 — `sequelize.sync({ alter: true })` in production

`index.js` runs `alter: true` on every boot. On a hosted database this lets the
app mutate live schema on startup — it can silently drop or rewrite columns.
Gate it to development:

```js
await sequelize.sync(
  process.env.NODE_ENV === 'production' ? {} : { alter: true }
);
```

Run `npm run seed` once manually against the hosted DB instead.

---

## Step 1 — Deploy the database

1. Create a MySQL instance (Railway, Aiven, or Render).
2. Copy the connection details: host, port, user, password, database name.
3. Note: these providers usually give a non-3306 port. `config/db.js`
   currently has no `port` option, so add one:

```js
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  }
);
```

---

## Step 2 — Deploy the backend (Render)

1. New → Web Service → connect the GitHub repo.
2. Root Directory: `apex-tech-backend`
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Environment variables:

```
PORT=3000
DB_HOST=<hosted mysql host>
DB_PORT=<hosted mysql port>
DB_USER=<user>
DB_PASS=<password>
DB_NAME=<database>
JWT_SECRET=<long random string — NOT the one from the old committed .env>
JWT_EXPIRES_IN=1h
CLIENT_ORIGIN=https://<user>.github.io
NODE_ENV=production
```

`CLIENT_ORIGIN` must be the GitHub Pages **origin only** — scheme and host, no
path. `https://user.github.io/apex-tech-Ecom/` will not match and every request
will be blocked by CORS.

6. Seed once from the Render shell: `npm run seed`
7. Verify: `https://<your-service>.onrender.com/` returns "Apex Tech API running..."

**Free-tier note:** Render spins services down after inactivity; the first
request can take ~50 seconds. Load the API URL in a browser tab a minute
before you start recording.

---

## Step 3 — Deploy the frontend (GitHub Pages)

Set the production API URL. Create `apex-tech-client/.env.production`:

```
VITE_API_URL=https://<your-service>.onrender.com/api
```

This file is safe to commit — Vite variables are baked into the public bundle
regardless, so never put secrets in any `VITE_` variable.

Then deploy via GitHub Actions (`.github/workflows/deploy.yml` in the repo root).

---

## Step 4 — Live availability checks

Run these before recording and note the results:

| Check | Command / action | Expected |
|---|---|---|
| API root | open `https://<service>.onrender.com/` | "Apex Tech API running..." |
| Products endpoint | `curl https://<service>.onrender.com/api/products` | JSON with `success: true` |
| Frontend loads | open the Pages URL | Homepage renders, no blank page |
| Assets resolve | DevTools → Network | No 404s on `/assets/*.js` |
| CORS | browse to Shop on the live site | Products load, no CORS error in console |
| Auth round trip | register → log in on live site | Token stored, navbar shows logged in |
| Deep link | open `<pages-url>/#/shop` directly | Shop page renders |
| Protected route | add to cart while logged in | Item persists after refresh |

---

## Version control evidence (graded criterion)

Have these ready to show:
- Commit history with meaningful messages
- Branch structure and merge commits
- The `milestone3-submission` / `milestone4-submission` tags
- At least one pull request showing code review between team members
