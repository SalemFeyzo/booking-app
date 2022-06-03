import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import addressesService from "./addressesService";

const initialState = {
	addresses: [],
	selectedAddress: {
		county: null,
		city: null,
		zip: null,
		junkRemoval: null,
		cardboardRemoval: null,
		dumpTrailer: null,
	},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

//get orders
export const getAddresses = createAsyncThunk(
	"addresses/getAddresses",
	async (__, thunkAPI) => {
		try {
			return await addressesService.getAddresses();
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

export const addressesSlice = createSlice({
	name: "addresses",
	initialState,
	reducers: {
		reset: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = "";
		},
		setSelectedAddress: (state, action) => {
			state.selectedAddress.county = action.payload.county;
			state.selectedAddress.city = action.payload.city;
			state.selectedAddress.zip = action.payload.zip;
			state.selectedAddress.junkRemoval = Number(action.payload.junk_removal);
			state.selectedAddress.cardboardRemoval = Number(
				action.payload.cardboard_removal
			);
			state.selectedAddress.dumpTrailer = Number(action.payload.dump_trailer);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAddresses.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAddresses.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.addresses = action.payload;
			})
			.addCase(getAddresses.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.addresses = [];
			});
	},
});

export const { reset, setSelectedAddress } = addressesSlice.actions;
export default addressesSlice.reducer;
