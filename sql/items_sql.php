<?php
if (!defined('ABSPATH')) exit;
$sql = "CREATE TABLE $table_name (
        item_id mediumint(9) NOT NULL AUTO_INCREMENT,
        name varchar(120) NOT NULL,
        price varchar(120) NOT NULL,
        PRIMARY KEY (item_id)
      ) $charset_collate;";
