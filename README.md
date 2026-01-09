<div align="center">
  <h1>🎫 Ticket System API</h1>

  <p>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
    <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
    <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
    <img src="https://img.shields.io/badge/Bcrypt-003A8F?style=for-the-badge&logo=letsencrypt&logoColor=white" />
    <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" />
  </p>

  <p>
    <strong>RESTful API for event ticket management system with role-based authentication and authorization</strong><br />
  </p>

  <p>
    <img src="https://img.shields.io/badge/Status-Active-success" />
    <img src="https://img.shields.io/badge/Version-1.0.0-blue" />
  </p>
</div>

---

## 🌟 Overview

> Backend service for event ticket management system with focus on **secure authentication**, **role-based access control**, and **real-time stock validation**

Ticket System API is a comprehensive backend service providing full-featured event and ticket booking management, equipped with JWT authentication, role-based access control, and real-time stock validation using database transactions & locking.

This application is designed with a **RESTful API** approach, implementing **Express & Prisma best practices**, while focusing on **security, data consistency, and scalability**.

---

## ✨ Key Features

### 🚀 Why This Project? 
- Implementation of **JWT Authentication** for secure access control
- **Role-Based Authorization** (Customer & Organizer)
- **Real-time Stock Validation** with Prisma transaction & row locking
- **Rate Limiting** to prevent abuse
- **Input Validation** with Zod schema
- Clean and maintainable code structure

### 🔹 Core Functionality
- 👥 **User Management** (Customer & Organizer)
- 🔐 **Authentication & Authorization** based on JWT + bcrypt
- 🎉 **Event Management** (Organizer only)
- 🎫 **Ticket Booking System** (Customer only, with real-time stock)
- 🎟️ **Ticket Management** (Generate, track, mark as used)

### 🔹 Technical Highlights
- 🎯 **Database Transaction** with Prisma
- 🔒 **Row-Level Locking** to prevent race conditions
- ✅ **Input Validation** at every endpoint with Zod
- 🛡️ **JWT Authentication** with role-based middleware
- 🚦 **Rate Limiting** for auth & booking endpoints
- 🏗️ **Clean Architecture** with separation of concerns
- 📝 **Comprehensive Documentation** in README & Postman Collection

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Database Setup](#database-setup)
4. [Environment Configuration](#environment-configuration)
5. [Running the Application](#running-the-application)
6. [Project Structure](#project-structure)
7. [API Endpoints](#api-endpoints)
8. [Architecture & Security](#architecture--security)
9. [Security Features](#security-features)
10. [Business Logic](#business-logic)
11. [Testing with Postman](#testing-with-postman)
12. [Troubleshooting](#troubleshooting)

---

## 🔧 1. Prerequisites

Ensure your development environment meets the following requirements:
- **Node.js** >= 18.x
- **MySQL** >= 8.0
- **npm** >= 6.x
- **Git** (for repository cloning)

---

## 📦 2. Installation

Clone the repository and install all dependencies:

```bash
git clone <repository-url>
cd backend-api-ticket-system
npm install
```

---

## 🗄️ 3. Database Setup

This project uses **Prisma ORM** for database management.

### 🔹 Database Setup

```bash
# Install All Dependencies
npm install

# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database with dummy data
npm run db:seed

# Reset database (drop + migrate + seed)
npm run db:reset
```

### 🔹 Prisma Commands

```bash
# Open Prisma Studio (Database GUI)
npm run db:studio
```

---

## ⚙️ 4. Environment Configuration

Create a `.env` file in the project root with the following template:

```env
# Server Configuration
SERVER_PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL="mysql://root:your_password@localhost:3306/ticket_system"

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# CORS Configuration
CLIENT_URL=http://localhost:3000,http://localhost:5173
```

> ⚠️ **Important**: Replace `your_password` and `JWT_SECRET` with secure values!

### Environment Variables Explanation

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `SERVER_PORT` | Express server port | 5000 | No |
| `NODE_ENV` | Environment mode | development | Yes |
| `DATABASE_URL` | MySQL connection string | - | Yes |
| `JWT_SECRET` | Secret key for JWT | - | Yes |
| `JWT_EXPIRES_IN` | JWT token expiration | 7d | No |
| `CLIENT_URL` | Allowed CORS origins (comma separated) | - | Yes |

---

## 🚀 5. Running the Application

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Default Users for Testing (from seeder)

| Email | Password | Role |
|-------|----------|------|
| john@customer.com | password123 | Customer |
| jane@customer.com | password123 | Customer |
| alice@customer.com | password123 | Customer |
| organizer@events.com | password123 | Organizer |
| concert@events.com | password123 | Organizer |

Server will run at: `http://localhost:5000`

---

## 📁 6. Project Structure

```
backend-api-ticket-system/
├── config/
│   ├── cors.js                # CORS configuration
│   ├── rateLimit.js           # Rate limiting config
│   └── security.js            # Security headers config
├── controllers/               # HTTP request handlers
│   ├── authController.js
│   ├── bookingController.js
│   ├── eventController.js
│   ├── ticketController.js
│   └── userController.js
├── middlewares/              # Express middleware
│   ├── authMiddleware.js     # JWT auth & role authorization
│   ├── errorHandler.js       # Global error handler
│   └── requestLogger.js      # Request logging
├── prisma/
│   ├── migrations/           # Database migrations
│   ├── schema.prisma         # Prisma schema definition
│   ├── client.js             # Prisma client instance
│   └── seed.js               # Database seeder
├── routers/                  # Express routes
│   ├── authRoutes.js
│   ├── bookingRoutes.js
│   ├── eventRoutes.js
│   ├── ticketRoutes.js
│   ├── userRoutes.js
│   └── index.js              # Main router
├── services/                 # Business logic layer
│   ├── authService.js
│   ├── bookingService.js
│   ├── eventService.js
│   ├── ticketService.js
│   └── userService.js
├── utils/                    # Utility functions
│   ├── generateTickets.js   # Ticket code generator
│   ├── token.js              # JWT token utilities
│   └── validateEnv.js        # Environment validation
├── validations/              # Zod validation schemas
│   ├── authValidation.js
│   ├── bookingValidation.js
│   ├── eventValidation.js
│   ├── ticketValidation.js
│   └── userValidation.js
├── .env.example              # Template environment variables
├── .gitignore                # Git ignore rules
├── app.js                    # Express app configuration
├── package.json              # NPM dependencies & scripts
├── README.md                 # Project documentation
└── server.js                 # Application entry point
```

### Architecture Layer Explanation

1. **Routes** → Define endpoints and HTTP methods
2. **Controllers** → Handle HTTP request/response
3. **Validations** → Zod schema for input validation
4. **Services** → Business logic, database operations, transactions
5. **Middlewares** → Authentication, authorization, error handling
6. **Utils** → Reusable helper functions

---

## 🔌 7. API Endpoints

> Complete endpoint documentation according to **"Secure the Crowd!"** requirements

### Base URL
```
http://localhost:5000
```

---

### 🏥 Health Check & Root

#### 1. Health Check
```http
GET /health
```

**Success Response (200)**
```json
{
  "status": "success",
  "message": "The server is running well",
  "timestamp": "2025-01-09T10:30:00.000Z",
  "environment": "development"
}
```

#### 2. API Root
```http
GET /
```

**Success Response (200)**
```json
{
  "status": "success",
  "message": "Welcome to the Ticket System API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "auth": "/login",
    "users": "/users",
    "events": "/events",
    "bookings": "/bookings",
    "tickets": "/tickets"
  }
}
```

---

### 🔐 Authentication

#### 3. Login
```http
POST /login
```

**Rate Limit:** 5 requests per 15 minutes

**Request Body**
```json
{
  "email": "john@customer.com",
  "password": "password123"
}
```

**Success Response (200)**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@customer.com",
    "role": "customer",
    "createdAt": "2025-01-09T10:00:00.000Z",
    "updatedAt": "2025-01-09T10:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (400) - Validation Error**
```json
{
  "status": "fail",
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email"
    }
  ]
}
```

**Error Response (401) - Invalid Credentials**
```json
{
  "status": "fail",
  "message": "Invalid email or password"
}
```

**Error Response (429) - Rate Limit Exceeded**
```json
{
  "status": "error",
  "message": "Too many login attempts, please try again in 15 minutes"
}
```

---

### 👥 Users

#### 4. Create User (Register)
```http
POST /users
```

**Request Body**
```json
{
  "name": "New Customer",
  "email": "newcustomer@mail.com",
  "password": "password123",
  "role": "customer"
}
```

**Field Validations:**
- `name`: string, min 1 character
- `email`: valid email format
- `password`: string, min 8 characters
- `role`: enum ["customer", "organizer"]

**Success Response (201)**
```json
{
  "id": 6,
  "name": "New Customer",
  "email": "newcustomer@mail.com",
  "role": "customer",
  "createdAt": "2025-01-09T11:00:00.000Z",
  "updatedAt": "2025-01-09T11:00:00.000Z"
}
```

**Error Response (400) - Email Already Exists**
```json
{
  "status": "fail",
  "message": "email is already in use"
}
```

#### 5. Get All Users
```http
GET /users
```

**Success Response (200)**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@customer.com",
    "role": "customer",
    "createdAt": "2025-01-09T10:00:00.000Z",
    "updatedAt": "2025-01-09T10:00:00.000Z"
  },
  {
    "id": 4,
    "name": "Event Organizer Pro",
    "email": "organizer@events.com",
    "role": "organizer",
    "createdAt": "2025-01-09T10:00:00.000Z",
    "updatedAt": "2025-01-09T10:00:00.000Z"
  }
]
```

#### 6. Get User By ID
```http
GET /users/:id
```

**Example:** `GET /users/1`

**Success Response (200)**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@customer.com",
  "role": "customer",
  "createdAt": "2025-01-09T10:00:00.000Z",
  "updatedAt": "2025-01-09T10:00:00.000Z"
}
```

**Error Response (404)**
```json
{
  "status": "fail",
  "message": "User not found"
}
```

**Error Response (400) - Invalid ID**
```json
{
  "status": "fail",
  "message": "Validation error",
  "errors": [
    {
      "field": "id",
      "message": "User ID must be a positive integer"
    }
  ]
}
```

#### 7. Update User (Partial)
```http
PATCH /users/:id
```

**Request Body** (all fields optional)
```json
{
  "name": "Updated Name",
  "password": "newpassword123"
}
```

**Success Response (200)**
```json
{
  "id": 1,
  "name": "Updated Name",
  "email": "john@customer.com",
  "role": "customer",
  "createdAt": "2025-01-09T10:00:00.000Z",
  "updatedAt": "2025-01-09T11:30:00.000Z"
}
```

#### 8. Delete User (Soft Delete)
```http
DELETE /users/:id
```

**Success Response (204 No Content)**

---

### 🎉 Events

> **Note:** Create, Update, and Delete events are **ONLY for Organizers** (authenticated)

#### 9. Create Event (Organizer Only)
```http
POST /events
Authorization: Bearer <organizer_token>
```

**Request Headers**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body**
```json
{
  "title": "Rock Concert 2026",
  "location": "Jakarta International Stadium",
  "capacity": 5000,
  "price": 500000,
  "date": "2026-12-31T19:00:00Z"
}
```

**Field Validations:**
- `title`: string, min 1 character
- `location`: string, min 1 character
- `capacity`: integer, min 5
- `price`: integer, min 0
- `date`: valid date, must be in the future

**Success Response (201)**
```json
{
  "id": 3,
  "title": "Rock Concert 2026",
  "location": "Jakarta International Stadium",
  "capacity": 5000,
  "availableSeat": 5000,
  "price": 500000,
  "status": "available",
  "date": "2026-12-31T19:00:00.000Z",
  "createdAt": "2025-01-09T11:00:00.000Z",
  "updatedAt": "2025-01-09T11:00:00.000Z"
}
```

**Error Response (401) - Not Authenticated**
```json
{
  "status": "fail",
  "message": "Not authenticated, token not found"
}
```

**Error Response (403) - Not Organizer**
```json
{
  "status": "fail",
  "message": "Access denied, user role does not match"
}
```

**Error Response (400) - Date in Past**
```json
{
  "status": "fail",
  "message": "Validation error",
  "errors": [
    {
      "field": "date",
      "message": "Event date must be in the future"
    }
  ]
}
```

#### 10. Get All Events
```http
GET /events
```

**Success Response (200)**
```json
[
  {
    "id": 1,
    "title": "Rock Concert 2025",
    "location": "Jakarta International Stadium",
    "capacity": 5000,
    "availableSeat": 4998,
    "price": 500000,
    "status": "available",
    "date": "2025-12-31T19:00:00.000Z",
    "createdAt": "2025-01-09T10:00:00.000Z",
    "updatedAt": "2025-01-09T10:30:00.000Z"
  },
  {
    "id": 2,
    "title": "Tech Conference 2025",
    "location": "Bali Convention Center",
    "capacity": 1000,
    "availableSeat": 1000,
    "price": 1500000,
    "status": "available",
    "date": "2025-11-15T09:00:00.000Z",
    "createdAt": "2025-01-09T10:00:00.000Z",
    "updatedAt": "2025-01-09T10:00:00.000Z"
  }
]
```

#### 11. Get Event By ID
```http
GET /events/:id
```

**Example:** `GET /events/1`

**Success Response (200)**
```json
{
  "id": 1,
  "title": "Rock Concert 2025",
  "location": "Jakarta International Stadium",
  "capacity": 5000,
  "availableSeat": 4998,
  "price": 500000,
  "status": "available",
  "date": "2025-12-31T19:00:00.000Z",
  "createdAt": "2025-01-09T10:00:00.000Z",
  "updatedAt": "2025-01-09T10:30:00.000Z"
}
```

**Error Response (404)**
```json
{
  "status": "fail",
  "message": "Event not found"
}
```

#### 12. Update Event (Organizer Only)
```http
PATCH /events/:id
Authorization: Bearer <organizer_token>
```

**Request Body** (all fields optional)
```json
{
  "title": "Updated Concert Title",
  "price": 600000,
  "capacity": 6000
}
```

**Success Response (200)**
```json
{
  "id": 1,
  "title": "Updated Concert Title",
  "location": "Jakarta International Stadium",
  "capacity": 6000,
  "availableSeat": 5998,
  "price": 600000,
  "status": "available",
  "date": "2025-12-31T19:00:00.000Z",
  "createdAt": "2025-01-09T10:00:00.000Z",
  "updatedAt": "2025-01-09T12:00:00.000Z"
}
```

**Error Response (403) - Not Event Owner**
```json
{
  "status": "fail",
  "message": "Not the event owner"
}
```

**Error Response (400) - Capacity Too Small**
```json
{
  "status": "fail",
  "message": "Capacity cannot be less than 2"
}
```

#### 13. Delete Event (Organizer Only)
```http
DELETE /events/:id
Authorization: Bearer <organizer_token>
```

**Success Response (204 No Content)**

**Error Response (400) - Event Not Available**
```json
{
  "status": "fail",
  "message": "Event not available"
}
```

---

### 🎫 Bookings

> **Note:** All booking endpoints **require authentication** (Customer role)

#### 14. Create Booking (Customer Only)
```http
POST /bookings
Authorization: Bearer <customer_token>
```

**Rate Limit:** 10 requests per 5 minutes

**Request Body**
```json
{
  "eventId": 1,
  "quantity": 2,
  "holders": ["John Doe", "Jane Smith"]
}
```

**Field Validations:**
- `eventId`: integer, positive
- `quantity`: integer, min 1
- `holders`: array of strings (optional, length must match quantity)

**Success Response (201)**
```json
{
  "id": 1,
  "eventId": 1,
  "quantity": 2,
  "totalPrice": 1000000,
  "status": "success",
  "createdAt": "2025-01-09T12:00:00.000Z",
  "updatedAt": "2025-01-09T12:00:00.000Z",
  "tickets": [
    {
      "id": 1,
      "holderName": "John Doe",
      "ticketCode": "ABCD-1234-EFGH-567890",
      "status": "unused"
    },
    {
      "id": 2,
      "holderName": "Jane Smith",
      "ticketCode": "IJKL-9012-MNOP-345678",
      "status": "unused"
    }
  ]
}
```

**Error Response (401) - Not Authenticated**
```json
{
  "status": "fail",
  "message": "Not authenticated, token not found"
}
```

**Error Response (400) - Event Not Found**
```json
{
  "status": "fail",
  "message": "Event not found"
}
```

**Error Response (400) - Event Not Available**
```json
{
  "status": "fail",
  "message": "Event not available"
}
```

**Error Response (400) - Insufficient Seats**
```json
{
  "status": "fail",
  "message": "Not enough seats available"
}
```

**Error Response (429) - Rate Limit Exceeded**
```json
{
  "status": "error",
  "message": "Too many bookings, try again in a few minutes"
}
```

#### 15. Get All Bookings (Authenticated)
```http
GET /bookings
Authorization: Bearer <token>
```

**Success Response (200)**
```json
[
  {
    "id": 1,
    "eventId": 1,
    "quantity": 2,
    "totalPrice": 1000000,
    "status": "success",
    "createdAt": "2025-01-09T12:00:00.000Z",
    "updatedAt": "2025-01-09T12:00:00.000Z",
    "tickets": [
      {
        "id": 1,
        "holderName": "John Doe",
        "ticketCode": "ABCD-1234-EFGH-567890",
        "status": "unused"
      },
      {
        "id": 2,
        "holderName": "Jane Smith",
        "ticketCode": "IJKL-9012-MNOP-345678",
        "status": "unused"
      }
    ]
  }
]
```

#### 16. Get Booking By ID (Authenticated)
```http
GET /bookings/:id
Authorization: Bearer <token>
```

**Example:** `GET /bookings/1`

**Success Response (200)**
```json
{
  "id": 1,
  "eventId": 1,
  "quantity": 2,
  "totalPrice": 1000000,
  "status": "success",
  "createdAt": "2025-01-09T12:00:00.000Z",
  "updatedAt": "2025-01-09T12:00:00.000Z",
  "tickets": [
    {
      "id": 1,
      "holderName": "John Doe",
      "ticketCode": "ABCD-1234-EFGH-567890",
      "status": "unused"
    },
    {
      "id": 2,
      "holderName": "Jane Smith",
      "ticketCode": "IJKL-9012-MNOP-345678",
      "status": "unused"
    }
  ]
}
```

**Error Response (404)**
```json
{
  "status": "fail",
  "message": "Booking not found"
}
```

---

### 🎟️ Tickets

#### 17. Get All Tickets
```http
GET /tickets
```

**Success Response (200)**
```json
[
  {
    "id": 1,
    "bookingId": 1,
    "holderName": "John Doe",
    "ticketCode": "ABCD-1234-EFGH-567890",
    "status": "unused",
    "createdAt": "2025-01-09T12:00:00.000Z",
    "updatedAt": "2025-01-09T12:00:00.000Z"
  },
  {
    "id": 2,
    "bookingId": 1,
    "holderName": "Jane Smith",
    "ticketCode": "IJKL-9012-MNOP-345678",
    "status": "unused",
    "createdAt": "2025-01-09T12:00:00.000Z",
    "updatedAt": "2025-01-09T12:00:00.000Z"
  }
]
```

#### 18. Get Ticket By ID
```http
GET /tickets/:id
```

**Example:** `GET /tickets/1`

**Success Response (200)**
```json
{
  "id": 1,
  "bookingId": 1,
  "holderName": "John Doe",
  "ticketCode": "ABCD-1234-EFGH-567890",
  "status": "unused",
  "createdAt": "2025-01-09T12:00:00.000Z",
  "updatedAt": "2025-01-09T12:00:00.000Z"
}
```

**Error Response (404)**
```json
{
  "status": "fail",
  "message": "Ticket not found"
}
```

#### 19. Mark Ticket as Used
```http
PATCH /tickets/used/:id
```

**Example:** `PATCH /tickets/used/1`

**Success Response (200)**
```json
{
  "id": 1,
  "bookingId": 1,
  "holderName": "John Doe",
  "ticketCode": "ABCD-1234-EFGH-567890",
  "status": "used",
  "createdAt": "2025-01-09T12:00:00.000Z",
  "updatedAt": "2025-01-09T13:00:00.000Z"
}
```

**Error Response (400) - Already Used**
```json
{
  "status": "fail",
  "message": "Ticket has already been used"
}
```

---

## 🏗️ 8. Architecture & Security

### Architecture Flow

```
Client Request
      ↓
   Rate Limiter (express-rate-limit)
      ↓
   Router (Express)
      ↓
   Auth Middleware (JWT verification + role check)
      ↓
   Controller (HTTP handling)
      ↓
   Validation (Zod schema)
      ↓
   Service (Business Logic & Transaction)
      ↓
   Prisma ORM (with Row Locking)
      ↓
   MySQL Database
      ↓
   Response to Client
```

### Design Principles

1. **Separation of Concerns**
   - Router: Define routes & apply middleware
   - Controller: Handle HTTP request/response
   - Validation: Input validation with Zod
   - Service: Business logic & database operations
   - Middleware: Authentication, authorization, logging

2. **Security First**
   - JWT authentication for all protected routes
   - Role-based authorization (Customer vs Organizer)
   - Password hashing with bcrypt (10 rounds)
   - Rate limiting to prevent abuse
   - CORS configuration
   - Helmet security headers

3. **Data Consistency**
   - Database transaction for critical operations
   - Row-level locking to prevent race conditions
   - Input validation at every endpoint

---

## 🛡️ 9. Security Features

### 1. JWT Authentication
- Token-based authentication
- Token expires in 7 days (configurable)
- Payload contains: `id` and `role`
- Secret key stored in environment variable

### 2. Role-Based Authorization
**Customer can:**
- Create ticket bookings
- View their own bookings

**Organizer can:**
- Create new events
- Update their events
- Delete their events

**Implementation:**
```javascript
// Protect route (authentication required)
router.post("/bookings", protect, createBookingController);

// Authorize specific role
router.post("/events", protect, authorize("organizer"), createEventController);
```

### 3. Password Security
- Hashing with bcryptjs (salt rounds: 10)
- Passwords never stored in plain text
- Passwords never returned in API responses

### 4. Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| Global API | 100 requests | 15 minutes |
| `/login` | 5 requests | 15 minutes |
| `/bookings` | 10 requests | 5 minutes |

### 5. Input Validation
- All inputs validated with Zod schema
- Automatic type checking
- Email format validation
- Enum validation for role & status
- Date validation (must be future date for events)

### 6. CORS Configuration
- Whitelist specific origins from environment
- Credentials support
- Allowed methods: GET, POST, PATCH, DELETE

### 7. Error Handling
- Custom user-friendly error messages
- No internal error details exposed in production
- Consistent error response format

---

## 💼 10. Business Logic

### Real-Time Stock Validation

#### When Booking is Created
```javascript
// Service: bookingService.js
return await prisma.$transaction(async (tx) => {
  // Lock event row to prevent race conditions
  const event = await tx.$queryRawUnsafe(
    `SELECT * FROM event WHERE id_event = ? FOR UPDATE`,
    eventId
  );

  // Validate stock
  if (eventRow.available_seat < quantity) {
    throw new Error("Not enough seats available");
  }

  // Update availableSeat
  await tx.event.update({
    where: { id: eventId },
    data: {
      availableSeat: eventRow.available_seat - quantity,
      status: eventRow.available_seat - quantity === 0 
        ? "unavailable" 
        : eventRow.status
    }
  });

  // Create booking & tickets
  // ...
});
```

**Key Points:**
- ✅ **Row-level locking** with `FOR UPDATE` prevents race conditions
- ✅ **Transaction** ensures atomicity
- ✅ **Auto update status** event becomes "unavailable" when seats run out
- ✅ **Automatic rollback** if error occurs

### Event Status Management

**Event Status:**
- `available`: Seats available
- `unavailable`: Seats sold out or deleted by organizer

**Auto Status Update:**
- Status changes to "unavailable" if `availableSeat === 0`
- Status cannot be manually changed by organizer (system-controlled)

### Ticket Generation

**Ticket Code Format:**
```
ABCD-1234-EFGH-567890
```

- Random alphanumeric (A-Z, 0-9)
- Timestamp at the end for uniqueness
- Formatted with dash every 4 characters
- Unique constraint in database

**Holder Names:**
- Default: "Ticket 1", "Ticket 2", etc. if not provided
- Can be customized per ticket during booking

---

## 🧪 11. Testing with Postman

### Setup Postman Collection

1. Import collection: `postman/Ticket System API.postman_collection.json`
2. Collection includes auto-save token feature
3. Base URL variable: `{{base_url}}` = `http://localhost:5000`

### Recommended Testing Flow

#### Step 1: Login
```
POST /login
Body: { "email": "john@customer.com", "password": "password123" }
```
→ Token will be auto-saved to variable `customer_token`

```
POST /login
Body: { "email": "organizer@events.com", "password": "password123" }
```
→ Token will be auto-saved to variable `organizer_token`

#### Step 2: Create Event (as Organizer)
```
POST /events
Authorization: Bearer {{organizer_token}}
Body: {
  "title": "Test Event",
  "location": "Jakarta",
  "capacity": 100,
  "price": 50000,
  "date": "2026-12-31T19:00:00Z"
}
```

#### Step 3: Book Tickets (as Customer)
```
POST /bookings
Authorization: Bearer {{customer_token}}
Body: {
  "eventId": 1,
  "quantity": 2,
  "holders": ["John", "Jane"]
}
```

#### Step 4: Verify Stock Reduction
```
GET /events/1
```
→ Check `availableSeat` decreased by quantity

### Test Cases Coverage

✅ **Authentication:**
- Login with valid credentials
- Login with unregistered email
- Login with wrong password
- Rate limiting on login

✅ **Authorization:**
- Customer cannot create events
- Organizer cannot book tickets
- Non-owner cannot update/delete events

✅ **Booking Logic:**
- Booking with sufficient stock
- Booking with insufficient stock
- Booking on unavailable event
- Concurrent booking (test race conditions)
- Rate limiting on booking

✅ **Validation:**
- Invalid email format
- Password less than 8 characters
- Event date in the past
- Capacity less than 5
- Negative price
- Invalid ID (non-integer)

---

## 🛠️ 12. Troubleshooting

### Problem: Error "Access denied for user 'root'@'localhost'"

**Solution:**
```bash
# Login to MySQL
mysql -u root -p

# Update password
ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_new_password';
FLUSH PRIVILEGES;

# Update DATABASE_URL in .env
DATABASE_URL="mysql://root:your_new_password@localhost:3306/ticket_system"
```

### Problem: Error "connect ECONNREFUSED 127.0.0.1:3306"

**Solution:**
```bash
# Check if MySQL service is running
# Windows
net start MySQL80

# macOS/Linux
sudo systemctl start mysql
# or
sudo service mysql start
```

### Problem: JWT Token Invalid/Expired

**Solution:**
- Token expires in 7 days (default)
- Request new token through `/login`
- Ensure `JWT_SECRET` in `.env` matches the one used to generate token

### Problem: "Not authenticated, token not found"

**Solution:**
- Ensure header `Authorization: Bearer <token>` is sent
- Check header format (space after "Bearer")
- Token must be valid and not expired

### Problem: "Access denied, user role does not match"

**Solution:**
- Customer cannot access organizer endpoints
- Organizer cannot access customer endpoints
- Login with user matching the endpoint's role requirement

### Problem: Port 5000 already in use

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Or change port in .env
SERVER_PORT=5001
```

### Problem: Prisma Client Error

**Solution:**
```bash
# Regenerate Prisma Client
npm run db:generate

# Reset database
npm run db:reset
```

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE `user` (
  `id_user` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `role` ENUM('customer', 'organizer') NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Events Table
```sql
CREATE TABLE `event` (
  `id_event` INT PRIMARY KEY AUTO_INCREMENT,
  `organizer_id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `capacity` INT NOT NULL,
  `available_seat` INT NOT NULL,
  `price` INT NOT NULL,
  `status` ENUM('available', 'unavailable') DEFAULT 'available',
  `date` DATETIME NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`organizer_id`) REFERENCES `user`(`id_user`)
);
```

### Bookings Table
```sql
CREATE TABLE `booking` (
  `id_booking` INT PRIMARY KEY AUTO_INCREMENT,
  `customer_id` INT NOT NULL,
  `event_id` INT NOT NULL,
  `total_price` INT NOT NULL,
  `quantity` INT NOT NULL,
  `status` ENUM('pending', 'success', 'failed') DEFAULT 'pending',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`customer_id`) REFERENCES `user`(`id_user`),
  FOREIGN KEY (`event_id`) REFERENCES `event`(`id_event`)
);
```

### Tickets Table
```sql
CREATE TABLE `ticket` (
  `id_ticket` INT PRIMARY KEY AUTO_INCREMENT,
  `booking_id` INT NOT NULL,
  `holder_name` VARCHAR(100) NOT NULL,
  `ticket_code` VARCHAR(50) UNIQUE NOT NULL,
  `status` ENUM('unused', 'used') DEFAULT 'unused',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`booking_id`) REFERENCES `booking`(`id_booking`)
);
```

### Relationships
```
User (1) ─── (N) Event
User (1) ─── (N) Booking
Event (1) ─── (N) Booking
Booking (1) ─── (N) Ticket
```

---

## 📝 API Summary Table

| # | Method | Endpoint | Auth | Role | Description |
|---|--------|----------|------|------|-------------|
| 1 | GET | `/health` | ❌ | - | Health check |
| 2 | GET | `/` | ❌ | - | API root info |
| 3 | POST | `/login` | ❌ | - | Login user |
| 4 | POST | `/users` | ❌ | - | Register user |
| 5 | GET | `/users` | ❌ | - | Get all users |
| 6 | GET | `/users/:id` | ❌ | - | Get user by ID |
| 7 | PATCH | `/users/:id` | ❌ | - | Update user |
| 8 | DELETE | `/users/:id` | ❌ | - | Delete user |
| 9 | POST | `/events` | ✅ | Organizer | Create event |
| 10 | GET | `/events` | ❌ | - | Get all events |
| 11 | GET | `/events/:id` | ❌ | - | Get event by ID |
| 12 | PATCH | `/events/:id` | ✅ | Organizer | Update event |
| 13 | DELETE | `/events/:id` | ✅ | Organizer | Delete event |
| 14 | POST | `/bookings` | ✅ | Customer | Create booking |
| 15 | GET | `/bookings` | ✅ | Any | Get all bookings |
| 16 | GET | `/bookings/:id` | ✅ | Any | Get booking by ID |
| 17 | GET | `/tickets` | ❌ | - | Get all tickets |
| 18 | GET | `/tickets/:id` | ❌ | - | Get ticket by ID |
| 19 | PATCH | `/tickets/used/:id` | ❌ | - | Mark ticket as used |

---

## 🎯 Requirements Compliance

### ✅ "Secure the Crowd!" Requirements

#### 1. Framework Implementation
- ✅ Using **Express.js** framework
- ✅ **Prisma ORM** for database management
- ✅ Clean architecture with separation of concerns

#### 2. Authentication & Authorization
- ✅ **JWT Authentication** for logged-in users
- ✅ **Role-based Authorization**:
  - Customer: can only book tickets
  - Organizer: can only create/update/delete events
- ✅ Protected routes with middleware

#### 3. Real-Time Stock Validation
- ✅ **Database Transaction** for atomicity
- ✅ **Row-Level Locking** (`FOR UPDATE`) to prevent race conditions
- ✅ Stock validation prevents negative values
- ✅ Auto update event status

#### 4. Input Validation
- ✅ **Zod** schema validation at all endpoints
- ✅ Type checking, format validation, business rule validation
- ✅ Consistent error response format

#### 5. Documentation
- ✅ **Complete README.md** with:
  - API endpoints documentation
  - Request/Response examples
  - Success & error scenarios
  - Authentication flow
  - Database schema
- ✅ **Postman Collection** included
- ✅ Code structure documentation

---

## 🧾 Conclusion

This documentation provides a complete guide for using the Ticket System API with focus on security, validation, and data consistency.

This system has implemented:
- ✅ JWT Authentication & Role-based Authorization
- ✅ Real-time stock validation with database locking
- ✅ Comprehensive input validation
- ✅ Clean & maintainable code structure
- ✅ Proper error handling
- ✅ Rate limiting for security
- ✅ Complete API documentation

### Tech Stack Summary
- **Runtime**: Node.js 18+
- **Framework**: Express.js 5.x
- **ORM**: Prisma 6.x
- **Database**: MySQL 8.0
- **Authentication**: JWT + bcryptjs
- **Validation**: Zod
- **Security**: Helmet, CORS, Rate Limiting

---

**- Wahyu Pratama**
