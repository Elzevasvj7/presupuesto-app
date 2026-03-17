"use client";
import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        console.log(error)
        setError(error.message);
      } else {
        setMessage("¡Cuenta creada! Revisa tu correo para confirmar tu cuenta.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        router.push("/");
        router.refresh();
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-6xl">💰</span>
          <h1 className="text-3xl font-bold mt-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Presupuesto App
          </h1>
          <p className="text-gray-600 mt-2">
            Gestiona tus finanzas de manera inteligente
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {isSignUp ? "Crear cuenta" : "Iniciar sesión"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="flex flex-col space-y-2">
              <span className="text-sm font-medium text-gray-700">
                Correo electrónico
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg text-black p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="tu@correo.com"
                required
              />
            </label>

            <label className="flex flex-col space-y-2">
              <span className="text-sm font-medium text-gray-700">
                Contraseña
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg text-black p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </label>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </p>
            )}

            {message && (
              <p className="text-green-600 text-sm bg-green-50 p-3 rounded-lg">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#834CFC] text-white py-3 px-4 rounded-lg hover:bg-[#6d3dd4] transition-colors disabled:opacity-50 font-semibold text-lg"
            >
              {loading
                ? "Cargando..."
                : isSignUp
                ? "Crear cuenta"
                : "Iniciar sesión"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
                setMessage(null);
              }}
              className="text-[#834CFC] hover:underline text-sm"
            >
              {isSignUp
                ? "¿Ya tienes cuenta? Inicia sesión"
                : "¿No tienes cuenta? Regístrate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}