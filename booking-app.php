<?php

/**
 * Plugin Name:       Booking App
 * Description:       This plugin was made exclusively for amphaul.com.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Salem Feyzo
 * Author URI: 		  https://www.fiverr.com/salemfeyzo
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       booking-app
 *
 * @package           create-block
 */


if (!defined('ABSPATH')) exit; // Exit if accessed directly
class BookingApp
{
	function __construct()
	{
		add_action('init', array($this, 'onInit'));
		add_shortcode('booking-app', array($this, 'frontend_shortcode'));
		add_action('admin_enqueue_scripts', array($this, 'enqueue_admin'));
		add_action('admin_menu', array($this, 'admin_menu'));
		register_activation_hook(__FILE__, array($this, 'create_services_table'));
		register_activation_hook(__FILE__, array($this, 'create_items_table'));
		register_activation_hook(__FILE__, array($this, 'create_dismantling_table'));
		register_activation_hook(__FILE__, array($this, 'create_vehicles_table'));
		register_activation_hook(__FILE__, array($this, 'create_stairs_table'));
		register_activation_hook(__FILE__, array($this, 'create_service_addresses_table'));
		register_activation_hook(__FILE__, array($this, 'create_service_items_table'));
		register_activation_hook(__FILE__, array($this, 'create_orders_table'));
		register_activation_hook(__FILE__, array($this, 'create_order_items_table'));
	}

	function onInit()
	{
		wp_register_script(
			'frontendReactJS',
			plugin_dir_url(__FILE__) . 'build/bookingAppFrontend.js',
			array('wp-element', 'wp-i18n'),
			null,
			true
		);
		wp_register_style(
			'frontendReactCSS',
			plugin_dir_url(__FILE__) .
				'build/bookingAppFrontend.css',
			array(),
			null,
			"all"
		);
	}
	function frontend_shortcode()
	{
		//react 
		wp_enqueue_script("frontendReactJS", '1.0', true);
		wp_enqueue_style("frontendReactCSS");

		wp_localize_script('frontendReactJS', 'wpApiSettings', array(
			'IS_USER_LOGGED_IN' => is_user_logged_in(),
			'CURRENT_USER_DETAILS' => wp_get_current_user(),
			'root' => esc_url_raw(rest_url()),
			'nonce' => wp_create_nonce('wp_rest')
		));

		return "<div class=\"notranslate\" id=\"booking-app\" dir=\"ltr\"></div>";
	}

	// for backend ui
	function enqueue_admin()
	{
		global $pagenow;
		wp_enqueue_media();
		wp_register_script('react-admin-script', plugins_url('build/bookingAppAdmin.js', __FILE__), array('wp-element', 'wp-i18n'), '1.0', true);
		wp_register_style("react-admin-css", plugins_url("build/bookingAppAdmin.css", __FILE__), array(), "1.0", "all");

		if ($pagenow == 'admin.php') {
			wp_enqueue_script('react-admin-script', '1.0', true);
			wp_enqueue_style("react-admin-css");
			wp_localize_script('react-admin-script', 'wpApiSettings', array(
				'IS_USER_LOGGED_IN' => is_user_logged_in(),
				'CURRENT_USER_DETAILS' => wp_get_current_user(),
				'root' => esc_url_raw(rest_url()),
				'nonce' => wp_create_nonce('wp_rest')
			));
		}
	}
	function admin_menu()
	{
		add_menu_page(
			__('Booking App Settings', 'booking-app'),
			__('Booking App', 'booking-app'),
			'manage_options',
			__('booking_app_settings', 'booking-app'),
			[$this, 'admin_ui_html'],
			'',
			6
		);
	}
	function admin_ui_html()
	{

?>
		<div id="booking-app-admin-settings"></div>

<?php

	}


	function create_services_table()
	{
		global $wpdb;
		$charset_collate = $wpdb->get_charset_collate();
		$table_name = $wpdb->prefix . 'booking_app_services';
		require_once ABSPATH . "wp-content/plugins/booking-app/sql/services_sql.php";
		$query = $wpdb->prepare('SHOW TABLES LIKE %s', $wpdb->esc_like($table_name));
		//checking if the table exists if not go ahead and create it & insert the default data
		if (!$wpdb->get_var($query) == $table_name) {
			require_once ABSPATH . 'wp-admin/includes/upgrade.php';
			dbDelta($sql);
			//Adding default data
			require_once ABSPATH . "wp-content/plugins/booking-app/dummy_data/services.php";
			foreach ($services as
				$key => $service) {
				$wpdb->insert(
					$table_name,
					$service,
				);
			}
		}
	}

	function create_service_addresses_table()
	{
		global $wpdb;
		$charset_collate = $wpdb->get_charset_collate();
		$table_name = $wpdb->prefix . 'booking_app_service_addresses';
		$service_table_name = $wpdb->prefix . 'booking_app_services';
		require_once ABSPATH . "wp-content/plugins/booking-app/sql/service_addresses_sql.php";
		$query = $wpdb->prepare('SHOW TABLES LIKE %s', $wpdb->esc_like($table_name));
		//checking if the table exists if not go ahead and create it & insert the default data
		if (!$wpdb->get_var($query) == $table_name) {
			require_once ABSPATH . 'wp-admin/includes/upgrade.php';
			dbDelta($sql);
		}
	}

	function create_orders_table()
	{
		global $wpdb;
		$charset_collate = $wpdb->get_charset_collate();
		$table_name = $wpdb->prefix . 'booking_app_orders';
		$service_table_name = $wpdb->prefix . 'booking_app_services';
		require_once ABSPATH . "wp-content/plugins/booking-app/sql/orders_sql.php";
		$query = $wpdb->prepare('SHOW TABLES LIKE %s', $wpdb->esc_like($table_name));
		//checking if the table exists if not go ahead and create it & insert the default data
		if (!$wpdb->get_var($query) == $table_name) {
			require_once ABSPATH . 'wp-admin/includes/upgrade.php';
			dbDelta($sql);
			//Adding default data
			require_once ABSPATH . "wp-content/plugins/booking-app/dummy_data/demo_order.php";

			$wpdb->insert(
				$table_name,
				$demo_order,
			);
		}
	}

	function create_items_table()
	{
		global $wpdb;
		$charset_collate = $wpdb->get_charset_collate();
		$table_name = $wpdb->prefix . 'booking_app_items';
		require_once ABSPATH . "wp-content/plugins/booking-app/sql/items_sql.php";
		$query = $wpdb->prepare('SHOW TABLES LIKE %s', $wpdb->esc_like($table_name));
		//checking if the table exists if not go ahead and create it & insert the default data
		if (!$wpdb->get_var($query) == $table_name) {
			require_once ABSPATH . 'wp-admin/includes/upgrade.php';
			dbDelta($sql);
			//Adding default data
			require_once ABSPATH . "wp-content/plugins/booking-app/dummy_data/items.php";
			foreach ($items as
				$key => $item) {
				$wpdb->insert(
					$table_name,
					$item,
				);
			}
		}
	}

	function create_dismantling_table()
	{
		global $wpdb;
		$charset_collate = $wpdb->get_charset_collate();
		$table_name = $wpdb->prefix . 'booking_app_dismantling';
		require_once ABSPATH . "wp-content/plugins/booking-app/sql/dismantling_sql.php";
		$query = $wpdb->prepare('SHOW TABLES LIKE %s', $wpdb->esc_like($table_name));
		//checking if the table exists if not go ahead and create it & insert the default data
		if (!$wpdb->get_var($query) == $table_name) {
			require_once ABSPATH . 'wp-admin/includes/upgrade.php';
			dbDelta($sql);
			require_once ABSPATH . "wp-content/plugins/booking-app/dummy_data/dismantling.php";
			$wpdb->insert(
				$table_name,
				$dismantling,
			);
		}
	}
	function create_vehicles_table()
	{
		global $wpdb;
		$charset_collate = $wpdb->get_charset_collate();
		$table_name = $wpdb->prefix . 'booking_app_vehicles';
		require_once ABSPATH . "wp-content/plugins/booking-app/sql/vehicles_sql.php";
		$query = $wpdb->prepare('SHOW TABLES LIKE %s', $wpdb->esc_like($table_name));
		//checking if the table exists if not go ahead and create it & insert the default data
		if (!$wpdb->get_var($query) == $table_name) {
			require_once ABSPATH . 'wp-admin/includes/upgrade.php';
			dbDelta($sql);
			//Adding default data
			require_once ABSPATH . "wp-content/plugins/booking-app/dummy_data/vehicles.php";
			foreach ($vehicles as
				$key => $vehicle) {
				$wpdb->insert(
					$table_name,
					$vehicle,
				);
			}
		}
	}
	function create_stairs_table()
	{
		global $wpdb;
		$charset_collate = $wpdb->get_charset_collate();
		$table_name = $wpdb->prefix . 'booking_app_stairs';
		require_once ABSPATH . "wp-content/plugins/booking-app/sql/stairs_sql.php";
		$query = $wpdb->prepare('SHOW TABLES LIKE %s', $wpdb->esc_like($table_name));
		//checking if the table exists if not go ahead and create it & insert the default data
		if (!$wpdb->get_var($query) == $table_name) {
			require_once ABSPATH . 'wp-admin/includes/upgrade.php';
			dbDelta($sql);
			require_once ABSPATH . "wp-content/plugins/booking-app/dummy_data/stairs.php";
			$wpdb->insert(
				$table_name,
				$stairs,
			);
		}
	}

	function create_service_items_table()
	{
		global $wpdb;
		$charset_collate = $wpdb->get_charset_collate();
		$table_name = $wpdb->prefix . 'booking_app_service_items';
		$items_table_name = $wpdb->prefix . 'booking_app_items';
		$service_table_name = $wpdb->prefix . 'booking_app_services';
		require_once ABSPATH . "wp-content/plugins/booking-app/sql/service_items_sql.php";
		$query = $wpdb->prepare('SHOW TABLES LIKE %s', $wpdb->esc_like($table_name));
		//checking if the table exists if not go ahead and create it & insert the default data
		if (!$wpdb->get_var($query) == $table_name) {
			require_once ABSPATH . 'wp-admin/includes/upgrade.php';
			dbDelta($sql);
			//Adding default data
			require_once ABSPATH . "wp-content/plugins/booking-app/dummy_data/service_items.php";
			foreach ($service_items as
				$key => $service_item) {
				$wpdb->insert(
					$table_name,
					$service_item,
				);
			}
		}
	}

	function create_order_items_table()
	{
		global $wpdb;
		$charset_collate = $wpdb->get_charset_collate();
		$table_name = $wpdb->prefix . 'booking_app_order_items';
		$items_table_name = $wpdb->prefix . 'booking_app_items';
		$order_table_name = $wpdb->prefix . 'booking_app_orders';
		require_once ABSPATH . "wp-content/plugins/booking-app/sql/order_items_sql.php";
		$query = $wpdb->prepare('SHOW TABLES LIKE %s', $wpdb->esc_like($table_name));
		//checking if the table exists if not go ahead and create it & insert the default data
		if (!$wpdb->get_var($query) == $table_name) {
			require_once ABSPATH . 'wp-admin/includes/upgrade.php';
			dbDelta($sql);
			//Adding default data
			require_once ABSPATH . "wp-content/plugins/booking-app/dummy_data/order_items.php";
			foreach ($order_items as
				$key => $order_item) {
				$wpdb->insert(
					$table_name,
					$order_item,
				);
			}
		}
	}
}


$booking_app = new BookingApp();

//Service Routes
require_once ABSPATH . "wp-content/plugins/booking-app/api/services_routes.php";
$routes = new ServiceRoutes();
//Vehicles Routes
require_once ABSPATH . "wp-content/plugins/booking-app/api/vehicles_routes.php";
$vehicles = new VehiclesRoutes();
