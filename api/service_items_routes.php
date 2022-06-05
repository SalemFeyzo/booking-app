<?php
if (!defined('ABSPATH')) exit; // Exit if accessed directly
class ServiceItemsRoutes
{
    function __construct()
    {
        // GET service_items
        add_action(
            'rest_api_init',
            function () {
                //register_rest_route( string $namespace, string $route, array $args = array(), bool $override = false )
                register_rest_route(
                    'booking-app/api/v1',
                    '/service_items',
                    array(
                        'methods' => 'GET',
                        'callback' => array($this, 'get_service_items_controller'),
                    ),
                );
            }
        );
    }

    function get_service_items_controller($req)
    {
        $service_id = $req['service_id'];
        global $wpdb;
        $table_name = $wpdb->prefix . 'booking_app_service_items';
        $results = $wpdb->get_results("SELECT * FROM $table_name INNER JOIN wp_booking_app_items ON $table_name.item = wp_booking_app_items.item_id WHERE service = '$service_id' ");
        if ($results) {
            $res = new WP_REST_Response($results);
            $res->set_status(200);
            return $res;
        } else {
            $result = array('error' => 'This item not exists');
            $res = new WP_REST_Response($result);
            $res->set_status(404);
            return $res;
        }
    }
}
