import type { SummaryCardData } from "@/lib/dummy-data";

export default function SummaryCard({ label, value, change }: SummaryCardData) {
  const isPositive = change >= 0;

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
      <p
        className={`mt-1 text-sm font-medium ${
          isPositive ? "text-emerald-600" : "text-rose-600"
        }`}
      >
        {isPositive ? "+" : ""}
        {change}% 전월 대비
      </p>
    </div>
  );
}
