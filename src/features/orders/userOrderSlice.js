import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
	order: {
		service: null,
		servicePrice: 0,
		date: null,
		time: null,
		frequency: null,
		vehicleType: null,
		vehicleTotal: 0,
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
		total: 0,
	},
};

export const getDefaultOrderService = createAsyncThunk(
	"userOrder/setupInitialOrderService",
	async (serviceId, thunkAPI) => {
		try {
			const services = await thunkAPI.getState().services;
			return services;
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
export const userOrderSlice = createSlice({
	name: "userOrder",
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
			.addCase(getDefaultOrderService.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getDefaultOrderService.fulfilled, (state, action) => {
				state.isSuccess = true;
				state.isLoading = false;
				state.isSuccess = true;
				const services = action.payload.services;
				const service = services.find((s) => s.service_id === "1");
				state.order.service = service.name;
				state.order.servicePrice = Number(service.min_price);
				state.order.total =
					state.order.service === "Dump Trailer"
						? (
								state.order.servicePrice +
								state.order.stairsTotal +
								state.order.dismantlingTotal
						  ).toFixed(2)
						: (
								state.order.servicePrice +
								state.order.vehicleTotal +
								state.order.stairsTotal +
								state.order.dismantlingTotal
						  ).toFixed(2);
			})
			.addCase(getDefaultOrderService.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset, setOrder } = userOrderSlice.actions;
export default userOrderSlice.reducer;
