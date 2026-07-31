"use client";

import { useActionState } from "react";
import { changePasswordAction, type ChangePasswordState } from "@/app/actions";

export default function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState<ChangePasswordState, FormData>(
    changePasswordAction,
    null
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label htmlFor="current_password" className="text-sm font-medium text-slate-700">
          현재 비밀번호
        </label>
        <input
          id="current_password"
          name="current_password"
          type="password"
          required
          autoFocus
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label htmlFor="new_password" className="text-sm font-medium text-slate-700">
          새 비밀번호
        </label>
        <input
          id="new_password"
          name="new_password"
          type="password"
          required
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label htmlFor="confirm_password" className="text-sm font-medium text-slate-700">
          새 비밀번호 확인
        </label>
        <input
          id="confirm_password"
          name="confirm_password"
          type="password"
          required
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {state && "error" in state && <p className="text-sm text-rose-600">{state.error}</p>}
      {state && "success" in state && (
        <p className="text-sm text-emerald-600">비밀번호가 바뀌었어. 다음 로그인부터 새 비밀번호를 써줘.</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
      >
        {pending ? "변경 중..." : "비밀번호 변경"}
      </button>
    </form>
  );
}
