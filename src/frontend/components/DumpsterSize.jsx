import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getServiceItems } from "../../features/service-items/serviceItemsSlice";
import {
	DATE_AND_TIME,
	ORDER_DESCRIPTION,
} from "../../features/section/sectionConstants";
import {
	restOrderTotal,
	setDumpster,
	setItemsTotal,
} from "../../features/orders/userOrderSlice";
import Skeleton from "react-loading-skeleton";

const DumpsterSize = ({ itemsError }) => {
	const { isError, isLoading, isSuccess, message, items, options } =
		useSelector((state) => state.serviceItems);
	const { order } = useSelector((state) => state.userOrder);

	const dispatch = useDispatch();
	const { backTo } = useSelector((state) => state.section);

	useEffect(() => {
		if (!backTo || (backTo !== ORDER_DESCRIPTION && backTo !== DATE_AND_TIME)) {
			dispatch(getServiceItems());
		}
	}, [dispatch, backTo]);
	const plans = items?.map((i) => {
		const id = i.item_id;
		const name = i.name;
		const number = 1;
		const price = Number(i.price);
		const total = Number(i.price);
		return { id, name, number, price, total };
	});
	return (
		<div>
			<p className="text-2xl">Dumpster size</p>
			<p>Please pick dumpster</p>
			{isLoading ? (
				<Skeleton count={8} className=" w-full " />
			) : isError ? (
				<span className="text-red-500 font-bold">{message}</span>
			) : (
				<div className=" w-full">
					{itemsError && <span className="text-red-500">{itemsError}</span>}
					<div className="flex flex-col md:flex-row gap-2 flex-wrap">
						{plans.map((plan) => (
							<div
								id="booking-app-service"
								key={plan.id}
								className={`
							flex flex-row 
							justify-center items-center gap-2 
							cursor-pointer 
							border-2 
							shadow-md
							${
								order.items[0]?.id === plan.id
									? "border-color-accent text-color-accent hover:bg-yellow-100"
									: "border-gray-200 hover:bg-gray-100"
							}
							rounded-md 
							p-4
							px-10
							`}
								onClick={(e) => {
									dispatch(setDumpster([plan]));
									dispatch(setItemsTotal());
									dispatch(restOrderTotal());
								}}
							>
								<b>{plan.name}</b>
								<span>${Number(plan.price).toFixed(2)}</span>
								{order.items[0]?.id === plan.id && (
									<span>
										<FaCheck />
									</span>
								)}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default DumpsterSize;
