# Testing Status — Verified Against the Merged Codebase

All figures below come from actually running the suite on the merged repo,
not from the pre-generated `coverage/` HTML in the QA hand-off.

## What runs today

```bash
cd apex-tech-backend
npm install
npm test              # unit tests only - no server or DB needed
npm run test:coverage # same, plus coverage report
```

Result: **11 tests passing, 2 files** (`tests/unit/userController.test.js`,
`tests/unit/productController.test.js`).

## Coverage — read this before quoting a number on camera

**Overall line coverage: 21.66%** (branch 39.13%, function 12.5%).

The per-folder picture is uneven, and a marker looking at the report will see
this immediately:

| Area | Line coverage | Note |
|---|---|---|
| `models/` | 100% | Misleading — these are Sequelize schema declarations. Importing the file executes every line. It is not behavioural testing. |
| `utils/responseFormatter.js` | 100% | Genuinely covered |
| `controllers/` | partial | Only `productController` and `userController` have unit tests |
| `repositories/` | 17.8% | `cart`, `order`, `wishlist` repositories at 0% |
| `routes/` | 0% | Not exercised by unit tests |
| `middleware/` | 0% | Auth middleware untested — worth noting, it's security code |

Do not present "100% on models" as a headline. If asked about coverage, the
straight answer is: unit coverage is roughly 22% overall, concentrated on the
product and user controllers, with integration coverage handled separately
through the API tests and Postman collection.

## Integration and API tests — do not run in CI as-is

`tests/api.test.js`, `tests/integration/cart.test.js`, and
`tests/integration/orders.test.js` all hardcode `http://localhost:3000/api`
and call it over real HTTP with axios. They need a running server **and** a
seeded MySQL database.

Verified: running `npm run test:integration` with no server gives
**17 failed / 2 passed**, all failures `ECONNREFUSED 127.0.0.1:3000`. This is
expected behaviour, not a broken test suite — but it means the command fails
on any machine where the server isn't already up.

To run them properly:

```bash
# terminal 1
cd apex-tech-backend && npm run seed && npm run dev
# terminal 2
cd apex-tech-backend && npm run test:integration
npm run test:api
```

The corrected CI workflow (`.github/workflows/test.yml`) handles this by
starting MySQL as a service, seeding, launching the server, and polling until
it responds before running these.

## Known issues in the handed-over tests

These do not break anything today, but you should know about them before a
marker asks:

1. **`productController.test.js` imports `Category`** from `models/index.js`.
   No such model exists. It only survives because `vi.mock()` auto-mocks the
   whole module, so the missing export becomes an undefined mock rather than
   an error.

2. **The `createProduct` tests encode outdated behaviour.** They pass a body
   with `categoryId` and no `image`, and expect a 201. The current
   `createProduct` has no input validation, so this passes. If you restore the
   validation (requiring `name`, `category`, `price`, `image` — recommended,
   and it was present in an earlier version of this controller), these two
   tests will start failing and need updating. That is a real gap: there is no
   test asserting that invalid product input is rejected.

3. **Test fixtures use categories that don't exist.** `'Electronics'` and
   numeric `categoryId` appear in fixtures, but the real `Product.category` is
   an enum of `monitors | laptops | gpu | pcs | accessories`. Because the model
   is mocked, nothing catches the mismatch — the tests pass without validating
   real behaviour.

4. **`orders.test.js` calls `GET /orders`**, but the implemented route is
   `GET /orders/mine`. The test is written to accept a 404 ("or return 404 if
   endpoint not implemented"), so it passes either way. A test that passes
   whether or not the feature works isn't testing much.

5. **Two overlapping Postman collections** were handed over:
   `ApexTech API Integration Tests.postman_collection.json` (7 requests,
   includes Create Product and Remove from Cart) and
   `apextech.postman_collection.json` (5 requests, a subset). Both are valid
   JSON. Pick the 7-request one as the canonical collection and delete the
   other, or a marker will ask which is current. Neither covers wishlist or
   order endpoints.

## Recommended before submission, in priority order

1. Add a test for `authMiddleware` — it's the security boundary and is at 0%.
2. Add a test asserting invalid product input is rejected (restore validation
   first).
3. Add unit tests for `cartRepository` and `orderRepository` (both 0%).
4. Extend the Postman collection to cover `/api/orders` and `/api/wishlist`.

Items 1 and 2 are the highest value for the Testing rubric — they show you
tested the *risky* paths, not just the easy ones.
