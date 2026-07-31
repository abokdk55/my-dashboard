import type { BusinessGroup } from "@/lib/dashboard-data";
import ProjectRow from "@/components/ProjectRow";

export default function BusinessGroupCard({ name, description, projects }: BusinessGroup) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <p className="text-base font-semibold text-slate-900">{name}</p>
      <p className="mt-1 text-xs text-slate-400">{description}</p>

      <div className="mt-4 flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
