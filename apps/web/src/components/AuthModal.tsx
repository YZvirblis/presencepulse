"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authenticateUser, registerUser } from "@/utils/auth";
import { FaTimes, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState(""); // ✅ Added Name field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loginUser } = useAuth(); // ✅ use the new method
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "register") {
      if (!name.trim()) {
        setError("Name is required");
        return;
      }
      const success = await registerUser(name, email, password);
      if (success) {
        setMode("login"); // ✅ Switch to login after successful registration
        setError("");
      } else {
        setError("Registration failed. Try again.");
      }
    } else {
      const token = await authenticateUser(email, password);
      if (token) {
        localStorage.setItem("token", token);
        await loginUser(); // ✅ update context state
        onClose(); // Close modal after login
        router.push("/dashboard"); // Redirect to dashboard
      } else {
        setError("Invalid email or password");
      }
    }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{mode === "login" ? "Login" : "Register"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <FaTimes />
          </button>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-4">
          {mode === "register" && (
            <input
              type="text"
              placeholder="Full Name"
              className="border p-2 w-full rounded mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full rounded mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary w-full">
            {mode === "login" ? <FaSignInAlt className="inline-block mr-2" /> : <FaUserPlus className="inline-block mr-2" />}
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-3 text-center">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button className="text-primary hover:underline" onClick={() => setMode(mode === "login" ? "register" : "login")}>
            {mode === "login" ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
}
