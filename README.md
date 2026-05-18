# Full Stack Blog Application

## Project Overview

This is a Full Stack Blog Application built using the MERN Stack.
The platform supports:

* User Authentication
* Role Based Authorization
* Article Creation & Management
* Article Reading
* Soft Delete & Restore Feature
* Author Dashboard
* User Dashboard
* Protected Routes
* JWT Authentication
* Zustand State Management
* React Hook Form Integration
* Responsive UI

The project is divided into:

1. Frontend (React + Vite)
2. Backend (Node.js + Express)
3. Database (MongoDB)

---

# Tech Stack

## Frontend

* React.js
* Vite
* React Router
* React Hook Form
* Axios
* Zustand
* Tailwind CSS
* React Hot Toast

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* cookie-parser
* dotenv
* cors

---

# Features

## Authentication

* Register User
* Login User
* Logout User
* JWT Token Authentication
* Role Based Access

---

## User Features

* View Articles
* Read Full Article
* Browse Categories
* Protected Routes

---

## Author Features

* Create Article
* Edit Article
* Delete Article
* Restore Article
* View Author Dashboard
* Manage Own Articles

---

## Article Features

* Dynamic Article Pages
* Date Formatting
* Soft Delete System
* Article Status Toggle
* Fetch Articles by ID

---

# Frontend Folder Structure

```bash
frontend/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── ArticleCard.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── AddArticle.jsx
│   │   ├── EditArticle.jsx
│   │   ├── ArticleByID.jsx
│   │   ├── AuthorProfile.jsx
│   │   └── UserProfile.jsx
│   │
│   ├── AuthStore/
│   │   └── AuthStore.js
│   │
│   ├── styles/
│   │   └── Common.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── package.json
└── vite.config.js
```

---

# Backend Folder Structure

```bash
backend/
│
├── controllers/
│   ├── userController.js
│   └── authorController.js
│
├── models/
│   ├── userModel.js
│   └── articleModel.js
│
├── middleware/
│   ├── verifyToken.js
│   └── errorHandler.js
│
├── routes/
│   ├── userRoutes.js
│   └── authorRoutes.js
│
├── config/
│   └── db.js
│
├── server.js
├── .env
├── package.json
└── README.md
```

---

# Frontend Explanation

## React Router

Used for client-side routing.

### Common Hooks

### useNavigate()

Used for navigation.

Example:

```javascript
navigate('/login')
```

---

### useParams()

Used to get URL parameters.

Example:

```javascript
const { id } = useParams();
```

---

### useLocation()

Used to access route state.

Example:

```javascript
const location = useLocation();
```

---

# Zustand State Management

Used for global authentication state.

Example:

```javascript
const user = userAuth((state) => state.currentUser)
```

Stored Data:

* Current User
* Login State
* Role Information

---

# React Hook Form

Used for handling forms efficiently.

## Features

* Validation
* Form State Management
* Easy Submission Handling
* Better Performance

Example:

```javascript
const { register, handleSubmit, setValue } = useForm();
```

---

## register()

Connects input fields.

```javascript
<input {...register("title")} />
```

---

## handleSubmit()

Handles form submission.

```javascript
<form onSubmit={handleSubmit(onCreateArticle)}>
```

---

## setValue()

Programmatically updates form values.

Used mainly in Edit Forms.

```javascript
setValue("title", article.title)
```

---

# Axios

Used for API communication.

## GET Request

```javascript
axios.get(url)
```

---

## POST Request

```javascript
axios.post(url, data)
```

---

## PATCH Request

```javascript
axios.patch(url, data)
```

---

# Authentication Flow

```text
User Login
    ↓
Backend verifies credentials
    ↓
JWT Token generated
    ↓
Cookie sent to frontend
    ↓
Protected routes accessible
```

---

# Backend Explanation

# Express Server

Main server file:

```javascript
server.js
```

Responsibilities:

* Start server
* Connect database
* Register routes
* Configure middleware

---

# MongoDB

Database used for storing:

* Users
* Articles
* Roles

---

# Mongoose Models

## User Model

Stores:

* Name
* Email
* Password
* Role

---

## Article Model

Stores:

* Title
* Content
* Category
* Author
* Article Status
* Timestamps

---

# JWT Authentication

JWT Token is generated after login.

Example:

```javascript
jwt.sign(payload, secretKey)
```

---

# bcryptjs

Used for password hashing.

```javascript
bcrypt.hash(password)
```

Password verification:

```javascript
bcrypt.compare(password, hashedPassword)
```

---

# Middleware

## verifyToken Middleware

Purpose:

* Verify JWT token
* Protect private routes

---

## Error Handler Middleware

Handles:

* Server errors
* API errors
* Invalid requests

---

# API Structure

## User APIs

### Register User

```http
POST /user-api/register
```

---

### Login User

```http
POST /user-api/login
```

---

### Get Article By ID

```http
GET /user-api/article/:id
```

---

# Author APIs

## Create Article

```http
POST /author-api/articles
```

---

## Edit Article

```http
PATCH /author-api/articles/:id
```

---

## Delete/Restore Article

```http
PATCH /author-api/articles/:id/status
```

---

# Soft Delete System

Instead of permanently deleting articles:

```javascript
isArticleActive = false
```

Benefits:

* Data recovery
* Safer operations
* Restore functionality

---

# Article Fetch Flow

```text
Open Article Page
       ↓
useEffect Runs
       ↓
Axios GET Request
       ↓
Backend Fetches Article
       ↓
Frontend Stores Data
       ↓
Article Displayed
```

---

# Edit Article Flow

```text
Open Edit Page
      ↓
Fetch Existing Data
      ↓
setValue() fills form
      ↓
User edits article
      ↓
PATCH request sent
      ↓
Database updated
```

---

# Delete Article Flow

```text
Click Delete
      ↓
window.confirm()
      ↓
User Confirms
      ↓
PATCH Request
      ↓
isArticleActive toggled
```

---

# Role Based Authorization

## USER Role

Can:

* Read Articles
* Browse Content

Cannot:

* Edit Articles
* Delete Articles

---

## AUTHOR Role

Can:

* Create Articles
* Edit Own Articles
* Delete Own Articles
* Restore Articles

---

# Environment Variables

## Frontend .env

```env
VITE_API_URL=http://localhost:3000
```

---

## Backend .env

```env
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

# Installation Guide

# Clone Repository

```bash
git clone <repository-url>
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Backend Setup

```bash
cd backend
npm install
npm run server
```

---

# Common Commands

## Install Packages

```bash
npm install
```

---

## Run Frontend

```bash
npm run dev
```

---

## Run Backend

```bash
npm start
```

---

# Important React Concepts Used

| Concept               | Purpose               |
| --------------------- | --------------------- |
| useState              | State management      |
| useEffect             | Side effects          |
| useNavigate           | Navigation            |
| useParams             | URL params            |
| useLocation           | Route state           |
| Conditional Rendering | Dynamic UI            |
| Optional Chaining     | Safe property access  |
| Ternary Operator      | Conditional values    |
| Logical AND           | Conditional rendering |

---

# Future Improvements

Possible future enhancements:

* Comments System
* Likes System
* Bookmark Feature
* Search Functionality
* Pagination
* Admin Dashboard
* Image Upload
* Rich Text Editor
* Email Verification
* Notifications
* Dark Mode
* AI Article Suggestions

---

# Learning Outcomes

This project helps understand:

* MERN Stack Development
* Authentication Systems
* REST APIs
* State Management
* Form Handling
* CRUD Operations
* Protected Routes
* Role Based Access
* Full Stack Architecture
* MongoDB Relationships
* API Integration

---

# Conclusion

This project is a complete MERN Stack Blog Platform implementing:

* Authentication
* Authorization
* Article Management
* Dynamic Routing
* Protected APIs
* React State Management
* RESTful Architecture

It is a strong beginner-to-intermediate level full stack project suitable for:

* Resume Projects
* Portfolio Building
* Full Stack Learning
* Backend API Practice
* React Ecosystem Understanding
