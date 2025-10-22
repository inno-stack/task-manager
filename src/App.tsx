import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";



// Import your existing App logic as a separate component
import TodoApp from "./TodoApp"; // rename your full todo code into TodoApp.tsx

export default function App() {
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="p-8 bg-white rounded-xl shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
            Welcome to Task Manager
          </h1>
          <SignupForm />
          <p className="text-center text-slate-600 my-4">
            Already have an account?
          </p>
          <LoginForm />
        </div>
      </div>
    );
  }

  return <TodoApp />;
}
