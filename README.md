# 💰 Finance Control API

A RESTful API built with Node.js and TypeScript for personal finance management. It allows users to register, securely log in, and manage their daily income and expenses.

## 🚀 Technologies

This project was developed with the following technologies:

- **Node.js** & **Express**
- **TypeScript**
- **Prisma** (ORM) & **SQLite** (Database)
- **Zod** (Data Validation)
- **JWT** (JSON Web Tokens for Authentication)
- **Bcryptjs** (Password Hashing)
- **Helmet**, **CORS**, and **Express Rate Limit** (Security)

## ✨ Features

- **User Authentication:** Secure registration and login using JWT.
- **Transaction Management:** Create, read, update, and delete (CRUD) financial transactions.
- **Summary:** Get a quick summary of total income, expenses, and current balance.
- **Data Validation:** Robust body request validation using Zod.
- **Security Layers:** Rate limiting to prevent brute-force, Helmet for HTTP headers, and CORS configured.

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/flaviofdev/finance-control-api.git
```

2. Install dependencies:
```bash
npm install
```

3. Configure Environment Variables:
Create a `.env` file in the root of the project and add the following:
```env
PORT=3333
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_key_here"
```

4. Run Prisma Migrations to set up the SQLite database:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

## 📡 API Endpoints

### Health Check
- `GET /health` - Check if the API is running smoothly.

### Authentication
- `POST /auth/register` - Create a new user account.
- `POST /auth/login` - Authenticate user and receive a JWT.

### Transactions (Requires Bearer Token)
- `POST /transactions` - Create a new transaction (income/expense).
- `GET /transactions` - List all transactions for the logged-in user.
- `GET /transactions/summary` - Get total income, expenses, and balance.
- `PUT /transactions/:id` - Update a specific transaction.
- `DELETE /transactions/:id` - Delete a specific transaction.

---
Made with ☕ by [Flávio](https://github.com/flaviofdev)