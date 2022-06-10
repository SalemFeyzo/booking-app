<?php
if (!defined('ABSPATH')) exit; // Exit if accessed directly
class DismantlingRoutes
{
    function __construct()
    {
        // GET dismantling
        add_action(
            'rest_api_init',
            function () {
                //register_rest_route( string $namespace, string $route, array $args = array(), bool $override = false )
                register_rest_route(
                    'booking-app/api/v1',
                    '/dismantling',
                    array(
                        'methods' => 'GET',
                        'callback' => array($this, 'get_dismantling_controller'),
                    ),
                );
            }
        );
    }

    function get_dismantling_controller($req)
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'booking_app_dismantling';
        $results = $wpdb->get_results("SELECT * FROM $table_name ");
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
