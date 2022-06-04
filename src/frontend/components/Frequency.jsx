import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
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
	const [selected, setSelected] = useState(plans[0]);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setFrequency(selected));
	}, [dispatch]);

	return (
		<div className="w-full  pb-5">
			<div className="mx-auto w-full">
				<RadioGroup value={selected} onChange={setSelected}>
					<RadioGroup.Label className="sr-only">Frequency</RadioGroup.Label>
					<div className="flex flex-row justify-between items-center ">
						{plans.map((plan) => (
							<RadioGroup.Option
								key={plan.name}
								value={plan}
								onClick={(e) => dispatch(setFrequency(plan))}
								className={({ active, checked }) =>
									`${active ? "border-2 border-color-accent" : ""}
                                    ${
																			checked
																				? "bg-yellow-50 text-color-accent border-2 border-color-accent"
																				: "bg-white"
																		}
                                     w-[30%]  flex cursor-pointer rounded-md px-5 py-2 shadow-md focus:outline-none`
								}
							>
								{({ active, checked }) => (
									<>
										<div className="flex w-full items-center justify-between">
											<RadioGroup.Label as="span">{plan.name}</RadioGroup.Label>

											{checked && (
												<div className="shrink-0 ">
													<FaCheck className=" " />
												</div>
											)}
										</div>
									</>
								)}
							</RadioGroup.Option>
						))}
					</div>
				</RadioGroup>
			</div>
		</div>
	);
}
