import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./features/orders/ordersSlice";
import pagesReducer from "./features/backend-pages/pagesSlice";
import servicesReducer from "./features/services/serviceSlice";
import userOrderReducer from "./features/orders/userOrderSlice";

const store = configureStore({
	reducer: {
		orders: ordersReducer,
		backendPage: pagesReducer,
		services: servicesReducer,
		userOrder: userOrderReducer,
	},
});

export default store;
