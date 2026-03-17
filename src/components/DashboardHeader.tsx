"use client";
import React from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export const DashboardHeader = ({ userEmail }: { userEmail: string }) => {
  const router = useRouter();
  const supabase = createClient();

  const currentDate = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const initial = userEmail?.charAt(0).toUpperCase() || "U";

  return (
    <header className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <span className="text-5xl">💰</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Dashboard de Presupuesto
            </span>
          </h1>
          <p className="text-gray-600 ml-16">
            Gestiona tus finanzas de manera inteligente • {currentDate}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Usuario</p>
            <p className="font-semibold text-gray-800 text-sm max-w-[200px] truncate">
              {userEmail}
            </p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {initial}
          </div>
          <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
};
