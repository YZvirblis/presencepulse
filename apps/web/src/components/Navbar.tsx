"use client";
import { useState } from "react";
import Link from "next/link";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineAnalytics } from "react-icons/md";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <>
      <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          PresencePulse
        </Link>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {/* Dashboard Button */}
              <Link
                href="/dashboard"
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                <MdOutlineAnalytics className="text-lg" />
                <span>Dashboard</span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
              >
                <FaSignOutAlt className="text-lg" />
                <span>Logout ({user?.name})</span>
              </button>
            </div>
          ) : (
            // Login Button
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              <FaSignInAlt className="text-lg" />
              <span>Login</span>
            </button>
          )}
        </div>
      </nav>

      {/* Authentication Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
