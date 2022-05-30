import { __ } from "@wordpress/i18n";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./components/Layout";
import NewOrdersPage from "./pages/orders/NewOrdersPage";
import ViewedOrdersPage from "./pages/orders/ViewedOrdersPage";
import ItemsPage from "./pages/items/ItemsPage";
import NewItemPage from "./pages/items/NewItemPage";
import ServicesPage from "./pages/services/ServicesPage";
import NewServicePage from "./pages/services/NewServicePage";
import VehiclesPage from "./pages/vehicles/VehiclesPage";
import NewVehiclePage from "./pages/vehicles/NewVehiclePage";
import OthersPage from "./pages/others/OthersPage";
import NewOtherPage from "./pages/others/NewOtherPage";
import {
	ITEMS,
	NEW_ITEM,
	NEW_ORDERS,
	NEW_OTHER,
	NEW_SERVICE,
	NEW_VEHICLE,
	OTHERS,
	SERVICES,
	VIEWED_ORDERS,
	VEHICLES,
} from "./constants/pageNamesConstants";

const App = () => {
	const dispatch = useDispatch();
	const { page } = useSelector((state) => state.backendPage);
	useEffect(() => {
		// dispatch(getOrders);
		console.log(page);
	}, [page]);

	return (
		<Layout>
			<div className=" px-4 pt-6">
				<div className="w-full rounded-2xl bg-white p-2">
					<h1 className="text-color-text font-body">
						{__("Admin App", "booking-app")}
					</h1>

					{page === NEW_ORDERS && <NewOrdersPage />}
					{page === VIEWED_ORDERS && <ViewedOrdersPage />}
					{page === ITEMS && <ItemsPage />}
					{page === NEW_ITEM && <NewItemPage />}
					{page === SERVICES && <ServicesPage />}
					{page === NEW_SERVICE && <NewServicePage />}
					{page === VEHICLES && <VehiclesPage />}
					{page === NEW_VEHICLE && <NewVehiclePage />}
					{page === OTHERS && <OthersPage />}
					{page === NEW_OTHER && <NewOtherPage />}
				</div>
			</div>
		</Layout>
	);
};

export default App;
