# TaskFlow

TaskFlow is a full-stack task management application built using React, Spring Boot, and MySQL. It allows users to securely manage their daily tasks with user authentication, task tracking, analytics, and a responsive interface.

---

# Features

## User Authentication
- User Registration
- Secure Login
- BCrypt Password Encryption
- User-specific Task Management

## Task Management
- Add Tasks
- Edit Tasks
- Delete Tasks
- View All Tasks
- Mark Tasks as Completed
- Task Priority (High, Medium, Low)
- Task Status (Pending, In Progress, Completed)

## Dashboard
- Total Tasks
- Completed Tasks
- Pending Tasks
- In Progress Tasks

## Additional Features
- Calendar View
- Analytics Dashboard
- Responsive User Interface
- Toast Notifications
- Logout Functionality

---

# Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- React Hot Toast
- Lucide React

## Backend
- Spring Boot
- Spring Data JPA
- Spring Security
- REST APIs
- Maven

## Database
- MySQL

## Tools
- Visual Studio Code
- Git
- GitHub
- Postman

---

# Project Structure

```text
TaskFlow
│
├── Backend
│   ├── config
│   ├── controller
│   ├── dto
│   ├── entity
│   ├── repository
│   ├── service
│   └── resources
│
└── frontend
    ├── src
    │   ├── assets
    │   ├── components
    │   ├── layouts
    │   ├── pages
    │   └── services
    └── public
```

---

# Installation

## Clone the Repository

```bash
git clone https://github.com/bpkolte100-bit/TaskFlow.git
```

---

## Backend Setup

```bash
cd Backend
```

Configure MySQL in:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/taskflowdb
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Run the backend:

```bash
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Screenshots

Add screenshots of the application in this section.

- Login Page
- Register Page
- Dashboard
- My Tasks
- Add Task
- Calendar
- Analytics

---

# Future Enhancements

- JWT Authentication
- Email Notifications
- File Attachments
- Dark Mode
- Search and Filter Tasks
- Due Date Reminders
- Drag and Drop Task Board
- User Profile Management

---

# Developer

**Bhagyashree Kolte**

GitHub: https://github.com/bpkolte100-bit

---

# License

This project is developed for learning and portfolio purposes.
