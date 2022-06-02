import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import JunkRemoval from "../assets/junk-removal.svg";
import CardboardRemoval from "../assets/cardboard-removal.svg";
import DumpsterRental from "../assets/dumpster-rental.svg";
import { getServices } from "../../features/services/serviceSlice";
import {
	setOrder,
	getDefaultOrderService,
} from "../../features/orders/userOrderSlice";

const ChooseService = () => {
	const { order } = useSelector((state) => state.userOrder);
	const dispatch = useDispatch();
	const { isError, isSuccess, isLoading, message, services } = useSelector(
		(state) => state.services
	);

	useEffect(() => {
		dispatch(getServices());
	}, [dispatch]);
	useEffect(() => {
		if (isSuccess) {
			dispatch(getDefaultOrderService());
		}
	}, [dispatch, isSuccess]);

	return (
		<div>
			<p className="text-2xl">Choose a service</p>
			<p className="text-lg">What do you need?</p>

			{isLoading ? (
				<Skeleton count={3} className=" w-full min-w-max" />
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
									setOrder({
										...order,
										service: service.name,
										servicePrice: Number(service.min_price),
										total:
											order.service === "Dump Trailer"
												? (
														Number(service.min_price) +
														order.stairsTotal +
														order.dismantlingTotal
												  ).toFixed(2)
												: (
														Number(service.min_price) +
														order.vehicleTotal +
														order.stairsTotal +
														order.dismantlingTotal
												  ).toFixed(2),
									})
								);
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
						</div>
					))}
				</div>
			)}
			<span
				onClick={(e) => {
					dispatch(
						setOrder({
							...order,
							vehicleTotal: 5,
							total:
								order.service === "Dump Trailer"
									? (
											order.servicePrice +
											order.stairsTotal +
											order.dismantlingTotal
									  ).toFixed(2)
									: (
											order.servicePrice +
											5 +
											order.stairsTotal +
											order.dismantlingTotal
									  ).toFixed(2),
						})
					);
				}}
			>
				total:{" "}
				{(
					order.servicePrice +
					order.vehicleTotal +
					order.stairsTotal +
					order.dismantlingTotal
				).toFixed(2)}
			</span>
		</div>
	);
};

export default ChooseService;
