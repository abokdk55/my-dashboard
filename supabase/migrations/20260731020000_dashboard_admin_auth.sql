create table if not exists dashboard_admin_auth (
  id int primary key default 1,
  password_hash text not null,
  password_salt text not null,
  updated_at timestamptz not null default now(),
  constraint dashboard_admin_auth_singleton check (id = 1)
);

alter table dashboard_admin_auth enable row level security;
