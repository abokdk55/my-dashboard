import TodayDate from "@/components/TodayDate";
import StatCard from "@/components/StatCard";
import TopActions from "@/components/TopActions";
import AutomationChart from "@/components/AutomationChart";
import BusinessGroupCard from "@/components/BusinessGroupCard";
import ContentHistory from "@/components/ContentHistory";
import { summaryStats, businessGroups } from "@/lib/work-data";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#f8fafc] px-4 py-8 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header>
          <h1 className="text-2xl font-semibold text-slate-900">업무 자동화 현황</h1>
          <TodayDate />
        </header>

        <section>
          <TopActions />
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </section>

        <section>
          <AutomationChart />
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {businessGroups.map((group) => (
            <BusinessGroupCard key={group.name} {...group} />
          ))}
        </section>

        <section>
          <ContentHistory />
        </section>
      </div>
    </div>
  );
}
