import { DashboardOverview } from "@/components/DashboardOverview";
import { getBinanceBalanceSummary, getDashboardOverview } from "@/lib/actions";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [overview, binanceSummary] = await Promise.all([
    getDashboardOverview(),
    getBinanceBalanceSummary(),
  ]);

  return (
    <DashboardOverview
      userEmail={user.email || ""}
      overview={overview}
      binanceSummary={binanceSummary}
    />
  );
}

