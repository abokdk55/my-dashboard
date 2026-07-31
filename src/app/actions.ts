"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createSession,
  clearSession,
  isAuthenticated,
  verifyPassword,
  changePassword as changePasswordInStore,
} from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

export type LoginState = { error: string } | null;

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");

  let valid = false;
  try {
    valid = await verifyPassword(password);
  } catch {
    return { error: "서버 설정에 문제가 있어요. 관리자에게 문의해줘." };
  }

  if (!valid) {
    return { error: "비밀번호가 맞지 않아요." };
  }

  await createSession();
  redirect("/");
}

export async function logout() {
  await clearSession();
  redirect("/login");
}

export type UpdateProjectState = { error: string } | null;

export async function updateProjectAction(
  _prevState: UpdateProjectState,
  formData: FormData
): Promise<UpdateProjectState> {
  if (!(await isAuthenticated())) {
    return { error: "로그인이 필요합니다." };
  }

  const id = String(formData.get("id") ?? "");
  const progress = Number(formData.get("progress"));
  const priority = String(formData.get("priority") ?? "");
  const nextAction = String(formData.get("next_action") ?? "");

  if (!id || Number.isNaN(progress) || progress < 0 || progress > 100) {
    return { error: "입력값을 다시 확인해줘." };
  }
  if (!["상", "중", "하"].includes(priority)) {
    return { error: "우선순위 값이 올바르지 않아." };
  }

  const db = supabaseAdmin();
  const { error } = await db
    .from("dashboard_projects")
    .update({
      progress,
      priority,
      next_action: nextAction,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: "저장 중 문제가 생겼어. 잠시 후 다시 시도해줘." };

  revalidatePath("/");
  return null;
}

export type ChangePasswordState = { error: string } | { success: true } | null;

export async function changePasswordAction(
  _prevState: ChangePasswordState,
  formData: FormData
): Promise<ChangePasswordState> {
  if (!(await isAuthenticated())) {
    return { error: "로그인이 필요합니다." };
  }

  const currentPassword = String(formData.get("current_password") ?? "");
  const newPassword = String(formData.get("new_password") ?? "");
  const confirmPassword = String(formData.get("confirm_password") ?? "");

  let currentValid = false;
  try {
    currentValid = await verifyPassword(currentPassword);
  } catch {
    return { error: "서버 설정에 문제가 있어요. 관리자에게 문의해줘." };
  }

  if (!currentValid) {
    return { error: "현재 비밀번호가 맞지 않아요." };
  }
  if (newPassword.length < 4) {
    return { error: "새 비밀번호는 4자 이상으로 정해줘." };
  }
  if (newPassword !== confirmPassword) {
    return { error: "새 비밀번호 확인이 서로 달라." };
  }

  await changePasswordInStore(newPassword);
  return { success: true };
}
