# 🏨 HotelHeaven Frontend

A modern hotel booking frontend built with **React + Vite + Tailwind CSS**, integrated with a Django backend and online payment system.

---

## 🚀 Live Demo

👉 https://hotel-heaven-frontend.vercel.app/

---

## 🛠️ Tech Stack

* ⚛️ React (Vite)
* 🎨 Tailwind CSS
* 🔐 Authentication (JWT)
* 🌐 Axios API Client
* 🧭 React Router DOM
* 💳 SSLCommerz Payment Integration

---

## 📂 Project Structure

```
src/
│── components/
│   ├── Booking/
│   ├── Dashboard/
│   ├── Hotel/
│   ├── Registration/
│
│── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Profile.jsx
│   ├── PaymentSuccess.jsx
│   ├── PaymentFailed.jsx
│
│── layout/
│   ├── MainLayout.jsx
│   ├── DashboardLayout.jsx
│
│── routes/
│   └── AppRoutes.jsx
│
│── services/
│   ├── Api-Client.js
│   ├── Auth-Api-Client.js
│
│── hooks/
│
│── main.jsx
│── App.jsx
```

---

## 🔑 Features

* 🔐 User Authentication (Login / Register / Activate)
* 🏨 Hotel Listing & Details Page
* 🛒 Booking Cart System
* 💳 Online Payment (SSLCommerz)
* 📊 User Dashboard
* 📅 Booking Management
* 👤 Profile Update & Password Change
* 🔒 Protected Routes (PrivateRoute)
* 📱 Fully Responsive UI

---

## 🧭 Routing Structure

```jsx
/                     → Home
/hotels/:id           → Hotel Details
/login                → Login Page
/register             → Register Page
/checkout             → Booking Checkout
/cart                 → Cart Page

/payment/success      → Payment Success
/payment/failed       → Payment Failed
/payment/cancelled    → Payment Cancelled

/dashboard            → Dashboard (Protected)
/dashboard/profile    → User Profile
/dashboard/bookings   → My Bookings
/dashboard/cart       → Cart (Dashboard)
```

---

## ⚙️ Environment Variables

Create a `.env` file:

```
VITE_API_BASE_URL=https://your-backend-api.com/api
```

---

## 🖥️ Run Locally

```bash
npm install
npm run dev
```

---

## 📦 Build Project

```bash
npm run build
```

---

## 🚀 Deployment (Vercel)

### 1. Install CLI

```bash
npm install -g vercel
```

### 2. Deploy

```bash
vercel
```

### 3. Production Deploy

```bash
vercel --prod
```

---

## ⚠️ Important Configuration

### ✅ Vercel Routing Fix (SPA)

Create `vercel.json`:

```json
{
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

---

## 🔗 Backend Integration

This frontend connects with Django backend:

* Booking API
* Authentication API
* Payment API

Make sure backend is deployed (Render / Railway / VPS).

---

## 💡 Booking Flow

1. User selects hotel
2. Booking is created
3. Redirect to checkout
4. Payment initiated
5. Payment success → backend updates booking
6. Booking appears in dashboard

---

## 🐞 Common Issues

### ❌ White Screen on Deploy

* Fix: Add `vercel.json`

### ❌ API Not Working

* Check backend URL
* Ensure CORS enabled

### ❌ Login Redirect Issue

* Handle API error properly
* Do not navigate on failed login

---

## 👨‍💻 Author

**Sakir Mohammad Safayet**

---

## ⭐ Future Improvements

* Admin Dashboard
* Hotel Reviews System
* Advanced Search & Filters
* Booking Analytics
* Notification System

---

## 📜 License

This project is for educational purposes.
