# 🍛 Bhagwati Mess – Meal Subscription & Management System

## 📌 Project Description
Bhagwati Mess is a full-stack MERN web application designed to simplify mess/food subscription management. It allows users to subscribe to monthly meal plans, mark daily attendance, and place meal orders, while admins can monitor users, payments, and overall operations through a dedicated dashboard.

This system helps mess owners automate manual processes like attendance tracking, subscription handling, and order management.

---

## 🚀 Features

### 👤 User Features
- User Signup/Login with JWT Authentication
- Monthly Subscription Plans
- Daily Meal Attendance (Lunch/Dinner)
- Profile Management with Address & Image
- Order Tracking System

### 🛠 Admin Features
- Admin Dashboard
- View all users and subscriptions
- Track attendance records
- Monitor payments
- Manage mess operations

---

## 🧑‍💻 Tech Stack

### 🌐 Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM


### ⚙ Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (for image upload)

### ☁ Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📂 Folder Structure

### 🔹 Frontend (client)

client/
│── public/
│── src/
│ ├── api/
│ │ └── axios.js
│ ├── components/
│ │ ├── Navbar.jsx
│ │ ├── MapPicker.jsx
│ │ └── ProtectedRoute.jsx
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Signup.jsx
│ │ ├── Login.jsx
│ │ ├── Profile.jsx
│ │ ├── Dashboard.jsx
│ │ └── Admin.jsx
│ ├── context/
│ │ └── AuthContext.jsx
│ ├── App.jsx
│ └── main.jsx
│── package.json
│── vercel.json


---

### 🔹 Backend (server)

server/
│── config/
│ └── db.js
│── models/
│ ├── User.js
│ ├── Subscription.js
│ ├── Attendance.js
│ └── Order.js
│── routes/
│ ├── authRoutes.js
│ ├── userRoutes.js
│ ├── subscriptionRoutes.js
│ ├── attendanceRoutes.js
│ └── orderRoutes.js
│── middleware/
│ ├── authMiddleware.js
│ └── errorMiddleware.js
│── uploads/
│── server.js
│── package.json


