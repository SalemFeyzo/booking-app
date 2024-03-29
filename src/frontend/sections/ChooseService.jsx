import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import SelectAddress from "../components/SelectAddress";
import JunkRemoval from "../assets/junk-removal.svg";
import CardboardRemoval from "../assets/cardboard-removal.svg";
import DumpsterRental from "../assets/dumpster-rental.svg";
import {
	getServices,
	setSelectedService,
} from "../../features/services/serviceSlice";
import {
	setOrder,
	setOrderService,
	setOrderServicePrice,
	restOrderTotal,
	setOrderVehicleTotal,
	setVehicleType,
} from "../../features/orders/userOrderSlice";
import { getVehicles } from "../../features/vehicles/vehiclesSlice";
import { setSection } from "../../features/section/sectionSlice";
import {
	CHOOSE_SERVICE,
	DATE_AND_TIME,
} from "../../features/section/sectionConstants";
import { FaCheck } from "react-icons/fa";

const ChooseService = () => {
	const [errorMessage, setErrorMessage] = useState(null);
	const { order } = useSelector((state) => state.userOrder);
	const dispatch = useDispatch();
	const {
		isError,
		isSuccess: isSuccessServices,
		isLoading,
		message,
		services,
	} = useSelector((state) => state.services);
	const { vehicles, isSuccess: isSuccessVehicles } = useSelector(
		(state) => state.vehicles
	);
	const { backTo } = useSelector((state) => state.section);
	useEffect(() => {
		if (!backTo || backTo !== CHOOSE_SERVICE) {
			dispatch(getServices());
			dispatch(getVehicles());
		}
	}, [dispatch, backTo]);
	useEffect(() => {
		if (isSuccessVehicles && isSuccessServices) {
			if (!backTo || backTo !== CHOOSE_SERVICE)
				dispatch(setOrder({ ...order }));
		}
	}, [dispatch, isSuccessVehicles, isSuccessServices, backTo]);

	return (
		<div className="pb-20">
			<p className="text-2xl">Choose a service</p>
			<p className="text-lg">What do you need?</p>
			{isLoading ? (
				<Skeleton count={4} className=" w-full " />
			) : isError ? (
				<span className="text-red-500 font-bold">{message}</span>
			) : (
				<div className="flex flex-col md:flex-row gap-2">
					{services.map((service) => (
						<div
							id="booking-app-service"
							key={service.service_id}
							className={`
							flex flex-row 
							justify-center items-center gap-2 
							cursor-pointer 
							border-2 
							shadow-md
							${
								order.service === service.name
									? "border-color-accent text-color-accent hover:bg-yellow-100"
									: "border-gray-200 hover:bg-gray-100"
							}
							rounded-md 
							p-4
							px-10
							`}
							onClick={(e) => {
								dispatch(
									setSelectedService({
										service_id: service.service_id,
										name: service.name,
										min_price: Number(service.min_price),
									})
								);
								dispatch(setOrderService(service.name));
								dispatch(setOrderServicePrice(Number(service.min_price)));
								dispatch(restOrderTotal());
							}}
						>
							<img
								src={
									service.name === "Junk Removal"
										? JunkRemoval
										: service.name === "Cardboard Removal"
										? CardboardRemoval
										: service.name === "Dump Trailer"
										? DumpsterRental
										: JunkRemoval
								}
								alt={service.name}
							/>
							<b>{service.name}</b>
							<span>${Number(service.min_price).toFixed(2)}</span>
							{order.service === service.name && (
								<span>
									<FaCheck />
								</span>
							)}
						</div>
					))}
				</div>
			)}
			<SelectAddress
				errorMessage={errorMessage}
				setErrorMessage={setErrorMessage}
			/>
			<div
				onClick={(e) => {
					e.preventDefault();

					if (order.address !== null) {
						dispatch(setSection(DATE_AND_TIME));
					} else {
						setErrorMessage("This field is required");
					}
				}}
				type="button"
				className={`inline-flex justify-center rounded-md border border-transparent bg-color-accent text-white hover:bg-yellow-500 cursor-pointer px-5 py-1 text-lg font-medium   float-right`}
			>
				Next
			</div>
		</div>
	);
};

export default ChooseService;
