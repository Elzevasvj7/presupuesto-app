"use client";
import { useRouter } from "next/navigation";
import React from "react";

export const Sidebar = () => {
  const router = useRouter();
  const links = [
    { name: "Dashboard", href: "/home" },
    { name: "Transacciones", href: "/transactions" },
    { name: "Presupuesto", href: "/budget" },
    { name: "Ajustes", href: "/settings" },
  ];
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 h-full">
      <div className="flex flex-col gap-4 items-start">
        {links.map((link) => (
          <button key={link.name} onClick={() => router.push(link.href)}>
            {link.name}
          </button>
        ))}
      </div>
    </div>
  );
};
