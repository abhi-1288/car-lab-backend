# CarLab Backend

JSON-first backend for CarLab. Canonical vehicle data lives in `src/CarLab-Data/`.

## Setup

```bash
npm install
npm run build
npm start
```

## Scripts

- `npm run dev` - start dev server
- `npm run typecheck` - TypeScript check
- `npm run lint` - lint
- `npm run test` - tests
- `npm run build` - production build
- `npm run data:validate` - validate canonical JSON
- `npm run data:build` - rebuild consolidated database
- `npm run data:integrity` - integrity report
- `npm run data:import` - import validation
- `npm run qa:release` - full quality gate

## Updating data

Edit any file in `src/CarLab-Data/` (except `complete-car-database.json`). The backend detects changes automatically via mtime. To regenerate the consolidated file manually run `npm run data:build` or call `POST /api/v1/admin/data/rebuild` with admin token.

## Environment

See `docs/backend/environment-setup.md`.
EOF