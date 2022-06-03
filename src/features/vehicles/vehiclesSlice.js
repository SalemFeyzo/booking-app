import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import vehiclesService from "./vehiclesService";

const initialState = {
	vehicles: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

//get orders
export const getVehicles = createAsyncThunk(
	"vehicles/getVehicles",
	async (__, thunkAPI) => {
		try {
			return await vehiclesService.getVehicles();
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

export const vehiclesSlice = createSlice({
	name: "vehicles",
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
			.addCase(getVehicles.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getVehicles.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.vehicles = action.payload;
			})
			.addCase(getVehicles.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.vehicles = [];
			});
	},
});

export const { reset } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;
