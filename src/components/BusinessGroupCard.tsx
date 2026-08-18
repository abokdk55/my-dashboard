import type { BusinessGroup } from "@/lib/dashboard-data";
import ProjectCard from "@/components/ProjectCard";

export default function BusinessGroupCard({ name, description, projects }: BusinessGroup) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <p className="text-base font-semibold text-slate-900">{name}</p>
      <p className="mt-1 text-xs text-slate-400">{description}</p>

      <div className="mt-4 flex flex-wrap gap-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            priority={project.priority}
            nextAction={project.effectiveNextAction}
            progress={project.effectiveProgress}
            linkUrl={project.link_url}
          />
        ))}
      </div>
    </div>
  );
}
