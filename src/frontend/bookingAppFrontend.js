import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "../store";
import App from "./App";
import "./bookingAppFrontend.css";
import "react-loading-skeleton/dist/skeleton.css";

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("booking-app")
);
