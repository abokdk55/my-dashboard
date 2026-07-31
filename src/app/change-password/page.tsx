import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import ChangePasswordForm from "@/app/change-password/ChangePasswordForm";

const REQUIRE_LOGIN = process.env.REQUIRE_LOGIN === "true";

export default async function ChangePasswordPage() {
  if (REQUIRE_LOGIN && !(await isAuthenticated())) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#f8fafc] px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <Link href="/" className="text-sm text-indigo-600 hover:text-indigo-700">
          ← 대시보드로
        </Link>
        <h1 className="mt-3 text-lg font-semibold text-slate-900">비밀번호 변경</h1>
        <div className="mt-6">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
