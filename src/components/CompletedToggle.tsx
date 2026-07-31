"use client";

import { useTransition } from "react";
import { setCompleted } from "@/app/projects/actions";

export default function CompletedToggle({
  projectId,
  completed,
}: {
  projectId: string;
  completed: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => setCompleted(projectId, !completed))}
      disabled={isPending}
      className={`rounded-lg px-3 py-1.5 text-xs font-medium disabled:opacity-60 ${
        completed
          ? "bg-emerald-600 text-white hover:bg-emerald-700"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }`}
    >
      {completed ? "완료 취소하기" : "완료로 표시"}
    </button>
  );
}
