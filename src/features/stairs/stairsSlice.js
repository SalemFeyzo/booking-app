import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import stairsService from "./stairsService";

const initialState = {
	stairsPrice: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const getStairsPrice = createAsyncThunk(
	"stairs/getStairsPrice",
	async (__, thunkAPI) => {
		try {
			return await stairsService.getStairs();
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
	name: "stairs",
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
			.addCase(getStairsPrice.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getStairsPrice.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.stairsPrice = Number(action.payload[0].price);
			})
			.addCase(getStairsPrice.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.stairsPrice = null;
			});
	},
});

export const { reset } = ordersSlice.actions;
export default ordersSlice.reducer;
