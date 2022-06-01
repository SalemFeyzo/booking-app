import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "../store";
import App from "./App";
import "./bookingAppAdmin.css";
import "react-loading-skeleton/dist/skeleton.css";

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("booking-app-admin-settings")
);
