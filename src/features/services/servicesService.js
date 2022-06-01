import axios from "axios";

const API_URL = `${window.location.origin}/wordpress/wp-json/booking-app/api/v1`;

const getServices = async () => {
	const { data } = await axios.get(`${API_URL}/services`);
	return data;
};

const servicesService = {
	getServices,
};

export default servicesService;
