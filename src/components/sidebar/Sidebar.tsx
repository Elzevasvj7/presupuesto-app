"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type IconProps = {
  className?: string;
};

type SidebarLink = {
  name: string;
  href: string;
  description: string;
  icon: ({ className }: IconProps) => React.JSX.Element;
  disabled?: boolean;
};

const HomeIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    className={className}
  >
    <path d="M3 10.5 12 3l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.25 9.75V21h13.5V9.75" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.75 21v-6.75h4.5V21" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TransactionIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    className={className}
  >
    <path d="M7.5 7.5h10.75" strokeLinecap="round" />
    <path d="m15.75 4.5 3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.5 16.5H5.75" strokeLinecap="round" />
    <path d="m8.25 13.5-3 3 3 3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BudgetIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    className={className}
  >
    <path d="M4.5 6.75h15v10.5h-15z" strokeLinejoin="round" />
    <path d="M15.75 12a1.5 1.5 0 1 0 0.001 0" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.25 9.75h3.5" strokeLinecap="round" />
    <path d="M8.25 14.25h2.5" strokeLinecap="round" />
  </svg>
);

const SettingsIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    className={className}
  >
    <path
      d="M10.325 4.317a1 1 0 0 1 1.35-.936l.612.268a1 1 0 0 0 .804 0l.612-.268a1 1 0 0 1 1.35.936l.078.664a1 1 0 0 0 .497.754l.577.333a1 1 0 0 1 .366 1.366l-.334.577a1 1 0 0 0 0 .804l.334.577a1 1 0 0 1-.366 1.366l-.577.333a1 1 0 0 0-.497.754l-.078.664a1 1 0 0 1-1.35.936l-.612-.268a1 1 0 0 0-.804 0l-.612.268a1 1 0 0 1-1.35-.936l-.078-.664a1 1 0 0 0-.497-.754l-.577-.333a1 1 0 0 1-.366-1.366l.334-.577a1 1 0 0 0 0-.804l-.334-.577a1 1 0 0 1 .366-1.366l.577-.333a1 1 0 0 0 .497-.754l.078-.664Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const links: SidebarLink[] = [
  {
    name: "Dashboard",
    href: "/home",
    description: "Resumen general",
    icon: HomeIcon,
  },
  {
    name: "Transacciones",
    href: "/transactions",
    description: "Movimientos e historial",
    icon: TransactionIcon,
  },
  {
    name: "Presupuesto",
    href: "/budget",
    description: "Planificacion y control",
    icon: BudgetIcon,
  },
  {
    name: "Ajustes",
    href: "/settings",
    description: "Proximamente",
    icon: SettingsIcon,
    disabled: true,
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  const isActiveLink = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className="relative mb-6 h-full overflow-hidden rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_55px_rgba(88,76,170,0.14)] backdrop-blur-xl">
      
      <div className="relative flex h-full flex-col gap-8">
        <div className="rounded-[24px] bg-gradient-to-br from-violet-600 via-fuchsia-500 to-sky-400 p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-sm">
          <span className="inline-flex items-center rounded-full bg-white/18 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/90">
            Presupuesto App
          </span>
          <div className="mt-5">
            <p className="text-2xl font-semibold leading-tight">
              Tu control financiero, en un solo lugar.
            </p>
            <p className="mt-2 text-sm leading-6 text-white/78">
              Accede rapido a tus vistas principales y manten foco en ingresos, gastos y metas.
            </p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-3">
          {links.map((link) => {
            const isActive = !link.disabled && isActiveLink(link.href);
            const Icon = link.icon;
            const sharedClasses =
              "group flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-200";

            if (link.disabled) {
              return (
                <div
                  key={link.name}
                  className={`${sharedClasses} cursor-not-allowed border-slate-200/90 bg-slate-100/75 text-slate-400`}
                  aria-disabled="true"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/70 text-slate-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold">{link.name}</span>
                      <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Soon
                      </span>
                    </span>
                    <span className="mt-1 block text-xs text-slate-400">
                      {link.description}
                    </span>
                  </span>
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`${sharedClasses} ${
                  isActive
                    ? " bg-gradient-to-br from-violet-600 via-fuchsia-500 to-sky-400 text-white shadow-[0_14px_30px_rgba(110,85,220,0.28)]"
                    : "border-slate-200/80 bg-white/70 text-slate-700 hover:-translate-y-0.5 hover:border-violet-200 hover:bg-violet-50/80 hover:text-violet-700 hover:shadow-[0_10px_24px_rgba(110,85,220,0.12)]"
                }`}
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-colors ${
                    isActive
                      ? "bg-white/18 text-white"
                      : "bg-gradient-to-br from-violet-100 to-sky-100 text-violet-700 group-hover:text-violet-800"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">{link.name}</span>
                  <span
                    className={`mt-1 block text-xs ${
                      isActive ? "text-white/80" : "text-slate-500"
                    }`}
                  >
                    {link.description}
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="rounded-[24px] border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-sky-50 p-4 text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
            Enfoque del dia
          </p>
          <p className="mt-3 text-sm font-medium leading-6 text-slate-700">
            Revisa el flujo de caja y valida si tus gastos de hoy siguen dentro del presupuesto previsto.
          </p>
        </div>
      </div>
    </aside>
  );
};
