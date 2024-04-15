-- create DATABASE tenantdb;
-- CREATE USER 'admin'@'%' IDENTIFIED BY 'jfnjvfd943njcdnfda';

-- GRANT ALL PRIVILEGES ON * . * TO 'admin'@'%';
-- FLUSH PRIVILEGES;
alter TABLE refresh_tokens
add token varchar(255);