import TodayDate from "@/components/TodayDate";
import SummaryCard from "@/components/SummaryCard";
import RevenueChart from "@/components/RevenueChart";
import OrdersTable from "@/components/OrdersTable";
import { summaryCards } from "@/lib/dummy-data";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#f8fafc] px-4 py-8 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header>
          <h1 className="text-2xl font-semibold text-slate-900">매출 대시보드</h1>
          <TodayDate />
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <SummaryCard key={card.label} {...card} />
          ))}
        </section>

        <section>
          <RevenueChart />
        </section>

        <section>
          <OrdersTable />
        </section>
      </div>
    </div>
  );
}
