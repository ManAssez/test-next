"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { LogOut, User } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">irislab</h1>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{user.name}</span>
            </div>
            <button
              className="w-full rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700 transition flex items-center"
              onClick={() => {
                logout();
                window.location.href = "/";
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </button>
          </>
        ) : (
          <Link href="/">
            <button className="w-full rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700 transition">
              Connexion
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}
