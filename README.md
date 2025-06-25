# 📝 Task Manager App

A full-stack task management application built with **React (Vite)**, **Express**, **Prisma ORM**, and **PostgreSQL**. Users can sign up, log in, and manage tasks with features like drag-and-drop, task grouping by status, editing, and more.

---

## 🚀 Live Demo

- **Frontend**: [https://your-frontend.onrender.com](https://your-frontend.onrender.com)
- **Backend API**: [https://your-backend.onrender.com/api](https://your-backend.onrender.com/api)

---

## 📦 Tech Stack

- **Frontend**: React + Vite + Material UI + react-beautiful-dnd
- **Backend**: Express.js + Prisma + JWT + bcrypt
- **Database**: PostgreSQL (hosted on Render)
- **Hosting**: Render (backend + frontend)

---

## 🔐 Features

- ✅ User Signup & Login with JWT authentication
- ✅ Password hashing with bcrypt
- ✅ Task creation, update, delete
- ✅ Drag-and-drop task movement between statuses (To Do, In Progress, Done)
- ✅ Grouped tasks view
- ✅ Responsive UI using Material UI
- ✅ Snackbars for feedback

---

## 🛠️ Setup Instructions

### 1. Clone the repo


```git clone https://github.com/yourusername/task-manager.git && cd task-manager && cd backend && npm install```

### 2. Create the .env file
PORT=3000
JWT_SECRET=yourSuperSecret
DATABASE_URL=postgresql://user:pass@host:port/db

### 3. Push schema to database and start server
```npx prisma migrate deploy && node server.js```

### 4. Setup the frontend

```
cd ../my-app
npm install
```
 ### 5. Create .env in the frontend (my-app) 
 VITE_BACKEND_URL=https://your-backend.onrender.com/api  
eg. : http://localhost:5173/api

### Start the frontend server
```
npm run dev
```


Made with ❤️ by Pradhyuman




