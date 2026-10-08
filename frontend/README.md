# UniConnect Frontend

The UniConnect frontend is a responsive React application for students, companies, and platform administrators. It includes role-based dashboards, a mobile navigation drawer, touch-friendly layouts, dark mode, internship discovery, saved opportunities, application tracking, CV management, notifications, account settings, candidate review, and administration tools.

## Start locally

```powershell
npm install
npm run dev
```

Open `http://localhost:5173` and keep the Spring Boot backend running on port `8080`.

## Environment

Copy `.env.example` to `.env` only when the backend uses a different URL:

```env
VITE_API_URL=http://localhost:8080/api
```

Do not commit `.env`.

## Quality checks

```powershell
npm run lint
npm run build
```
