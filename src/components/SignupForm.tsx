import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { PasswordInput } from "./ui/PasswordInput"; 

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signUp(email, password);
      alert("Account created successfully!");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <PasswordInput
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        // className="border p-2 w-full rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white p-2 rounded w-full"
      >
        Sign Up
      </button>
    </form>
  );
}
