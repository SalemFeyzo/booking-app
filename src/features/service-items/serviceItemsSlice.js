import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serviceItemsService from "./serviceItemsService";

const initialState = {
	items: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
	options: [],
};

//get service items
export const getServiceItems = createAsyncThunk(
	"serviceItems/getServiceItems",
	async (__, thunkAPI) => {
		try {
			const service_id = await thunkAPI.getState().services.selectedService
				.service_id;
			return await serviceItemsService.getServiceItems(service_id);
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

export const serviceItemsSlice = createSlice({
	name: "serviceItems",
	initialState,
	reducers: {
		reset: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = "";
		},
		setOptions: (state, action) => {
			state.options = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getServiceItems.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getServiceItems.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.items = action.payload;
			})
			.addCase(getServiceItems.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.items = [];
			});
	},
});

export const { reset, setOptions } = serviceItemsSlice.actions;
export default serviceItemsSlice.reducer;
