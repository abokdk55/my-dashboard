import "server-only";
import { supabaseAdmin } from "@/lib/supabase-admin";

export type Priority = "상" | "중" | "하";

export type Step = {
  id: string;
  project_id: string;
  title: string;
  done: boolean;
  sort_order: number;
};

export type Project = {
  id: string;
  group_id: string;
  name: string;
  progress: number;
  priority: Priority;
  next_action: string;
  completed_override: boolean;
  sort_order: number;
  effectiveProgress: number;
  effectiveNextAction: string;
};

export type BusinessGroup = {
  id: string;
  name: string;
  description: string;
  sort_order: number;
  projects: Project[];
};

export type StatusName = "운영중" | "진행중" | "계획단계";

export type BoardItem = {
  id: string;
  name: string;
  groupName: string;
  priority: Priority;
  nextAction: string;
  effectiveProgress: number;
};

export type StatusColumn = {
  status: StatusName;
  items: BoardItem[];
};

export type ContentItem = {
  id: string;
  title: string;
  status: string;
  sort_order: number;
};

export type SummaryStat = {
  label: string;
  value: string;
  sublabel: string;
};

export type DashboardData = {
  businessGroups: BusinessGroup[];
  allProjects: Project[];
  statusBoard: StatusColumn[];
  contentHistory: ContentItem[];
  summaryStats: SummaryStat[];
};

const PRIORITY_ORDER: Record<Priority, number> = { 상: 0, 중: 1, 하: 2 };

function statusOf(progress: number): StatusName {
  if (progress >= 80) return "운영중";
  if (progress >= 30) return "진행중";
  return "계획단계";
}

function computeEffective(
  project: { progress: number; next_action: string; completed_override: boolean },
  steps: Step[]
): { effectiveProgress: number; effectiveNextAction: string } {
  if (project.completed_override) {
    return { effectiveProgress: 100, effectiveNextAction: "완료됨" };
  }
  if (steps.length > 0) {
    const done = steps.filter((s) => s.done).length;
    const progress = Math.round((done / steps.length) * 100);
    const nextStep = steps.find((s) => !s.done);
    return {
      effectiveProgress: progress,
      effectiveNextAction: nextStep ? nextStep.title : "모든 단계 완료 — '완료로 표시'를 눌러줘",
    };
  }
  return { effectiveProgress: project.progress, effectiveNextAction: project.next_action };
}

export async function getDashboardData(): Promise<DashboardData> {
  const db = supabaseAdmin();

  const [groupsRes, projectsRes, stepsRes, contentRes] = await Promise.all([
    db.from("dashboard_business_groups").select("*").order("sort_order"),
    db.from("dashboard_projects").select("*").order("sort_order"),
    db.from("dashboard_steps").select("*").order("sort_order"),
    db.from("dashboard_content_history").select("*").order("sort_order"),
  ]);

  if (groupsRes.error) throw groupsRes.error;
  if (projectsRes.error) throw projectsRes.error;
  if (stepsRes.error) throw stepsRes.error;
  if (contentRes.error) throw contentRes.error;

  const allSteps = (stepsRes.data ?? []) as Step[];
  const groups = groupsRes.data ?? [];

  const allProjects: Project[] = (projectsRes.data ?? []).map((p) => {
    const steps = allSteps.filter((s) => s.project_id === p.id);
    return { ...p, ...computeEffective(p, steps) };
  });

  const businessGroups: BusinessGroup[] = groups.map((group) => ({
    ...group,
    projects: allProjects
      .filter((p) => p.group_id === group.id)
      .sort((a, b) => {
        const byPriority = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        if (byPriority !== 0) return byPriority;
        return a.sort_order - b.sort_order;
      }),
  }));

  const boardItems: BoardItem[] = allProjects.map((p) => {
    const group = groups.find((g) => g.id === p.group_id);
    return {
      id: p.id,
      name: p.name,
      groupName: group?.name ?? "",
      priority: p.priority,
      nextAction: p.effectiveNextAction,
      effectiveProgress: p.effectiveProgress,
    };
  });

  const byPriorityThenName = (a: BoardItem, b: BoardItem) => {
    const byPriority = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    if (byPriority !== 0) return byPriority;
    return a.name.localeCompare(b.name);
  };

  const statusBoard: StatusColumn[] = (["운영중", "진행중", "계획단계"] as const).map((status) => ({
    status,
    items: boardItems
      .filter((item) => statusOf(item.effectiveProgress) === status)
      .sort(byPriorityThenName),
  }));

  const completed = allProjects.filter((p) => p.effectiveProgress >= 80).length;
  const planning = allProjects.filter((p) => p.effectiveProgress < 30).length;
  const highPriority = allProjects.filter((p) => p.priority === "상").length;

  const summaryStats: SummaryStat[] = [
    { label: "전체 자동화 프로젝트", value: `${allProjects.length}개`, sublabel: "3개 사업에 걸쳐 진행 중" },
    { label: "운영 중 (80% 이상)", value: `${completed}개`, sublabel: "안정적으로 돌아가는 것들" },
    { label: "아직 계획 단계", value: `${planning}개`, sublabel: "30% 미만, 착수 전" },
    { label: "우선순위 '상'", value: `${highPriority}개`, sublabel: "먼저 손대야 할 일들" },
  ];

  return {
    businessGroups,
    allProjects,
    statusBoard,
    contentHistory: (contentRes.data ?? []) as ContentItem[],
    summaryStats,
  };
}

export type ProjectDetail = {
  project: Project;
  group: { id: string; name: string };
  steps: Step[];
};

export async function getProjectDetail(id: string): Promise<ProjectDetail | null> {
  const db = supabaseAdmin();

  const [projectRes, stepsRes] = await Promise.all([
    db.from("dashboard_projects").select("*").eq("id", id).single(),
    db.from("dashboard_steps").select("*").eq("project_id", id).order("sort_order"),
  ]);

  if (projectRes.error || !projectRes.data) return null;
  if (stepsRes.error) throw stepsRes.error;

  const steps = (stepsRes.data ?? []) as Step[];
  const project: Project = { ...projectRes.data, ...computeEffective(projectRes.data, steps) };

  const groupRes = await db
    .from("dashboard_business_groups")
    .select("id, name")
    .eq("id", project.group_id)
    .single();
  if (groupRes.error || !groupRes.data) return null;

  return { project, group: groupRes.data, steps };
}
