create table if not exists dashboard_business_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  sort_order int not null default 0
);

create table if not exists dashboard_projects (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references dashboard_business_groups(id) on delete cascade,
  name text not null,
  progress int not null default 0 check (progress >= 0 and progress <= 100),
  priority text not null check (priority in ('상', '중', '하')),
  next_action text not null default '',
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists dashboard_top_actions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  detail text not null,
  sort_order int not null default 0
);

create table if not exists dashboard_content_history (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  status text not null,
  sort_order int not null default 0
);

alter table dashboard_business_groups enable row level security;
alter table dashboard_projects enable row level security;
alter table dashboard_top_actions enable row level security;
alter table dashboard_content_history enable row level security;
