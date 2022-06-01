<?php
if (!defined('ABSPATH')) exit; // Exit if accessed directly
class ServiceRoutes
{
    function __construct()
    {
        // GET Services
        add_action(
            'rest_api_init',
            function () {
                //register_rest_route( string $namespace, string $route, array $args = array(), bool $override = false )
                register_rest_route(
                    'booking-app/api/v1',
                    '/services',
                    array(
                        'methods' => 'GET',
                        'callback' => array($this, 'get_services_controller'),
                    ),
                );
            }
        );
    }

    function get_services_controller($req)
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'booking_app_services';
        $result = $wpdb->get_results("SELECT * FROM $table_name ");
        if ($result) {
            $res = new WP_REST_Response($result);
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
