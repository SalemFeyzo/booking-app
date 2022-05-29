<?php
if (!defined('ABSPATH')) exit;
$sql = "CREATE TABLE $table_name (
        order_id mediumint(9) NOT NULL,
        item mediumint(9) NOT NULL,
        item_number mediumint(9) DEFAULT 1,
        PRIMARY KEY (order_id, item),
        FOREIGN KEY (order_id) REFERENCES $order_table_name (order_id),
        FOREIGN KEY (item) REFERENCES $items_table_name (item_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
      ) $charset_collate;";
