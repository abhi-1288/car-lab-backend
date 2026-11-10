# CarLab Backend Architecture

JSON-first architecture. Canonical vehicle data lives in `src/CarLab-Data/` as seven JSON files. Backend loads, validates, caches and exposes via `/api/v1`. Customer data stored separately (file-backed by default, PostgreSQL optional).
EOF