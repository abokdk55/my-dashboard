import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { getProjectDetail } from "@/lib/dashboard-data";
import PrioritySelector from "@/components/PrioritySelector";
import StepChecklist from "@/components/StepChecklist";
import CompletedToggle from "@/components/CompletedToggle";
import ManualFallback from "@/components/ManualFallback";

const REQUIRE_LOGIN = process.env.REQUIRE_LOGIN === "true";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (REQUIRE_LOGIN && !(await isAuthenticated())) {
    redirect("/login");
  }

  const { id } = await params;
  const detail = await getProjectDetail(id);
  if (!detail) notFound();

  const { project, group, steps } = detail;

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] px-4 py-8 sm:px-8">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
        <Link href="/" className="text-sm text-indigo-600 hover:text-indigo-700">
          ← 대시보드로
        </Link>

        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <p className="text-xs text-slate-400">{group.name}</p>
          <h1 className="mt-1 text-xl font-semibold text-slate-900">{project.name}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <PrioritySelector projectId={project.id} priority={project.priority} />
            <CompletedToggle projectId={project.id} completed={project.completed_override} />
          </div>

          <div className="mt-4 flex items-center gap-3">
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

          <StepChecklist projectId={project.id} steps={steps} />

          {steps.length === 0 && (
            <ManualFallback
              projectId={project.id}
              progress={project.progress}
              nextAction={project.next_action}
            />
          )}
        </div>
      </div>
    </div>
  );
}
