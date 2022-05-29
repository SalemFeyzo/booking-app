<?php
if (!defined('ABSPATH')) exit;
$sql = "CREATE TABLE $table_name (
        service_id mediumint(9) NOT NULL AUTO_INCREMENT,
        name varchar(120) NOT NULL,
        min_price varchar(120) NOT NULL,
        PRIMARY KEY (service_id)
      ) $charset_collate;";
