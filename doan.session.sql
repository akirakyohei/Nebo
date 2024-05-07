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
CREATE TABLE `categories`(
  id BIGINT AUTO_INCREMENT primary key,
  `user_id` BIGINT,
  group_id int,
  `name` nvarchar(255),
  created_on timestamp,
  updated_on timestamp
);
create table paper_types(
    id int not null,
    `name` nvarchar(255),
    width int,
    unit_of_width varchar(50),
    height int,
    unit_of_height varchar(50),
    `description` nvarchar(255)
);

ALTER TABLE templates ENGINE=InnoDB;

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
    size bigint,
    created_on timestamp,
    updated_on timestamp
);

ALTER Table templates
modify column paper_type_id int not null;

alter table templates
add foreign key(paper_type_id) references paper_types(id);

alter table paper_types
add primary key (id);

create table file_datas(
    id BIGINT(20) primary key auto_increment,
    user_id bigint(20) not null,
    file_name nvarchar(255),
    `key` nvarchar(2000),
    extension varchar(50),
    size int
)



create Database reportdb;

use reportdb;

create table dim_datetimes(
date_key bigint primary key auto_increment not null,
`date` timestamp,
hour int,
day_of_month int,
day_of_week varchar(20),
day_of_year int,
first_hour_of_day timestamp,
first_day_of_month timestamp,
first_day_of_year timestamp,
month_of_year int,
year int
);

create table dim_paper_types(
    paper_type_key int primary key not null,
    paper_type_id int not null,
    `name` nvarchar(250),
    width int,
    unit_of_width varchar(50),
    height int,
    unit_of_height varchar(50),
    description nvarchar(255)
);

create table dim_templates(
template_key BIGINT auto_increment primary key not null,
template_id bigint not null,
`name` nvarchar(255),
user_key bigint,
paper_type_key int,
created_on timestamp,
updated_on timestamp
);

create table dim_users(
    user_key bigint auto_increment primary key not null,
user_id bigint not null,
first_name nvarchar(50),
last_name nvarchar(50),
image_url nvarchar(500)
);

create table fact_aggregates(
    id bigint auto_increment primary key not null,
    user_key bigint not null,
    total_data bigint not null,
    total_template bigint not null,
    total_used_template bigint not null
);

CREATE TABLE fact_sessions(
    id bigint auto_increment primary key not null,
    user_key bigint not null,
    ip_address varchar(255),
    user_agent varchar(255),
    created_on timestamp
);


create table fact_used_paper_types(
    id BIGINT auto_increment primary key not null,
    user_key bigint not null,
    paper_type_key int,
    date_key bigint,
    total_used bigint
);

create table fact_used_templates(
    id BIGINT auto_increment primary key not null,
    user_key bigint not null,
    template_key bigint,
    date_key bigint,
    total_used bigint
);


alter table dim_templates
add foreign key(user_key) references dim_users(user_key);

ALTER table dim_templates
add foreign key(paper_type_key) references dim_paper_types(paper_type_key);

alter Table fact_used_templates
add foreign key(user_key) references dim_users(user_key);

use reportdb;
alter Table fact_used_templates
add foreign key(template_key) references dim_templates(template_key);

alter Table fact_used_templates
add foreign key(date_key) references dim_datetimes(date_key);



SELECT variable_value as "BINARY LOGGING STATUS (log-bin) ::"
FROM information_schema.global_variables WHERE variable_name='log_bin';

show variables like '%bin%'

SET sql_log_bin = 1;
set binlog_rows_query_log_events=ON

show binary logs

set global gtid_strict_mode=ON

-- set enforce_gtid_consistency=ON
SET GLOBAL gtid_domain_id = 1;

show global variables like '%GTID%'

set global binlog_format=ROW ;

-- set global binlog_annotate_row_events = on
show global variables where variable_name = 'binlog_row_value_options';