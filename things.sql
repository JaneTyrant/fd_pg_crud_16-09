CREATE TABLE things(
    id serial primary key,
    body text not null check (body != ''),
    author varchar(64) default 'anonim',
    "createdAt" timestamp not null default current_timestamp,
    "updatedAt" timestamp not null default current_timestamp
)