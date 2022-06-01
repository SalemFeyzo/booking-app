import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./features/orders/ordersSlice";
import pagesReducer from "./features/backend-pages/pagesSlice";
import servicesReducer from "./features/services/serviceSlice";

const store = configureStore({
	reducer: {
		orders: ordersReducer,
		backendPage: pagesReducer,
		services: servicesReducer,
	},
});

export default store;
