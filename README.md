# Pro-Tasker Frontend

This is the frontend for **Pro-Tasker**, a full-stack task management application built with React. The app provides a modern, responsive user interface for managing tasks and collaborating with teams. It integrates seamlessly with the backend API and includes secure authentication, role-based dashboards, and project/task visualization.

---

## 🧩 Features

- 🔐 **User Authentication**: Sign up, log in, and secure session handling with JWTs.
- 📋 **Task Management**: Create, update, assign, and track tasks with status, priority, and deadlines.
- 📁 **Project Dashboard**: View project summaries, charts, and recently assigned tasks.
- 👥 **Team Collaboration**: Assign tasks to multiple users and view overall team progress.
- 📊 **Visual Insights**: Display charts for task status and priority using chart libraries.
- 📎 **Attachment Upload**: Upload images for profile customization and task context.
- 📱 **Responsive Design**: Optimized UI for desktop, tablet, and mobile views.
- 🧭 **Intuitive Navigation**: Sidebar and routing for easy access across the app.

---

## ⚙️ Tech Stack

- **React.js**
- **React Router DOM**
- **Tailwind CSS** (customized UI framework)
- **Axios** (API communication)
- **Context API** (global auth state management)
- **React Icons** (iconography)
- **Moment.js** (date formatting)
- **Chart.js / Recharts** (data visualization)
- **Vite** (build tool)
- **Render** (deployment platform)

---

## 🗂️ Folder Structure

/frontend
│
├── components/ # Reusable UI components (Cards, Tables, Forms)
│├── Cards/
│├── layouts/
│├── charts/
│
├── context/ # React Context for authentication and user data
│
├── hooks/ # Custom React hooks (e.g., useUserAuth)
│
├── pages/ # All route-level components (Login, Dashboard, etc.)
│
├── utils/ # Helper functions, API paths, axios instance
│
├── App.jsx # Main app component
├── main.jsx # ReactDOM render and router provider
└── index.css # Tailwind base styles

