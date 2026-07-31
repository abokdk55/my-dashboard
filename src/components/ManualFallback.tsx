"use client";

import { useState, useTransition } from "react";
import { updateManualFallback } from "@/app/projects/actions";

export default function ManualFallback({
  projectId,
  progress,
  nextAction,
}: {
  projectId: string;
  progress: number;
  nextAction: string;
}) {
  const [p, setP] = useState(progress);
  const [n, setN] = useState(nextAction);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="mt-4 rounded-lg bg-slate-50 p-3">
      <p className="text-xs text-slate-500">
        아직 단계가 없어서, 진행률과 다음 액션을 직접 입력해줘. 단계를 추가하면 그때부터는 자동으로 계산돼.
      </p>
      <div className="mt-2 flex flex-col gap-2">
        <label className="text-xs text-slate-500">
          진행률 (%)
          <input
            type="number"
            min={0}
            max={100}
            value={p}
            onChange={(e) => setP(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </label>
        <label className="text-xs text-slate-500">
          다음 액션
          <textarea
            value={n}
            onChange={(e) => setN(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </label>
        <button
          onClick={() => startTransition(() => updateManualFallback(projectId, p, n))}
          disabled={isPending}
          className="self-start rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          저장
        </button>
      </div>
    </div>
  );
}
