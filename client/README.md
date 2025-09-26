# Karan Taragi — MERN Portfolio

A modern portfolio built with React (Vite + Tailwind) and an Express API for the contact form.

## Prerequisites
- Node.js 18+
- npm 9+

## Setup

1) Install client deps
```bash
cd client
npm install
```

2) Install server deps
```bash
cd ../server
npm install
```

3) Configure SMTP (for contact form)
- Create `server/.env` with:
```
PORT=5000
SMTP_HOST=your_host
SMTP_PORT=587
SMTP_USER=your_user
SMTP_PASS=your_password
SMTP_FROM=from@example.com
CONTACT_TO=to@example.com
```

4) Run locally
- Terminal A (server):
```bash
cd server
npm run start
```
- Terminal B (client):
```bash
cd client
npm run dev
```

Client runs at http://localhost:5173 and proxies `/api` to http://localhost:5000.

## Deploy
- Frontend: Deploy `client` build to Vercel/Netlify/Cloudflare Pages.
```bash
cd client
npm run build
```
- Backend: Deploy `server` to Render/Fly.io/Heroku (set env vars).

## Tech
- React 18 (Vite)
- Tailwind CSS v4
- Express 5
- Nodemailer for email delivery

## License
MIT
