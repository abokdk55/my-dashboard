import LoginForm from "@/app/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#f8fafc] px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h1 className="text-lg font-semibold text-slate-900">업무 자동화 현황</h1>
        <p className="mt-1 text-sm text-slate-400">로그인하고 확인해줘</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
