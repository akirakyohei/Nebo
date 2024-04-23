-- use `tenantdb`;
-- create table `sessions`(
--     id bigint primary key auto increment,
--     user_id bigint,
--     refresh_token varchar(255),
--     expired_date timestamp,
--     token varchar(255)
-- );

-- rename table refresh_tokens To `sessions`;
-- alter table `refresh_tokens`
-- RENAME to `sessions`;

create database templatedb;
USE templatedb;
CREATE TABLE categories(
  id BIGINT primary key auto_increment,
  user_id BIGINT,
  group_id int,
  name nvarchar(255),
  created_on timestamp,
  updated_on timestamp
);
create table paper_types(
    id int not null,
    name nvarchar(255),
    width int,
    unit_of_width varchar,
    height int,
    unit_of_height varchar,
    description nvarchar(255)
);

create table print_logs(
id int primary key auto_increment,
user_id BIGINT(20),
template_id BIGINT(20),
paper_type_id int,
created_on timestamp
);

create table templates(
    id bigint(20) NOT NULL primary key auto_increment,
    user_id bigint(20),
    name nvarchar(255),
    paper_type_id int,
    category_ids varchar(5000),
    data mediumtext,
    size long,
    created_on timestamp,
    updated_on timestamp
);

alter table templates
add foreign key (paper_type_id) references paper_types(id);


create table file_datas(
    id BIGINT(20) primary key auto_increment,
    user_id bigint(20) not null,
    file_name nvarchar(255),
    `key` nvarchar(2000),
    extension varchar(50),
    size int
)