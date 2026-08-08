# 🎓 LMS – Learning Management System

![image alt](https://github.com/Yelle-stack/lms-client/blob/0a194edf7c5430eea3450d768162ee58bd472331/lmsHome.png)

A modern **Learning Management System (LMS)** built with **React, Vite, and Tailwind CSS**. This project provides separate interfaces for students and educators, allowing users to browse courses, access course content, track enrollments, and manage educational content.

## ✨ Features

### 👨‍🎓 Student Area

* Browse and search available courses
* View detailed course information
* Explore course chapters and lectures
* Preview available lectures
* Watch course videos
* View course ratings and enrolled students
* Access enrolled courses
* Track learning content through the course player

### 👨‍🏫 Educator Area

* Educator dashboard
* Add and manage courses
* View existing courses
* Manage enrolled students
* Access educator-specific navigation and tools

### 🎨 User Interface

* Responsive design for desktop and mobile devices
* Modern UI built with Tailwind CSS
* Reusable React components
* Course cards, ratings, testimonials and call-to-action sections
* Responsive navigation for both students and educators

## 🛠️ Technologies

* **React**
* **JavaScript**
* **Vite**
* **Tailwind CSS**
* **React Router**
* **Context API**
* **YouTube Player**
* **Humanize Duration**

## 📁 Project Structure

```text
src/
├── assets/
│
├── components/
│   ├── educator/
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   │
│   └── student/
│       ├── CallToAction.jsx
│       ├── Companies.jsx
│       ├── CourseCard.jsx
│       ├── CoursesSection.jsx
│       ├── Footer.jsx
│       ├── Hero.jsx
│       ├── Loading.jsx
│       ├── Navbar.jsx
│       ├── Rating.jsx
│       ├── SearchBar.jsx
│       └── TestimonialSection.jsx
│
├── context/
│   └── AppContext.jsx
│
├── pages/
│   ├── educator/
│   │   ├── AddCourse.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Educator.jsx
│   │   ├── Mycourses.jsx
│   │   └── StudentsEnrolled.jsx
│   │
│   └── student/
│       ├── CourseDetails.jsx
│       ├── CoursesList.jsx
│       ├── Home.jsx
│       ├── MyEnrollments.jsx
│       └── Player.jsx
│
├── App.jsx
├── index.css
└── main.jsx
```

## 🧩 Architecture

The application is organized into reusable components and separate pages for each user role.

The **Context API** is used to manage shared application data, while **React Router** handles navigation between the different pages.

The project separates the **student** and **educator** interfaces, making the application easier to maintain and scale.

## 🚀 Getting Started

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Navigate to the project directory:

```bash
cd lms
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will then be available through the local development URL provided by Vite.

## 🎯 Purpose

This project was developed to practice building a complete React application with a structured component architecture, reusable UI components, responsive layouts, course management interfaces, and separate student and educator experiences.

---

**Built with ❤️ by Jelena Zekovic**
