"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const success = await login(email, password);
      if (success) {
        router.push("/blogs");
      } else {
        setError("Email ou mot de passe incorrect");
      }
    } catch (err) {
      setError("Une erreur est survenue lors de la connexion");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        {error && (
          <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700 transition"
          >
            Se connecter
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Utilisateur de test : <br />
          <strong>user@example.com</strong>
          <br />
          Mot de passe : <strong>password</strong>
        </div>
      </div>
    </div>
  );
}
