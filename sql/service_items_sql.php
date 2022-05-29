<?php
if (!defined('ABSPATH')) exit;
$sql = "CREATE TABLE $table_name (
        service mediumint(9) NOT NULL,
        item mediumint(9) NOT NULL,
        PRIMARY KEY (service, item),
        FOREIGN KEY (service) REFERENCES $service_table_name (service_id),
        FOREIGN KEY (item) REFERENCES $items_table_name (item_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
      ) $charset_collate;";
