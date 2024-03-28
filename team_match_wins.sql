-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing


create
or replace function victoires () returns table (name text, victoires bigint) as $$ select teams.name, count(*) as victoires from matchs join teams on team1=teams.id where team1_score >team2_score group by teams.name 
union
select teams.name, count(*) as victoires from matchs join teams on team2=teams.id where team2_score >team1_score group by teams.name 
$$ language sql;

create
or replace function defaites () returns table (name text, defaites bigint) as $$ select teams.name, count(*) as defaites from matchs join teams on team2=teams.id where team1_score >team2_score group by teams.name 
union
select teams.name, count(*) as defaites from matchs join teams on team1=teams.id where team2_score >team1_score group by teams.name $$ language sql;

create
or replace function egalites () returns table (name text, egalites bigint) as $$ select teams.name, count(*) as defaites from matchs join teams on team2=teams.id where team1_score =team2_score group by teams.name 
union
select teams.name, count(*) as defaites from matchs join teams on team1=teams.id where team2_score=team1_score group by teams.name $$ language sql;


create or replace function score(vic_pts int, def_pts int, eq_pts int)
returns table(name text,score bigint) as  $$
select name, sum(score)as score from(
select name, victoires*vic_pts as score from victoires()
union 
select name, egalites*eq_pts as score from egalites()
union 
select name, defaites*def_pts as score from defaites()
) as scores group by name order by score desc;$$ language sql;

