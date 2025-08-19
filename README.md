# 🛒 E-Commerce-Website

---

## High-Level Architecture Overview

**Frontend**
- React (Vite), Redux Toolkit, TailwindCSS
- State managed via Redux slices (cart, orders, products, users, admin, auth)
- Routing: React Router
- UI: Lucide-react, react-icons, Sonner (toasts)
- Data flow: Components dispatch Redux actions → API calls to backend → Redux state updates → UI re-renders

**Backend**
- Node.js + Express
- MongoDB (via mongoose)
- Authentication: JWT
- API Endpoints: `/api/users`, `/api/products`, `/api/cart`, `/api/orders`, `/api/checkout`, `/api/upload`, `/api/subscriber`, `/api/admin/*`
- Middleware: JWT protect
- External integrations: Cloudinary (image upload), PayPal (payments)

**Database**
- MongoDB Atlas (cloud)
- Collections: Users, Products, Orders, Cart

**External Tools**
- Cloudinary (images)
- PayPal (payments)
- Sonner (frontend notifications)
- JWT (auth)
- TailwindCSS (styling)

**Data Flow**
- Frontend ⇄ Backend API ⇄ MongoDB
- Frontend → Cloudinary (image upload)
- Frontend → PayPal (payments)
- Backend → Cloudinary (image management)
- Redux (state management) inside Frontend
- JWT (auth) between Frontend and Backend

---

## 🚀 Features
- User authentication with JWT
- Product listing, search, and filtering
- Shopping cart & checkout
- Admin dashboard (manage products, orders, and users)
- Secure payments (PayPal)
- Order tracking

---

## 📦 Tech Stack
- **Frontend:** React, Redux Toolkit, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Payments:** PayPal 

---

## ⚙️ Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (>=16)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or MongoDB Atlas)

---

## 🔧 Installation & Setup

### 1. Clone the repo
```bash
git clone https://github.com/your-username/ecommerce-app.git
cd ecommerce-app
````

### 2. Install dependencies

**Backend**

```bash
cd backend
npm install
```

**Frontend**

```bash
cd ../frontend
npm install
```

---

## ▶️ Running the App

**Start Backend**

```bash
cd backend
npm run dev
```

**Start Frontend**

Open a new terminal:

```bash
cd frontend
npm run dev
```

Ports for:

* Frontend: `http://localhost:5173`
* Backend: `http://localhost:9000`

---

## 🧪 Testing

```bash
npm test
```

---

## 📂 Project Structure

```
ecommerce-app/
│── backend/        # Express API
│── frontend/       # React app
│── README.md
```

---

## 👩‍💻 Author

Developed by [Sahani Mohottige](https://github.com/Sahani-Mohottige).
