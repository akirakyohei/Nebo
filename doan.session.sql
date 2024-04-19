use `tenantdb`;
-- create table `sessions`(
--     id bigint primary key auto increment,
--     user_id bigint,
--     refresh_token varchar(255),
--     expired_date timestamp,
--     token varchar(255)
-- );

-- rename table refresh_tokens To `sessions`;
alter table `refresh_tokens`
RENAME to `sessions`;