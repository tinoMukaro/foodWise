# FoodWise 🍽️♻️

[![React](https://img.shields.io/badge/Frontend-React-61DAFB.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC.svg)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Framework-Express-black.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Containerized-Docker-2496ED.svg)](https://www.docker.com/)

---

##  Overview

**FoodWise** is a food rescue and discount marketplace that helps reduce food waste by connecting users with discounted food deals from local businesses before the food goes unsold.

Businesses can create time-limited offers, while users can browse, reserve, and collect affordable meals and food items nearby.

The platform promotes:
-  Food waste reduction
-  Affordable food access
-  Local business support
-  Sustainable consumption

---

##  Features

###  User Features
- Browse discounted food deals
- Reserve food items
- Collect reserved orders
- Authentication & secure login

###  Business Features
- Create and manage food deals
- Set deal quantities and expiry times
- View customer reservations/orders
- Manage active and expired listings

---

##  Tech Stack

### Frontend
- React
- Tailwind CSS

### Backend
- Node.js
- Express.js
- Drizzle ORM

### Database
- Neon PostgreSQL

### DevOps & Tools
- Docker
- Docker Compose
- Cron Jobs

---

##  Project Structure

```bash
foodWise/
│
├── client/              # React frontend
├── server/              # Express backend
├── docker-compose.yml
└── README.md
```

---

##  Running the Project

###  Prerequisites

Before running the project, make sure you have:

- Node.js installed
- Docker & Docker Compose installed
- A Neon PostgreSQL database
- Git installed

---

## ⚙️ Installation & Setup

### 1️ Clone the Repository

```bash
git clone https://github.com/tinoMukaro/foodWise.git
cd foodWise
```

---

### 2️ Configure Environment Variables

Create a `.env` file inside the `/server` directory:

```env
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>?sslmode=require

JWT_SECRET=your_secret_key

PORT=5000
```

---

### 3️ Setup Database Tables

Run the Drizzle migration command:

```bash
docker compose exec server npx drizzle-kit push
```

This will create the required PostgreSQL tables.

---

### 4️ Start the Application

```bash
docker compose up --build
```

---

## 🌐 Application Access

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |

---

##  Authentication

FoodWise uses JWT-based authentication for securing API routes and user sessions.

Protected routes require a valid JWT token.

---

##  Background Jobs

Cron jobs are used for:
- Expiring outdated deals
- Cleaning inactive listings
- Automating time-based deal updates

---

##  Future Improvements

- 📍 Map/location-based deal discovery
- 🔔 Real-time notifications
- 📱 Mobile app support
- 💳 Integrated payments
- ⭐ Ratings & reviews

---

##  Author

### Tino Mukaro

- GitHub: https://github.com/tinoMukaro

---

## 📄 License

This project is open-source and available under the MIT License.
