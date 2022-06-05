import axios from "axios";
import { API_URL } from "../API_URL";

const getServiceItems = async (service_id) => {
	const { data } = await axios.get(
		`${API_URL}/service_items?service_id=${service_id}`
	);
	return data;
};

const serviceItemsService = {
	getServiceItems,
};

export default serviceItemsService;
