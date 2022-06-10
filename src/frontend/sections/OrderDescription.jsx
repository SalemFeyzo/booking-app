import { useDispatch, useSelector } from "react-redux";
import pickup from "../assets/pickup.svg";
import truck from "../assets/truck.svg";
import {
	DATE_AND_TIME,
	CONTACT_INFO,
} from "../../features/section/sectionConstants";
import { setBackTo, setSection } from "../../features/section/sectionSlice";
import SelectItem from "../components/SelectItem";
import {
	restOrderTotal,
	setOrderVehicleTotal,
	setVehicleType,
} from "../../features/orders/userOrderSlice";

const OrderDescription = () => {
	const dispatch = useDispatch();
	const { order } = useSelector((state) => state.userOrder);
	const { vehicles } = useSelector((state) => state.vehicles);

	return (
		<div>
			<div>
				<p className="text-2xl">
					Please select all of the items and the number of items that need to be
					removed for your booking
				</p>
				<p>
					Please note, our warriors will ONLY pick up the items that you
					selected and paid for.
				</p>
				<p>
					If you have unlisted items, we may reach out to you for an updated
					price quote after reviewing your booking.
				</p>
			</div>
			<SelectItem />
			<p className="text-2xl">Choose a vehicle</p>
			<p>Make your best guess. We will review every order.</p>
			<div className="flex flex-col md:flex-row gap-2">
				{vehicles.map((vehicle) => (
					<div
						id="booking-app-service"
						key={vehicle.vehicle_id}
						className={`
							flex flex-row 
							justify-center items-center gap-2 
							cursor-pointer 
							border-2 
							shadow-md
							${
								order.vehicleType === vehicle.type
									? "border-color-accent text-color-accent hover:bg-yellow-100"
									: "border-gray-200 hover:bg-gray-100"
							}
							rounded-md 
							p-4
							px-10
							`}
						onClick={(e) => {
							dispatch(setVehicleType(vehicle.type));
							dispatch(setOrderVehicleTotal(Number(vehicle.price)));
							dispatch(restOrderTotal());
						}}
					>
						<img
							src={vehicle.vehicle_id === "1" ? pickup : truck}
							alt={vehicle.type}
						/>
						<b>{vehicle.type}</b>
						<span>${Number(vehicle.price).toFixed(2)}</span>
					</div>
				))}
			</div>
			<div className="flex flex-row justify-between items-center my-5">
				<div
					onClick={(e) => {
						dispatch(setBackTo(DATE_AND_TIME));
						dispatch(setSection(DATE_AND_TIME));
					}}
					type="button"
					className="inline-flex justify-center rounded-md border-2 border-color-accent  px-5 py-1 text-lg font-medium text-color-accent hover:bg-yellow-200  cursor-pointer"
				>
					Back
				</div>
				<div
					onClick={(e) => dispatch(setSection(CONTACT_INFO))}
					type="button"
					className="inline-flex justify-center rounded-md border border-transparent bg-color-accent px-5 py-1 text-lg font-medium text-white hover:bg-yellow-500  cursor-pointer"
				>
					Next
				</div>
			</div>
		</div>
	);
};

export default OrderDescription;
