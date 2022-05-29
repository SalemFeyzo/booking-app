<?php
if (!defined('ABSPATH')) exit;
$sql = "CREATE TABLE $table_name (
        vehicle_id mediumint(9) NOT NULL AUTO_INCREMENT,
        type varchar(120) NOT NULL,
        price varchar(120) NOT NULL,
        PRIMARY KEY (vehicle_id)
      ) $charset_collate;";
