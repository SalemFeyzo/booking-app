import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import servicesService from "./servicesService";

const initialState = {
	services: [],
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
			})
			.addCase(getServices.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.services = [];
			});
	},
});

export const { reset } = servicesSlice.actions;
export default servicesSlice.reducer;
