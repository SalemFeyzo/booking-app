<?php
if (!defined('ABSPATH')) exit;
$sql = "CREATE TABLE $table_name (
        order_id mediumint(9) NOT NULL AUTO_INCREMENT,
        service varchar(120) NOT NULL,
        date varchar(120) NOT NULL,
        time varchar(120) NOT NULL,
        frequency varchar(120) NOT NULL,
        vehicle varchar(120) NOT NULL,
        stairs varchar(120) NOT NULL,
        dismantling varchar(120) NOT NULL,
        description LONGTEXT NOT NULL,
        company_name varchar(120) NULL,
        address LONGTEXT NOT NULL,
        first_name varchar(120) NOT NULL,
        last_name varchar(120) NOT NULL,
        email varchar(120) NOT NULL,
        mobile_number varchar(120) NOT NULL,
        total varchar(120) NOT NULL,
        view mediumint(9) DEFAULT 0,
        PRIMARY KEY (order_id)
      ) $charset_collate;";
