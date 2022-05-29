<?php
if (!defined('ABSPATH')) exit;
$sql = "CREATE TABLE $table_name (
        address_id mediumint(9) NOT NULL AUTO_INCREMENT,
        service mediumint(9) NOT NULL,
        county varchar(120) NOT NULL,
        city varchar(120) NOT NULL,
        zip varchar(120) NOT NULL,
        price_by_address varchar(120) NOT NULL,
        PRIMARY KEY (address_id),
        FOREIGN KEY (service) REFERENCES $service_table_name (service_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
      ) $charset_collate;";
