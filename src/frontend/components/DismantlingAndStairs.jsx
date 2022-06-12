import { useEffect } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
	DATE_AND_TIME,
	ORDER_DESCRIPTION,
} from "../../features/section/sectionConstants";
import { getDismantlingPrice } from "../../features/dismantling/dismantlingSlice";
import { getStairsPrice } from "../../features/stairs/stairsSlice";
import {
	setDismantlingTotal,
	setStairsTotal,
	decrementDismantlingNumber,
	incrementDismantlingNumber,
	decrementStairsNumber,
	incrementStairsNumber,
	restOrderTotal,
} from "../../features/orders/userOrderSlice";

const DismantlingAndStairs = () => {
	const dispatch = useDispatch();
	const { backTo } = useSelector((state) => state.section);
	const { dismantlingPrice } = useSelector((state) => state.dismantling);
	const { stairsPrice } = useSelector((state) => state.stairs);
	const { order } = useSelector((state) => state.userOrder);
	useEffect(() => {
		if (!backTo || (backTo !== ORDER_DESCRIPTION && backTo !== DATE_AND_TIME)) {
			dispatch(getDismantlingPrice());
			dispatch(getStairsPrice());
		}
	}, [dispatch, backTo]);

	return (
		<div>
			<p className="text-2xl">Stairs</p>
			<p>Does the provider need to climb stairs?</p>
			<div className="flex flex-col justify-between items-center border-2 my-2 border-gray-200 rounded-md p-4 md:flex-row gap-3 shadow-md">
				<div className="w-full md:w-[70%]">${stairsPrice} per flight</div>

				<div className="flex flex-row justify-center items-center w-full gap-5 md:w-[30%] md:justify-between md:gap-0">
					<span>Total: ${order.stairsTotal}</span>
					<span
						className="text-xl text-color-accent cursor-pointer"
						onClick={(e) => {
							dispatch(decrementStairsNumber());
							dispatch(setStairsTotal(stairsPrice));
							dispatch(restOrderTotal());
						}}
					>
						<FaMinusCircle />
					</span>
					<span>{order.stairsNumber}</span>
					<span
						className="text-xl text-color-accent cursor-pointer"
						onClick={(e) => {
							dispatch(incrementStairsNumber());
							dispatch(setStairsTotal(stairsPrice));
							dispatch(restOrderTotal());
						}}
					>
						<FaPlusCircle />
					</span>
				</div>
			</div>
			<p className="text-2xl">Dismantling</p>
			<p>Does one of your items require dismantling?</p>
			<div className="flex flex-col justify-between items-center border-2 my-2 border-gray-200 rounded-md p-4 md:flex-row gap-3 shadow-md">
				<div className="w-full md:w-[70%]">${dismantlingPrice} per item</div>

				<div className="flex flex-row justify-center items-center w-full gap-5 md:w-[30%] md:justify-between md:gap-0">
					<span>Total: ${order.dismantlingTotal}</span>
					<span
						className="text-xl text-color-accent cursor-pointer"
						onClick={(e) => {
							dispatch(decrementDismantlingNumber());
							dispatch(setDismantlingTotal(dismantlingPrice));
							dispatch(restOrderTotal());
						}}
					>
						<FaMinusCircle />
					</span>
					<span>{order.dismantlingNumber}</span>
					<span
						className="text-xl text-color-accent cursor-pointer"
						onClick={(e) => {
							dispatch(incrementDismantlingNumber());
							dispatch(setDismantlingTotal(dismantlingPrice));
							dispatch(restOrderTotal());
						}}
					>
						<FaPlusCircle />
					</span>
				</div>
			</div>
		</div>
	);
};

export default DismantlingAndStairs;
