import { DashboardHeader } from "@/components/DashboardHeader";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(131,76,252,0.14)),linear-gradient(180deg,_#fcfcff_0%,_#f4f6fb_100%)] p-6">
      {/* Header */}
      <div className="grid grid-cols-6 grid-rows-5 gap-6 h-full">
        <div className="row-span-5">
          <Sidebar />
        </div>
        <div className="col-span-5 row-span-5">
          <DashboardHeader userEmail={user.email || ""} />
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
