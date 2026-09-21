# Apex Tech — 10-Minute Video Presentation Plan

This is a **structure and prompt sheet**, not a script to read aloud. Markers
can tell when a team is reading, and the rubric rewards demonstrated
understanding. Use these as talking points and say them in your own words.

Each section lists what to cover and which rubric criterion it serves.

---

## Timing at a glance

| # | Section | Time | Owner |
|---|---|---|---|
| 1 | Intro & problem | 0:45 | |
| 2 | Architecture | 1:30 | |
| 3 | Live demo | 3:30 | |
| 4 | Backend & API walkthrough | 1:30 | |
| 5 | Security | 1:00 | |
| 6 | Testing | 1:00 | |
| 7 | DevOps & version control | 0:45 | |
| 8 | Challenges & close | 0:30 | |

Total ≈ 10:00. Assign an owner per section — the brief marks this as group
work, and markers notice when one person carries the whole video.

---

## 1. Introduction & problem (0:45)

- Team names, project name, module.
- What Apex Tech is: a full-stack e-commerce platform for PC hardware
  (monitors, laptops, GPUs, pre-built PCs, accessories).
- The scope in one sentence: browse → filter → cart → authenticated checkout,
  with persistent data.

## 2. Architecture (1:30) — *Software Architecture & Design Patterns*

Have a diagram on screen. Cover:

- **Three-tier split:** React/Vite frontend → Express REST API → MySQL via Sequelize.
- **MVC mapping** (the brief asks for this explicitly):
  - Models → `models/*.js` (Sequelize definitions + associations)
  - Controllers → `controllers/*.js`
  - Views → the React client
- **Repository pattern:** `repositories/*.js` sits between controllers and
  models, so controllers never touch Sequelize directly. Be ready to say *why*:
  it isolates data access, so swapping or changing the ORM touches one layer.
- **Why MySQL over MongoDB:** the data is relational — users have carts, carts
  have items, items reference products. Foreign keys and joins fit naturally.

**Likely question:** "Why a repository layer on top of an ORM that's already an
abstraction?" Honest answer: it keeps controllers testable and free of query
syntax. Don't oversell it.

## 3. Live demo (3:30) — *the largest single block, rehearse it*

Demo against the **deployed** site, not localhost. That is the "Live System
Availability" criterion being marked.

Flow:
1. Homepage — category tiles, Flash Deals section.
2. Click "FLASH DEALS" → dedicated page, point out the `-X%` badges computed
   from `price` vs `compareAtPrice`.
3. Shop page — filter by Laptops (proves the category query works), then use
   the search bar. Mention filter state lives in the **URL**, so results are
   shareable and the back button works.
4. Click a product card → detail page. Show the thumbnail gallery swapping the
   hero image, the spec matrix, related products.
5. Add to cart while logged out → show the "please log in" message. This
   demonstrates route protection, not a bug.
6. Register / log in.
7. Add to cart → cart badge updates → open cart → checkout → order created.
8. Go to My Orders → the order is there. **Refresh the page** — still logged
   in, cart intact. That single refresh proves JWT persistence and DB
   persistence in one move.
9. Resize to mobile width (or show it on a phone) for the responsive criterion.

**Rehearse this end to end at least twice.** Wake the backend ~1 minute before
recording if you're on Render's free tier.

## 4. Backend & API walkthrough (1:30) — *API usage, Data Handling*

- REST conventions: `GET /api/products`, `GET /api/products/:id`,
  `POST /api/cart/items`, `DELETE /api/cart/:cartId/items/:productId`.
- Consistent response envelope: every endpoint returns
  `{ success, data, message, errors }` via `utils/responseFormatter.js`, so the
  frontend has one shape to handle.
- Schema: `User → Cart → CartItem → Product`, `User → Order → OrderItem`.
  Explain why `OrderItem` stores `productName` and `priceAtPurchase` as a
  **snapshot** — if a product's price changes later, historical orders must not
  silently change. That's a genuinely good design decision; make sure you can
  explain it.

## 5. Security (1:00) — *Security Integration*

- Passwords hashed with bcrypt (salted, never stored plaintext).
- JWT issued on login, sent as `Authorization: Bearer <token>`.
- `middleware/authMiddleware.js` — `protect` guards cart/order/wishlist routes,
  `adminOnly` guards product creation.
- Centralised Axios interceptor attaches the token to every request; a 401
  response clears the session so the UI can't sit in a stale logged-in state.
- CORS restricted to a configured origin list, not `*`.
- Secrets in environment variables, `.env` gitignored.

**Be ready for:** "What would you improve?" Good honest answers: refresh
tokens (1-hour expiry with no refresh is a UX weakness), rate limiting on
login, and server-side price validation at checkout — the current
`POST /api/orders` trusts client-supplied totals.

## 6. Testing (1:00) — *TDD, Automated Test Implementation*

Read `docs/TESTING-STATUS.md` before recording — it has the verified numbers.

- Unit tests: 11 passing across product and user controllers, using Vitest
  with mocked repositories. Show `npm test` running green.
- Integration tests: real HTTP calls against a running API, covering the
  register -> login -> add to cart -> order flow.
- Postman collection: 7 requests covering the same path manually.
- CI: GitHub Actions spins up MySQL, seeds it, starts the API, and runs both
  suites on every push.

**Be honest about coverage.** Overall line coverage is ~22%. If you claim
"100%" because the models folder shows 100%, and the marker opens the report,
that costs you more than the honest number would. The defensible framing is:
unit tests target controller logic, integration tests cover the end-to-end
flows, and you know the gaps — auth middleware and three repositories are
currently untested, and that's the next priority.

## 7. DevOps & version control (0:45) — *Version Control*

- Branching model: feature branches → `main`, with PRs for code review.
- Show the commit history and the milestone tags.
- The GitHub Actions workflow: push to `main` → build → deploy to Pages.
- Backend on Render, database on a managed MySQL host.

## 8. Challenges & close (0:30)

Pick one or two *real* problems and what you learned. Real examples from this
project:

- Two team members independently built conflicting backends against different
  schemas — resolved by agreeing on one schema and consolidating. Lesson:
  agree on the data contract before writing code.
- A filename casing bug (`WIshlistContext.jsx`) that worked on Windows and
  broke the Linux CI build. Lesson: development and production environments
  differ in ways that are invisible locally.

Markers respond well to genuine problem-solving stories. Avoid "our challenge
was time management."

---

## Recording checklist

- [ ] Casing fix pushed and Actions build green
- [ ] Live site loads; no console errors
- [ ] Backend awake (free tier)
- [ ] Test DB seeded with products in **every** category
- [ ] A clean demo account ready (don't register live unless you're showing it)
- [ ] Browser zoom ~110%, bookmarks bar hidden, notifications off
- [ ] Audio tested — bad audio costs marks on an otherwise strong demo
- [ ] Full run-through under 10:00 with time to spare
