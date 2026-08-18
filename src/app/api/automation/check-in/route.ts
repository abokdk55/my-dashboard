import crypto from "crypto";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isAuthorized(request: Request): boolean {
  const expected = process.env.AUTOMATION_API_KEY;
  if (!expected) return false;

  const header = request.headers.get("authorization") ?? "";
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) return false;

  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json({ error: "인증에 실패했습니다." }, { status: 401 });
  }

  let body: {
    project?: string;
    title?: string;
    url?: string;
    progress?: number;
    next_action?: string;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "잘못된 JSON 본문입니다." }, { status: 400 });
  }

  const { project, title, url, progress, next_action } = body;
  if (!project) {
    return Response.json({ error: "project 값이 필요합니다." }, { status: 400 });
  }
  if (!title && progress === undefined) {
    return Response.json(
      { error: "title(자동 게시 이력) 또는 progress(진행률) 중 하나는 있어야 합니다." },
      { status: 400 }
    );
  }
  if (progress !== undefined && (typeof progress !== "number" || progress < 0 || progress > 100)) {
    return Response.json({ error: "progress는 0~100 사이 숫자여야 합니다." }, { status: 400 });
  }

  const db = supabaseAdmin();

  const projectRes = UUID_RE.test(project)
    ? await db.from("dashboard_projects").select("id, name").eq("id", project).limit(2)
    : await db.from("dashboard_projects").select("id, name").ilike("name", `%${project}%`).limit(2);

  if (projectRes.error) {
    return Response.json({ error: "프로젝트 조회 중 오류가 발생했습니다." }, { status: 500 });
  }
  const matches = projectRes.data ?? [];
  if (matches.length === 0) {
    return Response.json({ error: `"${project}"와 일치하는 프로젝트를 찾지 못했습니다.` }, { status: 404 });
  }
  if (matches.length > 1) {
    return Response.json(
      { error: "이름이 여러 프로젝트와 일치합니다. 더 구체적으로 지정해줘.", candidates: matches.map((m) => m.name) },
      { status: 409 }
    );
  }
  const projectId = matches[0].id;
  const now = new Date().toISOString();

  let activityId: string | null = null;
  if (title) {
    const { data, error } = await db
      .from("dashboard_project_activity")
      .insert({ project_id: projectId, title, url: url ?? null, published_at: now })
      .select("id")
      .single();
    if (error) return Response.json({ error: "자동 게시 이력 저장 중 오류가 발생했습니다." }, { status: 500 });
    activityId = data.id;
  }

  const projectUpdate: Record<string, unknown> = { last_auto_check_at: now };
  if (progress !== undefined) {
    projectUpdate.progress = progress;
    projectUpdate.updated_at = now;
    if (next_action !== undefined) projectUpdate.next_action = next_action;
  }
  const { error: updateError } = await db.from("dashboard_projects").update(projectUpdate).eq("id", projectId);
  if (updateError) {
    return Response.json({ error: "프로젝트 갱신 중 오류가 발생했습니다." }, { status: 500 });
  }

  revalidatePath("/");
  revalidatePath(`/projects/${projectId}`);

  return Response.json({ ok: true, project_id: projectId, activity_id: activityId });
}
