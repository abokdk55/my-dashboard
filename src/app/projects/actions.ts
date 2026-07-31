"use server";

import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Priority } from "@/lib/dashboard-data";

const REQUIRE_LOGIN = process.env.REQUIRE_LOGIN === "true";

async function assertAllowed() {
  if (REQUIRE_LOGIN && !(await isAuthenticated())) {
    throw new Error("로그인이 필요합니다.");
  }
}

function refresh(projectId: string) {
  revalidatePath("/");
  revalidatePath(`/projects/${projectId}`);
}

export async function addStep(projectId: string, title: string) {
  await assertAllowed();
  if (!title.trim()) return;

  const db = supabaseAdmin();
  const { data: existing } = await db
    .from("dashboard_steps")
    .select("sort_order")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: false })
    .limit(1);

  const nextOrder = (existing?.[0]?.sort_order ?? 0) + 1;

  const { error } = await db
    .from("dashboard_steps")
    .insert({ project_id: projectId, title: title.trim(), sort_order: nextOrder });
  if (error) throw error;

  refresh(projectId);
}

export async function toggleStep(stepId: string, projectId: string, done: boolean) {
  await assertAllowed();
  const db = supabaseAdmin();
  const { error } = await db.from("dashboard_steps").update({ done }).eq("id", stepId);
  if (error) throw error;
  refresh(projectId);
}

export async function deleteStep(stepId: string, projectId: string) {
  await assertAllowed();
  const db = supabaseAdmin();
  const { error } = await db.from("dashboard_steps").delete().eq("id", stepId);
  if (error) throw error;
  refresh(projectId);
}

export async function setCompleted(projectId: string, completed: boolean) {
  await assertAllowed();
  const db = supabaseAdmin();
  const { error } = await db
    .from("dashboard_projects")
    .update({ completed_override: completed, updated_at: new Date().toISOString() })
    .eq("id", projectId);
  if (error) throw error;
  refresh(projectId);
}

export async function updatePriority(projectId: string, priority: Priority) {
  await assertAllowed();
  const db = supabaseAdmin();
  const { error } = await db
    .from("dashboard_projects")
    .update({ priority, updated_at: new Date().toISOString() })
    .eq("id", projectId);
  if (error) throw error;
  refresh(projectId);
}

export async function updateManualFallback(
  projectId: string,
  progress: number,
  nextAction: string
) {
  await assertAllowed();
  if (Number.isNaN(progress) || progress < 0 || progress > 100) return;

  const db = supabaseAdmin();
  const { error } = await db
    .from("dashboard_projects")
    .update({ progress, next_action: nextAction, updated_at: new Date().toISOString() })
    .eq("id", projectId);
  if (error) throw error;
  refresh(projectId);
}
