export type Priority = "상" | "중" | "하";

export type AutomationProject = {
  name: string;
  progress: number;
  priority: Priority;
  nextAction: string;
};

export type BusinessGroup = {
  name: string;
  description: string;
  projects: AutomationProject[];
};

export const businessGroups: BusinessGroup[] = [
  {
    name: "큐스텀 (관세 스타트업)",
    description: "AI 기반 관세정보 플랫폼 — 본인 창업기업",
    projects: [
      {
        name: "큐스텀 홈페이지 개편 (qustoms.co.kr)",
        progress: 10,
        priority: "상",
        nextAction: "어떤 부분을 먼저 고칠지 목록부터 정리하기",
      },
      {
        name: "관세뉴스 수집·요약 파이프라인",
        progress: 55,
        priority: "중",
        nextAction: "매일 사람이 찾는 뉴스 후보 URL을 자동 검색으로 교체",
      },
      {
        name: "관세뉴스 → 지식비서 자동 연동",
        progress: 0,
        priority: "상",
        nextAction: "요약된 뉴스를 지식비서 검색 데이터에 자동으로 추가하는 방법 설계",
      },
      {
        name: "관세뉴스 → 블로그 자동 게시",
        progress: 0,
        priority: "상",
        nextAction: "블로그에 '관세' 폴더부터 만들고 게시 방식 정하기",
      },
      {
        name: "정부지원사업 모니터링",
        progress: 70,
        priority: "중",
        nextAction: "매일·매주 자동으로 돌아가게 예약 실행 설정하기",
      },
      {
        name: "관세 지식비서 기능 확장",
        progress: 80,
        priority: "하",
        nextAction: "해외 국가별 관세율 데이터 연동해서 수출 세율 조회 기능 추가",
      },
    ],
  },
  {
    name: "홈페이지 제작 사업",
    description: "고객사·본인 운영 홈페이지 제작 및 관리",
    projects: [
      {
        name: "영일세무회계 홈페이지",
        progress: 95,
        priority: "중",
        nextAction: "고객에게 비밀번호 변경·보안키 백업 전달했는지 확인",
      },
      {
        name: "선한이웃노인복지센터 홈페이지",
        progress: 90,
        priority: "중",
        nextAction: "안 읽은 문의 3건 확인하고 답변하기",
      },
    ],
  },
  {
    name: "콘텐츠 채널",
    description: "유튜브 숏폼·롱폼, 플레이리스트 채널 운영",
    projects: [
      {
        name: "숏폼·롱폼 기획 템플릿화",
        progress: 25,
        priority: "상",
        nextAction: "주제 후보를 목록으로 만들고, 제목·썸네일 자동 생성 틀 만들기",
      },
      {
        name: "플리채널 운영 자동화",
        progress: 5,
        priority: "하",
        nextAction: "음원 저작권(로열티프리) 확보 방법부터 정리",
      },
    ],
  },
];

export const allProjects: AutomationProject[] = businessGroups.flatMap(
  (group) => group.projects
);

export type TopAction = {
  title: string;
  detail: string;
};

export const topActions: TopAction[] = [
  {
    title: "큐스텀 홈페이지 개편",
    detail: "조만간 수정이 필요하다고 했으니, 무엇을 바꿀지부터 목록으로 정리해요",
  },
  {
    title: "관세뉴스 자동 연동 설계",
    detail: "요약한 뉴스를 지식비서와 블로그에 자동으로 올리는 방법을 구체화해요",
  },
  {
    title: "숏폼·롱폼 기획 템플릿화",
    detail: "조회수를 좌우하는 주제 선정·제목·썸네일 과정을 반복 가능한 틀로 만들어요",
  },
];

export type SummaryStat = {
  label: string;
  value: string;
  sublabel: string;
};

const completed = allProjects.filter((p) => p.progress >= 80).length;
const planning = allProjects.filter((p) => p.progress < 30).length;
const highPriority = allProjects.filter((p) => p.priority === "상").length;

export const summaryStats: SummaryStat[] = [
  { label: "전체 자동화 프로젝트", value: `${allProjects.length}개`, sublabel: "3개 사업에 걸쳐 진행 중" },
  { label: "운영 중 (80% 이상)", value: `${completed}개`, sublabel: "안정적으로 돌아가는 것들" },
  { label: "아직 계획 단계", value: `${planning}개`, sublabel: "30% 미만, 착수 전" },
  { label: "우선순위 '상'", value: `${highPriority}개`, sublabel: "먼저 손대야 할 일들" },
];

export type ContentItem = {
  title: string;
  status: string;
};

export const contentHistory: ContentItem[] = [
  { title: "낙상 예방", status: "제작 완료" },
  { title: "근감소증", status: "제작 완료" },
  { title: "신장에 좋은/피해야 할 채소", status: "제작 완료" },
  { title: "야간뇨", status: "제작 완료" },
  { title: "치매 초기 습관 변화", status: "제작 완료" },
  { title: "발바닥 저림 (당뇨병성 신경병증)", status: "제작 완료" },
];
