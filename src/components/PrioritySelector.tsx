"use client";

import { useTransition } from "react";
import { updatePriority } from "@/app/projects/actions";
import type { Priority } from "@/lib/dashboard-data";

export default function PrioritySelector({
  projectId,
  priority,
}: {
  projectId: string;
  priority: Priority;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={priority}
      disabled={isPending}
      onChange={(e) => startTransition(() => updatePriority(projectId, e.target.value as Priority))}
      className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
    >
      <option value="상">우선순위 상</option>
      <option value="중">우선순위 중</option>
      <option value="하">우선순위 하</option>
    </select>
  );
}
