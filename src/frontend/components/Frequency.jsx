import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setFrequency } from "../../features/orders/userOrderSlice";
const plans = [
	{
		name: "Once",
	},
	{
		name: "Weekly",
	},
	{
		name: "Monthly",
	},
];

export default function Frequency() {
	const dispatch = useDispatch();
	const { order } = useSelector((state) => state.userOrder);

	return (
		<div className="w-full  pb-5">
			<div className="mx-auto w-full">
				<div className="flex flex-row justify-between items-center ">
					{plans.map((plan) => (
						<div
							id="booking-app-service"
							key={plan.name}
							className={`
							flex flex-row 
							justify-center items-center gap-2 
							cursor-pointer 
							border-2 
							shadow-md
							${
								order.frequency === plan.name
									? "border-color-accent text-color-accent hover:bg-yellow-100"
									: "border-gray-200 hover:bg-gray-100"
							}
							rounded-md 
							p-4
							px-10
							`}
							onClick={(e) => {
								dispatch(setFrequency(plan));
							}}
						>
							<b>{plan.name}</b>

							{order.frequency === plan.name && (
								<span>
									<FaCheck />
								</span>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
