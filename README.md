# 🛒 E-Commerce-Website

A full-stack e-commerce application built with **React, Node.js, Express, and MongoDB**.  

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

### 3. Configure environment variables

Create a `.env` file in the **frontend** folder:

```env
VITE_BACKEND_URL=http://localhost:9000
```

Create another `.env` file in the **backend** folder:

```env
PORT=9000

MONGO_URL=mongodb+srv://sahanimohottige25:7l4HCQ0hLeIqOABE@cluster0.b92b1mc.mongodb.net/pickzy?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET=9f0e3a63fcf242c28e4301c90ae3e41d447b88d84c70d591d6d00fd38dce7c95

NODE_ENV=development
CLOUDINARY_CLOUD_NAME=dgjz4ktw4
CLOUDINARY_API_KEY=313974332296694
CLOUDINARY_API_SECRET=kzcwqW3WEGB0HRgp43nNukjI_l0

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

```
