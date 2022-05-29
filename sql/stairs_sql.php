<?php
if (!defined('ABSPATH')) exit;
$sql = "CREATE TABLE $table_name (
        stair_id mediumint(9) NOT NULL AUTO_INCREMENT,
        price varchar(120) NOT NULL,
        PRIMARY KEY (stair_id)
      ) $charset_collate;";
