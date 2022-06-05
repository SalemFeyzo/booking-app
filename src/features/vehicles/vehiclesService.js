import axios from "axios";
import { API_URL } from "../API_URL";

const getVehicles = async () => {
	const { data } = await axios.get(`${API_URL}/vehicles`);
	return data;
};

const vehiclesService = {
	getVehicles,
};

export default vehiclesService;
