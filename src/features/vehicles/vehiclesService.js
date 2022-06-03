import axios from "axios";

const API_URL = `${window.location.origin}/wordpress/wp-json/booking-app/api/v1`;

const getVehicles = async () => {
	const { data } = await axios.get(`${API_URL}/vehicles`);
	return data;
};

const vehiclesService = {
	getVehicles,
};

export default vehiclesService;
