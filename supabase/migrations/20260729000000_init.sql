-- 선한이웃노인복지센터 홈페이지 초기 스키마
-- 접근은 서버(Next.js API route)에서 service_role 키로만 이루어짐.
-- 관리자 로그인/인증은 그대로 Firebase Auth(Google 로그인)를 쓰고, 여기서는
-- 콘텐츠(site_content)와 문의(contacts) 데이터 저장소만 Firestore에서 이전한다.

create table site_content (
  id integer primary key default 1 check (id = 1),
  news jsonb not null,
  recruit jsonb not null,
  settings jsonb not null,
  copayment jsonb not null,
  staff jsonb not null,
  faq jsonb not null
);

create table contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  type text not null,
  message text not null,
  date timestamptz not null default now(),
  read boolean not null default false
);

alter table site_content enable row level security;
alter table contacts enable row level security;
