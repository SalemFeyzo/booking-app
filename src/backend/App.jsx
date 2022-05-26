import { __ } from "@wordpress/i18n";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOrders, reset } from "../features/orders/ordersSlice";

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getOrders);
	}, [dispatch]);

	return (
		<div className=" ">
			<h1 className="text-color-text font-body">
				{__("Admin App", "booking-app")}
			</h1>
		</div>
	);
};

export default App;
