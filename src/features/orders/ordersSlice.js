import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ordersService from "./ordersService";

const initialState = {
	orders: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
	order: {
		service: null,
		servicePrice: null,
		date: null,
		time: null,
		frequency: null,
		vehicleType: "Pick - Up Truck",
		vehicleTotal: 15,
		stairsNumber: 0,
		stairsTotal: 0,
		dismantlingNumber: 0,
		dismantlingTotal: 0,
		description: null,
		companyName: null,
		address: null,
		firstName: null,
		lastName: null,
		email: null,
		mobileNumber: null,
		total: 90,
	},
};

//get orders
export const getOrders = createAsyncThunk(
	"orders/getOrders",
	async (__, thunkAPI) => {
		try {
			return await ordersService.getOrders();
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
export const getDefaultOrderService = createAsyncThunk(
	"orders/setupInitialOrderService",
	async (serviceId, thunkAPI) => {
		const services = await thunkAPI
			.getState()
			.services.find((service) => Number(service.id) === 1);
		const service = services.find((service) => Number(service.id) === 1);

		return await service;
	}
);
export const ordersSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		reset: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = "";
		},
		setOrder: (state, action) => {
			state.order = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getOrders.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getOrders.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.orders = action.payload;
			})
			.addCase(getOrders.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.orders = [];
			});
	},
});

export const { reset, setOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
