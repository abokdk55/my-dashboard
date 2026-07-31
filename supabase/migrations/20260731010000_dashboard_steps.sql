alter table dashboard_projects
  add column if not exists completed_override boolean not null default false;

create table if not exists dashboard_steps (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references dashboard_projects(id) on delete cascade,
  title text not null,
  done boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table dashboard_steps enable row level security;
