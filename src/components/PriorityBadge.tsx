import type { Priority } from "@/lib/work-data";

const styles: Record<Priority, string> = {
  상: "bg-rose-50 text-rose-700 ring-rose-200",
  중: "bg-amber-50 text-amber-700 ring-amber-200",
  하: "bg-slate-100 text-slate-600 ring-slate-200",
};

export default function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[priority]}`}
    >
      우선순위 {priority}
    </span>
  );
}
