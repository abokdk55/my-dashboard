import crypto from "crypto";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase-admin";

const COOKIE_NAME = "dashboard_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7일

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET 환경변수가 설정되어 있지 않습니다.");
  }
  return secret;
}

function sign(value: string): string {
  return crypto.createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

export async function createSession() {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = `admin.${expires}`;
  const token = `${payload}.${sign(payload)}`;

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

function isValidToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [prefix, expires, sig] = parts;
  const payload = `${prefix}.${expires}`;
  const expected = sign(payload);

  if (expected.length !== sig.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) return false;
  if (Date.now() > Number(expires)) return false;

  return true;
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return isValidToken(cookieStore.get(COOKIE_NAME)?.value);
}

function hashPassword(password: string, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { hash, salt };
}

function verifyAgainstHash(password: string, hash: string, salt: string): boolean {
  const attempt = crypto.scryptSync(password, salt, 64).toString("hex");
  const a = Buffer.from(attempt, "hex");
  const b = Buffer.from(hash, "hex");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function verifyPassword(input: string): Promise<boolean> {
  const db = supabaseAdmin();
  const { data } = await db
    .from("dashboard_admin_auth")
    .select("password_hash, password_salt")
    .eq("id", 1)
    .maybeSingle();

  if (data) {
    return verifyAgainstHash(input, data.password_hash, data.password_salt);
  }

  // 부트스트랩: 아직 비밀번호를 한 번도 바꾸지 않았을 때만 환경변수로 로그인 가능
  const expected = process.env.DASHBOARD_ADMIN_PASSWORD;
  if (!expected) {
    throw new Error("DASHBOARD_ADMIN_PASSWORD 환경변수가 설정되어 있지 않습니다.");
  }
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function changePassword(newPassword: string): Promise<void> {
  const { hash, salt } = hashPassword(newPassword);
  const db = supabaseAdmin();
  const { error } = await db
    .from("dashboard_admin_auth")
    .upsert({ id: 1, password_hash: hash, password_salt: salt, updated_at: new Date().toISOString() });
  if (error) throw error;
}
