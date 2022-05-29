import { __ } from "@wordpress/i18n";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./components/Layout";
import NewOrdersPage from "./components/pages/orders/NewOrdersPage";
import ViewedOrdersPage from "./components/pages/orders/ViewedOrdersPage";
import ItemsPage from "./components/pages/items/ItemsPage";
import NewItemPage from "./components/pages/items/NewItemPage";
import ServicesPage from "./components/pages/services/ServicesPage";
import NewServicePage from "./components/pages/services/NewServicePage";
import VehiclesPage from "./components/pages/vehicles/VehiclesPage";
import NewVehiclePage from "./components/pages/vehicles/NewVehiclePage";
import OthersPage from "./components/pages/others/OthersPage";
import NewOtherPage from "./components/pages/others/NewOtherPage";
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
