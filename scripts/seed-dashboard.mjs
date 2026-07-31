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

const groups = [
  {
    name: "큐스텀 (관세 스타트업)",
    description: "AI 기반 관세정보 플랫폼 — 본인 창업기업",
    sort_order: 1,
    projects: [
      {
        name: "큐스텀 홈페이지 개편 (qustoms.co.kr)",
        progress: 10,
        priority: "상",
        next_action: "어떤 부분을 먼저 고칠지 목록부터 정리하기",
        sort_order: 1,
      },
      {
        name: "관세뉴스 수집·요약 파이프라인",
        progress: 55,
        priority: "중",
        next_action: "매일 사람이 찾는 뉴스 후보 URL을 자동 검색으로 교체",
        sort_order: 2,
      },
      {
        name: "관세뉴스 → 지식비서 자동 연동",
        progress: 0,
        priority: "상",
        next_action: "요약된 뉴스를 지식비서 검색 데이터에 자동으로 추가하는 방법 설계",
        sort_order: 3,
      },
      {
        name: "관세뉴스 → 블로그 자동 게시",
        progress: 0,
        priority: "상",
        next_action: "블로그에 '관세' 폴더부터 만들고 게시 방식 정하기",
        sort_order: 4,
      },
      {
        name: "정부지원사업 모니터링",
        progress: 70,
        priority: "중",
        next_action: "매일·매주 자동으로 돌아가게 예약 실행 설정하기",
        sort_order: 5,
      },
      {
        name: "관세 지식비서 기능 확장",
        progress: 80,
        priority: "하",
        next_action: "해외 국가별 관세율 데이터 연동해서 수출 세율 조회 기능 추가",
        sort_order: 6,
      },
    ],
  },
  {
    name: "홈페이지 제작 사업",
    description: "고객사·본인 운영 홈페이지 제작 및 관리",
    sort_order: 2,
    projects: [
      {
        name: "영일세무회계 홈페이지",
        progress: 95,
        priority: "중",
        next_action: "고객에게 비밀번호 변경·보안키 백업 전달했는지 확인",
        sort_order: 1,
      },
      {
        name: "선한이웃노인복지센터 홈페이지",
        progress: 90,
        priority: "중",
        next_action: "안 읽은 문의 3건 확인하고 답변하기",
        sort_order: 2,
      },
    ],
  },
  {
    name: "콘텐츠 채널",
    description: "유튜브 숏폼·롱폼, 플레이리스트 채널 운영",
    sort_order: 3,
    projects: [
      {
        name: "숏폼·롱폼 기획 템플릿화",
        progress: 25,
        priority: "상",
        next_action: "주제 후보를 목록으로 만들고, 제목·썸네일 자동 생성 틀 만들기",
        sort_order: 1,
      },
      {
        name: "플리채널 운영 자동화",
        progress: 5,
        priority: "하",
        next_action: "음원 저작권(로열티프리) 확보 방법부터 정리",
        sort_order: 2,
      },
    ],
  },
];

const topActions = [
  {
    title: "큐스텀 홈페이지 개편",
    detail: "조만간 수정이 필요하다고 했으니, 무엇을 바꿀지부터 목록으로 정리해요",
    sort_order: 1,
  },
  {
    title: "관세뉴스 자동 연동 설계",
    detail: "요약한 뉴스를 지식비서와 블로그에 자동으로 올리는 방법을 구체화해요",
    sort_order: 2,
  },
  {
    title: "숏폼·롱폼 기획 템플릿화",
    detail: "조회수를 좌우하는 주제 선정·제목·썸네일 과정을 반복 가능한 틀로 만들어요",
    sort_order: 3,
  },
];

const contentHistory = [
  { title: "낙상 예방", status: "제작 완료", sort_order: 1 },
  { title: "근감소증", status: "제작 완료", sort_order: 2 },
  { title: "신장에 좋은/피해야 할 채소", status: "제작 완료", sort_order: 3 },
  { title: "야간뇨", status: "제작 완료", sort_order: 4 },
  { title: "치매 초기 습관 변화", status: "제작 완료", sort_order: 5 },
  { title: "발바닥 저림 (당뇨병성 신경병증)", status: "제작 완료", sort_order: 6 },
];

async function main() {
  await db.from("dashboard_projects").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await db.from("dashboard_business_groups").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await db.from("dashboard_top_actions").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await db.from("dashboard_content_history").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  for (const group of groups) {
    const { projects, ...groupRow } = group;
    const { data: inserted, error } = await db
      .from("dashboard_business_groups")
      .insert(groupRow)
      .select()
      .single();
    if (error) throw error;

    const projectRows = projects.map((p) => ({ ...p, group_id: inserted.id }));
    const { error: projError } = await db.from("dashboard_projects").insert(projectRows);
    if (projError) throw projError;
  }

  const { error: topError } = await db.from("dashboard_top_actions").insert(topActions);
  if (topError) throw topError;

  const { error: contentError } = await db.from("dashboard_content_history").insert(contentHistory);
  if (contentError) throw contentError;

  console.log("시드 데이터 입력 완료");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
