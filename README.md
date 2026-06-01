# 📚 BookNest

A full-stack MERN-based online bookstore that allows users to browse, search, and purchase books seamlessly with secure authentication and payment integration. BookNest focuses on delivering a smooth user experience with real-world e-commerce features like filtering, cart management and order processing.

---

## 🚀 Live Demo

- 🌐 Frontend: https://booknest-virid.vercel.app/
- 🔗 Backend API: https://booknest-api-ten.vercel.app/

---

<!-- ## 📸 Screenshots

> Store your images inside `/screenshots/` folder in your repo.

![Home](./screenshots/home-page.png)
![Book Details](./screenshots/book-details.png)
![Cart](./screenshots/cart.png)
![Checkout](./screenshots/checkout.png)

--- -->

## 🛠️ Tech Stack

### Frontend

- React.js
- Context API (State Management)
- Tailwind CSS

### Backend

- Node.js
- Express.js

### Database

- MongoDB

### Other Tools & Services

- JWT Authentication
- Stripe Payment Gateway

---

## ✨ Features

- 🔐 Authentication using JWT (Access + Refresh Token)
- ♻️ Automatic token refresh for seamless user sessions
- 👤 User Registration & Login System
- 🔍 Search Books by Keyword
- 🗂️ Filter Books by Category & Author
- 📄 Pagination for Book Listings
- 🛒 Add to Cart & Manage Cart Items
- 💳 Secure Payment Integration (Stripe)
- 📦 Order Management System
- 🛡️ Protected Routes (Frontend & Backend)

---

## ⚙️ Installation & Setup

```bash

#Clone the repository

git clone https://github.com/GoodBoy-420/bookNest

#Install frontend dependencies

cd client
npm install

#Install backend dependencies

cd ../server
npm install

#Run the project

#For Client:
npm run dev

#For Server:
npm start
```

---

## 🔐 Environment Variables

Create a `.env` file in the server folder and add:

```env
#For server:
PORT=
MONGO_URL= your_mongodb_connection_string


#JWT
SECRET_KEY = your_jwt_secret
JWT_EXPIRES_IN = your_jwt_expire_time

#JWT Refresh
REFRESH_JWT_EXPIRES_IN= your_refresh_jwt_expire_time
REFRESH_SECRET_KEY = your_refresh_jwt_secret


CLIENT_URL= your_client_url


MAX_JSON_SIZE= your_max_size_for_json

REQUEST_TIME= your_max_request_time
REQUEST_NUMBER= your_max_request_number



EMAIL_HOST= your_mailTrap_host
EMAIL_PORT= your_mailTrap_port
EMAIL_USER= your_mailTrap_api
EMAIL_PASS= your_mailTrap_pass




CLOUD_NAME= your_cloudinary_name
API_KEY= your_cloudinary_api_key
API_SECRET= your_cloudinary__api_secret



#Stripe
STRIPE_SECRET_KEY= your_stripe_secret_key
STRIPE_WEBHOOK_SECRET= your_stripe_webhook_secret


#For client:
VITE_BASE_URL = your_server_url
```

---

## 📁 Folder Structure

```
client/
├── src/
├── components/
├── context/
├── hooks/
├── pages/
├── providers/
├── routes/

server/
├── controllers/
├── models/
├── routes/
├── middleware/
├── services/
├── utils/
├── libs/
```

---

## 🧪 API Endpoints

### 🔐 Authentication

- POST /auth/register → Register a new user
- POST /auth/email-verify → Verify user email
- POST /auth/otp-verify?email=user@example.com → Verify OTP
- POST /auth/reset-password?email=user@example.com → Reset password
- POST /auth/login → Login user
- POST /auth/logout → Logout user
- POST /auth/refresh-token → Generate new access token using refresh token

---

### 📚 Books

- GET /book/get-all?page=1 → Get all books (with pagination)
- GET /book/get/:bookId → Get single book details
- POST /book/post → Add a new book
- PUT /book/update/:bookId → Update book details
- DELETE /book/delete/:bookId → Delete a book

---

### ❤️ Wishlist

- POST /wish-list/:bookId → Add/Remove book from wishlist
- GET /wish-list/get-wishlist → Get user wishlist

---

### 🛒 Cart

- GET /cart → Get cart items
- POST /cart/add → Add item to cart
- PUT /cart/update → Update cart item quantity
- DELETE /cart/remove → Remove item from cart

---

### 📦 Orders & Payment

- POST /order/create-checkout-session → Create Stripe checkout session
- GET /order/get-my-orders → Get user order history
- POST /stripe/webhook → Stripe webhook for payment confirmation

---

## 🔑 Credentials & Notes

- Users must **register** to access features
- 🔄 “Forgot Password” feature is temporarily hidden due to email service limitations (will be re-enabled soon)

---

## 🧠 Challenges & Learnings

One of the biggest challenges in this project was integrating the Stripe payment gateway for the first time. Understanding the complete payment flow (from creating payment intents to handling secure transactions on both frontend and backend) required careful implementation and debugging.

This experience helped strengthen my understanding of:

- Secure payment processing
- Handling asynchronous operations
- Managing sensitive data using environment variables

---

## 🔮 Future Improvements

- Admin Dashboard (role-based access)
- Wishlist Feature
- Advanced Analytics for Orders
- Unit & Integration Testing

---

## 👤 Author

**Md. Redwan Islam**

- 💼 Full-Stack MERN Developer
- 🌐 Portfolio: https://goodboy-420.github.io/portfolio/
- 🔗 LinkedIn: https://linkedin.com/in/md-redwan-islam/
- 📧 Email: [riadislam9117@gmail.com](mailto:riadislam9117@gmail.com?subject=Regarding%20BookNest%20Project)

---

## 📜 License

This project is licensed under the MIT License.
