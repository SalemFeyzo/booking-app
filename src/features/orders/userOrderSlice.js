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
		frequency: null,
		items: [],
		itemsTotal: 0,
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

export const setOrder = createAsyncThunk(
	"userOrder/setOrder",
	async (__, thunkAPI) => {
		try {
			const service = await thunkAPI.getState().services.selectedService;
			const { vehicles } = await thunkAPI.getState().vehicles;
			return { vehicles, service };
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
		reset: () => initialState,
		setOrderService: (state, action) => {
			state.order.service = action.payload;
			state.order.items = [];
			state.order.itemsTotal = 0;
			state.order.description = null;
		},
		setOrderServicePrice: (state, action) => {
			state.order.servicePrice = action.payload;
		},
		restOrderTotal: (state, action) => {
			state.order.total =
				state.order.service == "Dump Trailer"
					? (
							state.order.servicePrice +
							state.order.stairsTotal +
							state.order.dismantlingTotal +
							state.order.itemsTotal
					  ).toFixed(2)
					: (
							state.order.servicePrice +
							state.order.vehicleTotal +
							state.order.stairsTotal +
							state.order.dismantlingTotal +
							state.order.itemsTotal
					  ).toFixed(2);
		},
		setVehicleType: (state, action) => {
			state.order.vehicleType = action.payload;
		},
		setOrderVehicleTotal: (state, action) => {
			state.order.vehicleTotal = action.payload;
		},
		setorderAddress: (state, action) => {
			state.order.address = action.payload;
		},
		setOrderDate: (state, action) => {
			state.order.date = action.payload;
		},
		setFrequency: (state, action) => {
			state.order.frequency = action.payload.name;
		},
		setOrderItems: (state, action) => {
			state.order.total = Number(state.order.total) + action.payload.total;
			state.order.items.push(action.payload);
		},
		incrementItemNumber: (state, action) => {
			const item = state.order.items.find((i) => i.id === action.payload);
			item.number += 1;
			item.total = item.price * item.number;
		},
		decrementItemNumber: (state, action) => {
			const item = state.order.items.find((i) => i.id === action.payload);

			if (item.number > 0) {
				item.number -= 1;
				item.total = item.price * item.number;
			}
		},
		deleteItem: (state, action) => {
			const item = state.order.items.find((i) => i.id === action.payload);
			state.order.items = state.order.items.filter((i) => i.id !== item.id);
		},
		setItemsTotal: (state, action) => {
			state.order.itemsTotal = state.order.items.reduce((sum, item) => {
				return sum + item.total;
			}, 0);
		},
		setDismantlingTotal: (state, action) => {
			state.order.dismantlingTotal =
				action.payload * state.order.dismantlingNumber;
		},
		setStairsTotal: (state, action) => {
			state.order.stairsTotal = action.payload * state.order.stairsNumber;
		},
		incrementStairsNumber: (state) => {
			state.order.stairsNumber += 1;
		},
		decrementStairsNumber: (state) => {
			if (state.order.stairsNumber > 0) {
				state.order.stairsNumber -= 1;
			}
		},
		incrementDismantlingNumber: (state) => {
			state.order.dismantlingNumber += 1;
		},
		decrementDismantlingNumber: (state) => {
			if (state.order.dismantlingNumber > 0) {
				state.order.dismantlingNumber -= 1;
			}
		},
		setDescription: (state, action) => {
			state.order.description = action.payload;
		},
		setDumpster: (state, action) => {
			state.order.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(setOrder.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(setOrder.fulfilled, (state, action) => {
				state.isSuccess = true;
				state.isLoading = false;
				state.isSuccess = true;
				const service = action.payload.service;
				const vehicles = action.payload.vehicles;
				const vehicle = vehicles.find((v) => v.vehicle_id === "1");
				state.order.service = service.name;
				state.order.servicePrice = Number(service.min_price);
				state.order.vehicleType = vehicle.type;
				state.order.vehicleTotal = Number(vehicle.price);
				state.order.total =
					state.order.service == "Dump Trailer"
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
			.addCase(setOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const {
	reset,
	setOrderService,
	setOrderServicePrice,
	restOrderTotal,
	setVehicleType,
	setOrderVehicleTotal,
	setorderAddress,
	setOrderDate,
	setFrequency,
	setOrderItems,
	incrementItemNumber,
	decrementItemNumber,
	deleteItem,
	setItemsTotal,
	setDismantlingTotal,
	setStairsTotal,
	incrementDismantlingNumber,
	decrementDismantlingNumber,
	incrementStairsNumber,
	decrementStairsNumber,
	setDescription,
	setDumpster,
} = userOrderSlice.actions;
export default userOrderSlice.reducer;
