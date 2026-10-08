# UniConnect

UniConnect is a React and Spring Boot application that connects students with companies offering internships.

## Features

- Student and company registration/login with JWT authentication
- Student profile, education, and skills management
- Company profile management
- Internship creation, editing, browsing, and deletion
- Student applications and company-side application status updates

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

## Production check

```powershell
cd frontend
npm run lint
npm run build
```
