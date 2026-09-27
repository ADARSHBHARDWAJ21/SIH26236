# PackZen AI (SIH26236)

AI-powered food packaging decision-support & shelf-life optimization platform for product, storage, and transport requirements. Recommends Pareto-optimal packaging materials based on food chemistry, barrier kinetics, cold-chain logistics, and circularity economics.

The app ranks packaging materials by protection, shelf-life, cost, and sustainability. It also provides risk explanations, produce respiration guidance, comparisons, cost estimates, shelf-life simulations, and PDF reports.

## Technology

- Frontend: React, TypeScript, Vite, Tailwind CSS, and Recharts
- Backend: FastAPI, SQLAlchemy, and Pydantic
- Recommendation engine: Python rules, material scoring, and a local scikit-learn model
- Local database: SQLite at `backend/packsmart.db`
- PDF generation: ReportLab

## Run locally

Requirements: Python 3.10 or later, Node.js 18 or later, and npm.

### Backend

```bash
cd backend
python -m venv .venv
# Activate the virtual environment, then:
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8100
```

The API documentation is at `http://127.0.0.1:8100/docs`.

### Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The app is at `http://127.0.0.1:5173`. The frontend API address is configured in `frontend/.env` with `VITE_API_URL`.

## Demo sign-in

- Email: `researcher@packsmart.ai`
- Password: `packsmart2026`

## Main API routes

- `POST /api/analyses` — create a recommendation
- `GET /api/analyses/{id}` — retrieve a saved analysis
- `GET /api/commodities` and `GET /api/materials` — retrieve reference data
- `POST /api/compare` — compare materials
- `POST /api/cost-estimate` — estimate packaging costs
- `POST /api/shelf-life-simulation` — simulate shelf life
- `GET /api/report/{id}` — download a report
>>>>>>> 79aaea8 (feat: PackZen AI food packaging decision-support platform (SIH26236))
