import axios from "axios";
import { API_URL } from "../API_URL";

const getDismantling = async () => {
	const { data } = await axios.get(`${API_URL}/dismantling`);
	return data;
};

const dismantlingService = {
	getDismantling,
};

export default dismantlingService;
