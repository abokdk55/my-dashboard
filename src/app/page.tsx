import { redirect } from "next/navigation";
import TodayDate from "@/components/TodayDate";
import StatCard from "@/components/StatCard";
import TopActions from "@/components/TopActions";
import AutomationChart from "@/components/AutomationChart";
import BusinessGroupCard from "@/components/BusinessGroupCard";
import ContentHistory from "@/components/ContentHistory";
import { isAuthenticated } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard-data";
import { logout } from "@/app/actions";

const REQUIRE_LOGIN = process.env.REQUIRE_LOGIN === "true";

export default async function Home() {
  if (REQUIRE_LOGIN && !(await isAuthenticated())) {
    redirect("/login");
  }

  const { businessGroups, allProjects, topActions, contentHistory, summaryStats } =
    await getDashboardData();

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] px-4 py-8 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">업무 자동화 현황</h1>
            <TodayDate />
          </div>
          {REQUIRE_LOGIN && (
            <form action={logout}>
              <button
                type="submit"
                className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm ring-1 ring-slate-100 hover:text-slate-700"
              >
                로그아웃
              </button>
            </form>
          )}
        </header>

        <section>
          <TopActions actions={topActions} />
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </section>

        <section>
          <AutomationChart projects={allProjects} />
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {businessGroups.map((group) => (
            <BusinessGroupCard key={group.id} {...group} />
          ))}
        </section>

        <section>
          <ContentHistory items={contentHistory} />
        </section>
      </div>
    </div>
  );
}
