CREATE USER 'admin'@'%' IDENTIFIED BY 'jfnjvfd943njcdnfda';

GRANT ALL PRIVILEGES ON * . * TO 'admin'@'%';
FLUSH PRIVILEGES;

-- ////////////////////////////

SET sql_log_bin = 1;
set binlog_rows_query_log_events=ON;

set global gtid_strict_mode=ON;
SET GLOBAL gtid_domain_id = 1;
set global binlog_format=ROW ;
