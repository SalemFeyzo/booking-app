import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ordersService from "./ordersService";

const initialState = {
	orders: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
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

export const { reset } = ordersSlice.actions;
export default ordersSlice.reducer;
