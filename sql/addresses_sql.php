<?php
if (!defined('ABSPATH')) exit;
$sql = "CREATE TABLE $table_name (
        address_id mediumint(9) NOT NULL AUTO_INCREMENT,
        county varchar(120) NOT NULL,
        city varchar(120) NOT NULL,
        zip varchar(120) NOT NULL,
        junk_removal varchar(120) NOT NULL,
        cardboard_removal varchar(120) NOT NULL,
        dump_trailer varchar(120) NOT NULL,
        PRIMARY KEY (address_id)
      ) $charset_collate;";
