import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dismantlingService from "./dismantlingService";

const initialState = {
	dismantlingPrice: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const getDismantlingPrice = createAsyncThunk(
	"dismantling/getDismantlingPrice",
	async (__, thunkAPI) => {
		try {
			return await dismantlingService.getDismantling();
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
	name: "dismantling",
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
			.addCase(getDismantlingPrice.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getDismantlingPrice.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.dismantlingPrice = Number(action.payload[0].price);
			})
			.addCase(getDismantlingPrice.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.dismantlingPrice = null;
			});
	},
});

export const { reset } = ordersSlice.actions;
export default ordersSlice.reducer;
