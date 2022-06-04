import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./features/orders/ordersSlice";
import pagesReducer from "./features/backend-pages/pagesSlice";
import servicesReducer from "./features/services/serviceSlice";
import userOrderReducer from "./features/orders/userOrderSlice";
import vehiclesReducer from "./features/vehicles/vehiclesSlice";
import addressesReducer from "./features/addresses/addressesSlice";
import sectionReducer from "./features/section/sectionSlice";

const store = configureStore({
	reducer: {
		orders: ordersReducer,
		backendPage: pagesReducer,
		services: servicesReducer,
		userOrder: userOrderReducer,
		vehicles: vehiclesReducer,
		addresses: addressesReducer,
		section: sectionReducer,
	},
});

export default store;
