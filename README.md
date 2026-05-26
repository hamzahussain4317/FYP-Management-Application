# FYP Management Application

A full-stack web application for managing Final Year Projects (FYP) at FAST-NUCES. The system provides role-based access for Students, Supervisors, and Admins to manage groups, proposals, tasks, evaluations, and real-time communication throughout the FYP lifecycle.

---

## Repository Structure

This repository is organized into two main branches:

| Branch | Purpose |
|---|---|
| `feature/Auth-frontend` | Next.js frontend application (React, TypeScript, Tailwind CSS) |
| `feature/Auth-backend` | Node.js/Express backend API (REST + Socket.IO) |

Clone the full project and switch to the relevant branch depending on what you are working on.

---

## Features Overview

### Student
- Register and log in with university email
- Create or join a project group
- Submit and track FYP proposals
- View assigned tasks and update progress
- Message supervisors in real time
- View evaluation marks and project statistics

### Supervisor
- Log in with faculty credentials
- View and manage assigned student groups
- Accept or reject proposal requests
- Assign and monitor tasks
- Communicate with students via messaging
- View group progress and evaluation schedules

### Admin
- Manage all registered students and supervisors
- Create and edit groups
- Schedule evaluations
- Update student marks
- View system-wide statistics

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, React, TypeScript, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | PostgreSQL (via Supabase) |
| Real-time | Socket.IO |
| Auth | JWT (JSON Web Tokens) + bcrypt |
| File uploads | Multer |
| Email | Nodemailer |
| Charts | Chart.js, react-chartjs-2 |
| Forms | React Hook Form + Zod validation |

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+
- PostgreSQL database (or a Supabase project)

### 1. Clone the repository

```bash
git clone https://github.com/hamzahussain4317/FYP-Management-Application.git
cd FYP-Management-Application
```

### 2. Set up the backend

```bash
git checkout feature/Auth-backend
npm install
```

Create a `.env` file in the backend root — see the [Backend README](../../tree/feature/Auth-backend#environment-variables) for required variables.

```bash
npm start
```

Backend runs on `http://localhost:5000` by default.

### 3. Set up the frontend

```bash
git checkout feature/Auth-frontend
npm install
```

Create a `.env.local` file in the frontend root — see the [Frontend README](../../tree/feature/Auth-frontend#environment-variables) for required variables.

```bash
npm run dev
```

Frontend runs on `http://localhost:3000` by default.

---

## Project Structure (High Level)

```
FYP-Management-Application/
├── feature/Auth-backend/          # Express API server
│   ├── controllers/               # Route handler logic
│   ├── routes/                    # API route definitions
│   ├── middlewares/               # Auth, validation, file upload
│   ├── models/                    # Database model helpers
│   ├── db/                        # PostgreSQL connection pool
│   ├── services/                  # Business logic services
│   ├── utils/                     # Email, password utilities
│   └── index.js                   # Server entry point
│
└── feature/Auth-frontend/         # Next.js app
    ├── app/                       # App router pages
    │   ├── (Auth)/                # Login pages
    │   ├── student/               # Student dashboard pages
    │   ├── supervisor/            # Supervisor dashboard pages
    │   └── admin/                 # Admin dashboard pages
    ├── Components/                # Shared UI components
    ├── context/                   # React context providers
    ├── Schemas/                   # Zod validation schemas
    ├── utils/                     # Auth fetch, socket helpers
    └── middleware.ts              # Route protection middleware
```

---

## Branch Guide

| Branch | Description |
|---|---|
| `main` | Stable, merged production-ready code |
| `feature/Auth-frontend` | Active frontend development |
| `feature/Auth-backend` | Active backend development |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add: your feature description"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request against `main`

---

## License

ISC License — see `package.json` for details.

---

## Repository

[https://github.com/hamzahussain4317/FYP-Management-Application](https://github.com/hamzahussain4317/FYP-Management-Application)
