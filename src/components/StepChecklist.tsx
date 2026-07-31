"use client";

import { useState, useTransition } from "react";
import { addStep, toggleStep, deleteStep } from "@/app/projects/actions";
import type { Step } from "@/lib/dashboard-data";

export default function StepChecklist({ projectId, steps }: { projectId: string; steps: Step[] }) {
  const [title, setTitle] = useState("");
  const [isPending, startTransition] = useTransition();

  return (
    <div className="mt-4">
      <p className="text-sm font-medium text-slate-700">자동화 단계</p>
      <ul className="mt-3 flex flex-col gap-2">
        {steps.map((step) => (
          <li key={step.id} className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
            <input
              type="checkbox"
              checked={step.done}
              onChange={() => startTransition(() => toggleStep(step.id, projectId, !step.done))}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-400"
            />
            <span
              className={`flex-1 text-sm ${
                step.done ? "text-slate-400 line-through" : "text-slate-700"
              }`}
            >
              {step.title}
            </span>
            <button
              onClick={() => startTransition(() => deleteStep(step.id, projectId))}
              className="text-xs text-slate-400 hover:text-rose-500"
            >
              삭제
            </button>
          </li>
        ))}
        {steps.length === 0 && (
          <li className="text-sm text-slate-400">아직 등록된 단계가 없어. 아래에서 추가해봐.</li>
        )}
      </ul>

      <form
        action={() => {
          if (!title.trim()) return;
          const value = title;
          setTitle("");
          startTransition(() => addStep(projectId, value));
        }}
        className="mt-3 flex gap-2"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="새 단계 입력"
          className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          추가
        </button>
      </form>
    </div>
  );
}
