-- create DATABASE tenantdb;
-- CREATE USER 'admin'@'%' IDENTIFIED BY 'jfnjvfd943njcdnfda';

-- GRANT ALL PRIVILEGES ON * . * TO 'admin'@'%';
-- FLUSH PRIVILEGES;
-- alter TABLE refresh_tokens
-- add token varchar(255);
use tenantdb;
-- RENAME table refresh_tokens to `sessions`;

create table `sessions`(
    id bigint(20) not null auto_increment primary key;
    user_id bigint(20);
    refresh_token varchar(255);
    expired_date timestamp;
    token varchar(255);
);
