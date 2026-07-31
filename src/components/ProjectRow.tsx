import Link from "next/link";
import type { Project } from "@/lib/dashboard-data";
import PriorityBadge from "@/components/PriorityBadge";

export default function ProjectRow({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="block border-t border-slate-50 pt-4 first:border-0 first:pt-0"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-slate-800 hover:text-indigo-600">{project.name}</p>
        <PriorityBadge priority={project.priority} />
      </div>

      <div className="mt-2 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-indigo-500"
            style={{ width: `${project.effectiveProgress}%` }}
          />
        </div>
        <span className="w-10 shrink-0 text-right text-xs font-medium text-slate-500">
          {project.effectiveProgress}%
        </span>
      </div>

      <p className="mt-2 text-xs text-slate-500">
        <span className="font-medium text-slate-600">다음 액션 · </span>
        {project.effectiveNextAction}
      </p>
    </Link>
  );
}
