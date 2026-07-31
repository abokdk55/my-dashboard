import type { BusinessGroup } from "@/lib/work-data";
import PriorityBadge from "@/components/PriorityBadge";

export default function BusinessGroupCard({ name, description, projects }: BusinessGroup) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <p className="text-base font-semibold text-slate-900">{name}</p>
      <p className="mt-1 text-xs text-slate-400">{description}</p>

      <div className="mt-4 flex flex-col gap-4">
        {projects.map((project) => (
          <div key={project.name} className="border-t border-slate-50 pt-4 first:border-0 first:pt-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-medium text-slate-800">{project.name}</p>
              <PriorityBadge priority={project.priority} />
            </div>

            <div className="mt-2 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-indigo-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <span className="w-10 shrink-0 text-right text-xs font-medium text-slate-500">
                {project.progress}%
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-500">
              <span className="font-medium text-slate-600">다음 액션 · </span>
              {project.nextAction}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
