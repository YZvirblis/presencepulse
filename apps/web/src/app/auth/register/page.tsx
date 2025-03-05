"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }

      const { token } = await res.json();
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold text-primary">Register</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input className="block w-full p-3 border rounded" type="text" name="name" placeholder="Name" required onChange={handleChange} />
        <input className="block w-full p-3 border rounded" type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input className="block w-full p-3 border rounded" type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit" className="btn btn-primary w-full">Register</button>
      </form>
    </div>
  );
}
