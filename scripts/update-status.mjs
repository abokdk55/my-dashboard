import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";

function loadEnvLocal() {
  const content = readFileSync(new URL("../.env.local", import.meta.url), "utf-8");
  for (const line of content.split("\n")) {
    const match = line.match(/^([A-Z0-9_]+)="?(.*?)"?$/);
    if (match) process.env[match[1]] ??= match[2];
  }
}
loadEnvLocal();

const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const updates = [
  {
    match: "영일세무회계 홈페이지",
    progress: 100,
    priority: "하",
    next_action: "완성 상태 — 유지보수 요청 들어오면 그때그때 수정 대응",
  },
  {
    match: "선한이웃노인복지센터 홈페이지",
    progress: 100,
    priority: "하",
    next_action: "완성 상태 — 유지보수 요청 들어오면 그때그때 수정 대응",
  },
  {
    match: "관세뉴스 수집·요약 파이프라인",
    progress: 90,
    priority: "중",
    next_action: "거의 완료 — 후보 URL 자동검색 등 세부 다듬기만 남음",
  },
  {
    match: "정부지원사업 모니터링",
    progress: 90,
    priority: "중",
    next_action: "완성 상태 — 예약 자동 실행 등 일부 개선 여지만 남음",
  },
  {
    match: "관세뉴스 → 지식비서 자동 연동",
    progress: 0,
    priority: "상",
    next_action: "요약 뉴스를 지식비서 검색 데이터에 자동으로 넣는 방법 설계 — 당면 자동화 과제",
  },
  {
    match: "관세뉴스 → 블로그 자동 게시",
    progress: 0,
    priority: "상",
    next_action: "블로그 '관세' 폴더 구조부터 만들고 게시 자동화 설계 — 당면 자동화 과제",
  },
  {
    match: "관세 지식비서 기능 확장",
    progress: 30,
    priority: "하",
    next_action: "아직 갈 길 멀어 — 해외 국가별 관세율 데이터 연동부터",
  },
  {
    match: "숏폼·롱폼 기획 템플릿화",
    progress: 20,
    priority: "상",
    next_action: "기존 로직을 그대로 쓸지 업그레이드할지 고민 중 — 가능하면 업그레이드 진행",
  },
  {
    match: "플리채널 운영 자동화",
    progress: 5,
    priority: "하",
    next_action: "음원 저작권(로열티프리) 확보 방법부터 정리",
  },
];

async function main() {
  for (const u of updates) {
    const { data, error } = await db
      .from("dashboard_projects")
      .update({ progress: u.progress, priority: u.priority, next_action: u.next_action })
      .ilike("name", `%${u.match}%`)
      .select();
    if (error) throw error;
    console.log(u.match, "->", data.map((d) => d.name));
  }
  console.log("전체 업데이트 완료");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
