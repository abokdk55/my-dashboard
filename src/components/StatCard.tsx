import type { SummaryStat } from "@/lib/dashboard-data";

export default function StatCard({ label, value, sublabel }: SummaryStat) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-400">{sublabel}</p>
    </div>
  );
}
