<?php

/**
 * Plugin Name:       Booking App
 * Description:       Booking app made especially for amphaul.com.
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
	}

	function onInit()
	{
		wp_register_script(
			'frontendReactJS',
			plugin_dir_url(__FILE__) . 'build/bookingAppFrontend.js',
			array('wp-element'),
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
		wp_register_script('react-admin-script', plugins_url('build/bookingAppAdmin.js', __FILE__), array('wp-element'), '1.0', true);
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
			'Booking App Settings',
			'Booking App',
			'manage_options',
			'booking_app_settings',
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
}


$booking_app = new BookingApp();
