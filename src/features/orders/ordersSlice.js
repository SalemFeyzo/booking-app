import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	orders: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

//get orders
export const getOrders = createAsyncThunk((thunkAPI) => {
	console.log("first");
});

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
	extraReducers: () => {},
});

export const { reset } = ordersSlice.actions;
export default ordersSlice.reducer;
