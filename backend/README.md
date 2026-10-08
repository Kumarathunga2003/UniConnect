# UniConnect

UniConnect is a React and Spring Boot application that connects students with companies offering internships.

## Features

- Student and company registration/login with JWT authentication
- Student profile, education, and skills management
- Company profile management
- Internship creation, editing, browsing, and deletion
- Student applications and company-side application status updates
- PDF CV upload and company-side CV download
- Saved internships, advanced search, filters, sorting, and pagination
- Application status timelines and in-app notifications
- Student profile completion and dashboard analytics
- Full candidate profiles for company reviewers
- Account details, password changes, and account deactivation
- Administrator dashboard for user and internship moderation

## Requirements

- Java 24
- MySQL 8
- Node.js and npm

## 1. Database

Create a MySQL database named `uniconnect`. Hibernate creates and updates the tables automatically when the backend starts.

## 2. Environment variables (Windows PowerShell)

```powershell
[Environment]::SetEnvironmentVariable("DB_PASSWORD", "YOUR_MYSQL_PASSWORD", "User")
[Environment]::SetEnvironmentVariable("JWT_SECRET", "A_RANDOM_SECRET_WITH_AT_LEAST_48_CHARACTERS", "User")
```

Optional administrator account:

```powershell
[Environment]::SetEnvironmentVariable("ADMIN_EMAIL", "admin@uniconnect.lk", "User")
[Environment]::SetEnvironmentVariable("ADMIN_PASSWORD", "YOUR_SECURE_ADMIN_PASSWORD", "User")
```

The administrator is created automatically the next time the backend starts. Remove or change these example values before use.

Restart IntelliJ after setting them. Never commit the real values.

## 3. Backend

Open `backend` in IntelliJ, reload Maven, and run `BackendApplication`. It starts at `http://localhost:8080`.

Alternatively:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

## 4. Frontend

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. Register either a student or company account and sign in.

Uploaded CV files are saved under `backend/uploads/cvs`. This directory is excluded from Git.

## Production check

```powershell
cd frontend
npm run lint
npm run build
```
