<?php
if (!defined('ABSPATH')) exit;
$sql = "CREATE TABLE $table_name (
        dismantling_id mediumint(9) NOT NULL AUTO_INCREMENT,
        price varchar(120) NOT NULL,
        PRIMARY KEY (dismantling_id)
      ) $charset_collate;";
