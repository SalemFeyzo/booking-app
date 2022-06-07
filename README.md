# booking-plugin

# items per service

SELECT \*
FROM
wp_booking_app_service_items
INNER JOIN wp_booking_app_items ON wp_booking_app_service_items.item = wp_booking_app_items.item_id
WHERE
service = 1;

# items per order

SELECT \*
FROM
wp_booking_app_order_items
INNER JOIN wp_booking_app_items ON wp_booking_app_order_items.item = wp_booking_app_items.item_id
WHERE
order_id = 1;

$url = "http://maps.googleapis.com/maps/api/geocode/json?address=" . $zip . "&sensor=true";

https://maps.googleapis.com/maps/api/geocode/json?components=country:US|postal_code:30005&key=AIzaSyCF_b0avoAPa-h76ELIZcudKMzrvxhAbBM
