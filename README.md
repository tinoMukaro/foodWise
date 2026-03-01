## FoodWise

FoodWise helps users discover discounted food from local businesses before it goes to waste. 
Businesses create time-limited deals, and users can reserve and collect them.

## Features

Users: browse deals, reserve, collect

Businesses: create deals, view orders


## Tech Stack

Frontend: React, Tailwind CSS

Backend: Node.js, Express, Drizzle ORM

Database: Neon DB (PostgreSQL)

Other: Docker, Cron jobs

## Running the Project
Clone the repo:
make sure you have docker and docker compose
a Neon postgres db account for connection string

git clone https://github.com/tinoMukaro/foodWise.git
cd foodwise

Add environment variables in /server/.env:

DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>?sslmode=require
JWT_SECRET=your_secret_key
PORT=5000

Start with Docker: <br />
docker compose exec server npx drizzle-kit push - this will setup tables <br />
docker compose up --build

Access the app:

Frontend: http://localhost:3000

Backend API: http://localhost:5000


👨‍💻 Author

## Tino Mukaro (github.com/tinoMukaro)
