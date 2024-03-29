import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import servicesService from "./servicesService";

const initialState = {
	services: [],
	selectedService: {
		service_id: null,
		name: null,
		min_price: null,
	},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

//get orders
export const getServices = createAsyncThunk(
	"services/getServices",
	async (__, thunkAPI) => {
		try {
			return await servicesService.getServices();
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const servicesSlice = createSlice({
	name: "services",
	initialState,
	reducers: {
		reset: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = "";
		},
		setSelectedService: (state, action) => {
			state.selectedService.service_id = action.payload.service_id;
			state.selectedService.name = action.payload.name;
			state.selectedService.min_price = action.payload.min_price;
		},
		setServicesPrices: (state, action) => {
			state.services = state.services.map((service) => {
				const { junkRemovalPrice, cardboardRemovalPrice, dumpTrailerPrice } =
					action.payload;
				return {
					...service,
					min_price:
						service.name === "Junk Removal"
							? junkRemovalPrice
							: service.name === "Cardboard Removal"
							? cardboardRemovalPrice
							: dumpTrailerPrice,
				};
			});
			const { junkRemovalPrice, cardboardRemovalPrice, dumpTrailerPrice } =
				action.payload;
			state.selectedService.min_price =
				state.selectedService.name === "Junk Removal"
					? junkRemovalPrice
					: state.selectedService.name === "Cardboard Removal"
					? cardboardRemovalPrice
					: dumpTrailerPrice;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getServices.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getServices.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.services = action.payload;
				const defaultService = action.payload.find((s) => s.service_id === "1");
				state.selectedService.service_id = defaultService.service_id;
				state.selectedService.name = defaultService.name;
				state.selectedService.min_price = Number(defaultService.min_price);
			})
			.addCase(getServices.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.services = [];
			});
	},
});

export const { reset, setSelectedService, setServicesPrices } =
	servicesSlice.actions;
export default servicesSlice.reducer;
