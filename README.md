📝 My Todo App/Task-Manager
A full-featured, responsive, and offline-capable Todo App built with React, typescript, React Query, and Tailwind CSS. It includes advanced features like pagination, search/filtering, CRUD operations, error boundaries, and offline fallback.

🚀 Live Demo
🔗 View deployed app

📸 Screenshots
| Todo List with Filter & Pagination

✅ Features
📋 Todo Listing with pagination

🔍 Search and Filter by title and status

🔄 Create, Edit, Delete todos/task

🔗 Detail View with back navigation

🔒 Error Boundary and 404 handling

📶 Offline fallback using IndexedDB (Dexie)

♿ Accessible with ARIA labels and keyboard support

📱 Responsive UI styled with Tailwind CSS

⚙️ Clean and maintainable code structure

🧑‍💻 Tech Stack
React 18+

React Router DOM

React Query (@tanstack/react-query)

Tailwind CSS (utility-first styling)

Axios

Vite (fast dev/build)

Shadcn UI / custom components

📦 Project Structure
src/
├── api/ # API logic (fetch, create, update, delete)
├── components/ # Shared UI (buttons, cards, etc.)
├── features/
│ └── pages/ # TodoList, TodoDetail, NotFound, TestError
├── lib/ # IndexedDB config (Dexie)
├── routes/ # AppRoutes setup with React Router
├── App.tsx
└── main.tsx
