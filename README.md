# Student MongoDB CRUD

Full-stack beginner CRUD project.

Frontend:
- HTML
- CSS
- JavaScript

Backend:
- Node.js
- Express

Database:
- MongoDB
- Mongoose

## Setup

1. Make sure MongoDB is running locally.
2. Open a terminal in this project folder.
3. Run:

npm install

4. Start the application:

npm start

5. Open:

http://localhost:3000

## MongoDB Connection

The .env file uses:

MONGO_URI=mongodb://127.0.0.1:27017/studentDB

## CRUD APIs

POST   /api/students
GET    /api/students
GET    /api/students/:id
PUT    /api/students/:id
DELETE /api/students/:id
