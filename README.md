# NaviGoo — Your Journey. Our Support.

A full-stack web app built from the NaviGoo app design: Self-Drive Rentals & Cars With Driver, Roadside Assistance, Route-Based Delivery, and SOS Emergency — with a real backend and database.

## Stack
- **Backend:** Node.js, Express, and a JSON-file database (`backend/navigoo-data.json`, created automatically). No native compilation, no Python/build tools needed — just `npm install` and it works on any machine.
- **Frontend:** React 18, Vite, React Router, Tailwind CSS.

## Project structure
```
navigoo/
  backend/          Express API + JSON-file database
    server.js        entry point
    db.js             data store (loads/saves navigoo-data.json, auto-seeded on first run)
    routes/           REST endpoints per module
  frontend/          React app
    src/pages/         one folder per module
    src/components/    shared UI (nav, cards, buttons, stepper)
    src/api.js          fetch wrapper for the backend
```

## Running it locally

You need [Node.js](https://nodejs.org) 18+ installed. Then, in two terminals:

**Terminal 1 — backend (runs on port 4000):**
```bash
cd backend
npm install
npm start
```
On first run this creates `navigoo-data.json` and seeds it with sample cars, mechanics, delivery items, and ambulances.

**Terminal 2 — frontend (runs on port 5173):**
```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** — the frontend is already configured to proxy `/api` requests to the backend, so no extra config is needed.

## What's implemented

| Module | Flow |
|---|---|
| **Self-Drive Rentals** | Browse/filter/search cars → car details → book → live tracking |
| **Cars With Driver** | Pick route, vehicle type, trip type → confirm → live tracking, cancel |
| **Roadside Assistance** | Vehicle type → problem type → auto-match mechanic → mechanic profile → confirm → tracking → job complete |
| **Route-Based Delivery** | Browse local items along your route → cart → live status stepper (Order Received → Packing → On the Way → Delivered) → rate partner |
| **SOS Emergency** | Big SOS button → emergency type → auto-dispatch nearest ambulance → multi-stage tracking through to hospital arrival |
| **My Services** | Unified list of every booking across all 4 modules, with live status |

All bookings are stored in `backend/navigoo-data.json`, so anything you book actually persists — refresh the page and it's still there, even after restarting the backend.

## Extending it
- **Real maps:** swap the "🗺️ Live map preview" placeholders in tracking screens for Google Maps / Mapbox, using the lat/lng you'd add to each booking.
- **Auth:** the schema has no users table yet — add one and wire up login before deploying for real users.
- **Payments:** the "Continue to Pay" / advance-payment steps are currently no-ops — plug in Razorpay/Stripe where `api.bookSelfDrive` etc. are called.
- **Real-time tracking:** replace the "advance status" buttons (which simulate a mechanic/ambulance/delivery partner moving through stages) with WebSockets or polling driven by an actual partner-side app.
- **Deploying:** the backend can go on Render/Railway/Fly.io with a persistent disk for `navigoo-data.json` (or swap the JSON store for Postgres/MongoDB for production use); the frontend builds to static files (`npm run build`) deployable to Vercel/Netlify — just point its API calls at your deployed backend URL.
