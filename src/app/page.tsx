import { redirect } from "next/navigation";
import Link from "next/link";
import TodayDate from "@/components/TodayDate";
import StatCard from "@/components/StatCard";
import StatusBoard from "@/components/StatusBoard";
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

  const { businessGroups, allProjects, statusBoard, contentHistory, summaryStats } =
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
            <div className="flex items-center gap-2">
              <Link
                href="/change-password"
                className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm ring-1 ring-slate-100 hover:text-slate-700"
              >
                비밀번호 변경
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm ring-1 ring-slate-100 hover:text-slate-700"
                >
                  로그아웃
                </button>
              </form>
            </div>
          )}
        </header>

        <section>
          <StatusBoard columns={statusBoard} />
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </section>

        <section>
          <AutomationChart projects={allProjects} />
        </section>

        <section className="flex flex-col gap-4">
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
