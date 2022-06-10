import axios from "axios";
import { API_URL } from "../API_URL";

const getStairs = async () => {
	const { data } = await axios.get(`${API_URL}/stairs`);
	return data;
};

const stairsService = {
	getStairs,
};

export default stairsService;
