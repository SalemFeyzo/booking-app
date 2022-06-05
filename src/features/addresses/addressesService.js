import axios from "axios";
import { API_URL } from "../API_URL";

const getAddresses = async () => {
	const { data } = await axios.get(`${API_URL}/addresses`);
	return data;
};

const addressesService = {
	getAddresses,
};

export default addressesService;
