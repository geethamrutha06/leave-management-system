# 🏢 Leave Management System

![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-green?style=flat-square&logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=flat-square&logo=mysql)
![JWT](https://img.shields.io/badge/Auth-JWT-purple?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

A **full-stack Leave Management System** built with Spring Boot and React. Employees can apply for leaves and track status. Admins can manage all requests with a rich dashboard and Chart.js analytics.

---

## 🌐 Live Demo

| Service  | URL |
|----------|-----|
| Frontend | https://leave-management-frontend.vercel.app |
| Backend  | https://leave-management-api.onrender.com |

**Demo Credentials:**

| Role     | Email                 | Password |
|----------|-----------------------|----------|
| Admin    | admin@company.com     | admin123 |
| Employee | ravi@company.com      | emp123   |

---

## ✨ Features

### 🔐 Authentication
- JWT-based login/register
- BCrypt password hashing
- Role-based access control (Employee / Admin)
- Protected routes on frontend

### 👤 Employee Features
- Personal dashboard with leave balance
- Apply for leave (Casual, Sick, Annual, Maternity, Unpaid)
- View full leave history with status
- Filter leaves by status
- Update profile (name, phone, department, position)

### 🛡️ Admin Features
- Dashboard with Chart.js analytics (Doughnut + Bar charts)
- View all employees with search
- View all leave requests with filter by status
- Approve / Reject with comment modal
- Real-time stats (Total, Pending, Approved, Rejected)

---

## 🏗️ Architecture

```
Browser (React + Vite)
        │  HTTP/HTTPS (Axios)
        ▼
Spring Boot REST API (Port 8080)
   ├── Spring Security (JWT Filter)
   ├── Controllers → Services → Repositories
        │  JPA/Hibernate
        ▼
     MySQL Database
```

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18, Vite, React Router v6   |
| UI         | Bootstrap 5, Chart.js             |
| HTTP       | Axios                             |
| Backend    | Spring Boot 3.2, Java 17          |
| Security   | Spring Security, JWT (JJWT)       |
| Database   | MySQL 8, JPA/Hibernate            |
| Build      | Maven                             |
| Deploy FE  | Vercel                            |
| Deploy BE  | Render                            |
| Deploy DB  | Railway / Neon                    |

---

## 📁 Project Structure

```
leave-management-system/
├── backend/
│   ├── src/main/java/com/lms/
│   │   ├── LeaveManagementApplication.java
│   │   ├── config/       SecurityConfig.java
│   │   ├── controller/   AuthController, AdminController, EmployeeController
│   │   ├── dto/          LoginRequest, RegisterRequest, AuthResponse, UserDTO,
│   │   │                 LeaveRequestDTO, ApplyLeaveRequest, ReviewLeaveRequest,
│   │   │                 UpdateProfileRequest, DashboardStats
│   │   ├── entity/       User, LeaveRequest
│   │   ├── exception/    GlobalExceptionHandler
│   │   ├── repository/   UserRepository, LeaveRequestRepository
│   │   ├── security/     JwtUtil, JwtAuthFilter
│   │   └── service/      AuthService, UserService, LeaveService
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── application-prod.properties
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/
│   ├── public/           favicon.svg
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── components/
│   │   │   ├── common/   ProtectedRoute, Spinner
│   │   │   └── layout/   Sidebar, Layout
│   │   ├── context/      AuthContext
│   │   ├── pages/
│   │   │   ├── Login, Register
│   │   │   ├── employee/ Dashboard, Profile, ApplyLeave, MyLeaves
│   │   │   └── admin/    AdminDashboard, Employees, AllLeaves
│   │   ├── services/     api.js
│   │   └── utils/        helpers.js
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
├── database/
│   ├── schema.sql        (MySQL)
│   └── neon_schema.sql   (PostgreSQL for Neon/Railway)
│
├── README.md
└── .gitignore
```

---

## 🚀 Local Setup (Without Installing Anything Extra)

### Backend
1. Open `backend/` in IntelliJ IDEA
2. Update `application.properties`:
   ```properties
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   ```
3. Run `schema.sql` in MySQL Workbench
4. Click Run → Tomcat starts at `http://localhost:8080`

### Frontend
```bash
cd frontend
npm install
npm run dev
# Opens at http://localhost:5173
```

---

## 🌍 Deployment Guide

### Step 1 — Database (Railway free MySQL)
1. Go to railway.app → New Project → Add MySQL
2. Copy the connection string
3. Set as `DB_URL` environment variable in Render

### Step 2 — Backend (Render)
1. Push `backend/` to GitHub repo
2. Go to render.com → New Web Service → Connect GitHub
3. Build: `mvn clean package -DskipTests`
4. Start: `java -jar -Dspring.profiles.active=prod target/leave-management-1.0.0.jar`
5. Add environment variables:
   ```
   DB_URL       = jdbc:mysql://your-railway-host/railway
   DB_USERNAME  = root
   DB_PASSWORD  = your-password
   JWT_SECRET   = LeaveManagementSystemSecretKey2025XyzAbc
   CORS_ORIGINS = https://your-app.vercel.app
   ```

### Step 3 — Frontend (Vercel)
1. Push `frontend/` to GitHub repo
2. Go to vercel.com → New Project → Import repo
3. Add environment variable:
   ```
   VITE_API_URL = https://your-backend.onrender.com/api
   ```
4. Deploy → get URL → update CORS_ORIGINS in Render

---

## 📡 API Documentation

### Auth Endpoints
| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| POST | /api/auth/register | None | Register employee |
| POST | /api/auth/login    | None | Login, get JWT    |

### Employee Endpoints
| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| GET  | /api/employee/profile       | Employee | Get profile      |
| PUT  | /api/employee/profile       | Employee | Update profile   |
| POST | /api/employee/leaves/apply  | Employee | Apply for leave  |
| GET  | /api/employee/leaves        | Employee | My leave history |

### Admin Endpoints
| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| GET | /api/admin/dashboard              | Admin | Stats + charts data |
| GET | /api/admin/employees              | Admin | All employees       |
| GET | /api/admin/employees/search?q=    | Admin | Search employees    |
| GET | /api/admin/leaves?status=         | Admin | All leave requests  |
| PUT | /api/admin/leaves/{id}/review     | Admin | Approve/Reject      |

---

## 🗄️ Database Schema

```sql
users              leave_requests
─────────────      ──────────────────────
id (PK)            id (PK)
name               user_id (FK → users.id)
email (UNIQUE)     leave_type
password           start_date
role               end_date
department         number_of_days
phone              reason
position           status
leave_balance      admin_comment
created_at         applied_date
updated_at         reviewed_date
                   reviewed_by (FK → users.id)
                   created_at
                   updated_at
```

---

## 📸 Screenshots

> Add screenshots to the `screenshots/` folder and link them here after deployment.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- Email: youremail@gmail.com

---


