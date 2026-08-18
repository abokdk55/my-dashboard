alter table dashboard_projects
  add column if not exists link_url text,
  add column if not exists last_auto_check_at timestamptz;

create table if not exists dashboard_project_activity (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references dashboard_projects(id) on delete cascade,
  title text not null,
  url text,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table dashboard_project_activity enable row level security;

update dashboard_projects
set link_url = 'https://blog.naver.com/abokdk'
where name ilike '%관세뉴스 → 블로그%';
