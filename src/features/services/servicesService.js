import axios from "axios";
import { API_URL } from "../API_URL";

const getServices = async () => {
	const { data } = await axios.get(`${API_URL}/services`);
	return data;
};

const servicesService = {
	getServices,
};

export default servicesService;
