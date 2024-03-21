create table
  public.teams (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    name text null default ''::text,
    members text[] null,
    leader uuid not null,
    constraint teams_pkey primary key (id),
    constraint teams_leader_key unique (leader),
    constraint teams_name_key unique (name),
    constraint public_teams_leader_fkey foreign key (leader) references auth.users (id) on update cascade on delete cascade
  ) tablespace pg_default;
  
create table
  public.matchs (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    team1 uuid not null,
    team2 uuid not null,
    sport text null,
    time time without time zone null,
    team1_score smallint null,
    team2_score smallint null,
    constraint matchs_pkey primary key (id),
    constraint public_matchs_team1_fkey foreign key (team1) references teams (id),
    constraint public_matchs_team2_fkey foreign key (team2) references teams (id)
  ) tablespace pg_default;
  
create policy "Users can insert their own team." on teams
  for insert with check (auth.uid() = leader);

create policy "Users can update own team." on teams
  for update using (auth.uid() = leader);

-- This trigger automatically creates a team entry when a new user signs up via Supabase Auth.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.teams (leader, name)
  values (new.id, null);
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();