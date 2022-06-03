import axios from "axios";

const API_URL = `${window.location.origin}/wordpress/wp-json/booking-app/api/v1`;

const getAddresses = async () => {
	const { data } = await axios.get(`${API_URL}/addresses`);
	return data;
};

const addressesService = {
	getAddresses,
};

export default addressesService;
