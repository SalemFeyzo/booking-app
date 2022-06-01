import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { getServices } from "../../features/services/serviceSlice";
import JunkRemoval from "../assets/junk-removal.svg";
import CardboardRemoval from "../assets/cardboard-removal.svg";
import DumpsterRental from "../assets/dumpster-rental.svg";

const ChooseService = () => {
	const [selected, setSelected] = useState("1");
	const dispatch = useDispatch();
	const { isError, isLoading, message, services } = useSelector(
		(state) => state.services
	);

	useEffect(() => {
		dispatch(getServices());
	}, [dispatch]);

	return (
		<div>
			<p className="text-2xl">Choose a service</p>
			<p>What do you need?</p>

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
								selected === service.service_id
									? "border-color-accent text-color-accent hover:bg-yellow-100"
									: "border-gray-200 hover:bg-gray-100"
							}
							rounded-md 
							p-5 
							
							`}
							onClick={(e) => setSelected(service.service_id)}
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
							<span>${service.min_price}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ChooseService;
