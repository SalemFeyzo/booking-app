import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { useDispatch, useSelector } from "react-redux";
import { setOrderDate } from "../../features/orders/userOrderSlice";
import { setSection } from "../../features/section/sectionSlice";
import {
	CHOOSE_SERVICE,
	ORDER_DESCRIPTION,
} from "../../features/section/sectionConstants";
import Frequency from "../components/Frequency";

const DateAndTime = () => {
	const [startDate, setStartDate] = useState(
		setHours(setMinutes(new Date(), 30), 16)
	);
	const [errorMessage, setErrorMessage] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setOrderDate(startDate.toISOString()));
	}, [dispatch]);
	console.log(errorMessage);
	return (
		<div>
			<div>
				<p className="text-2xl">Pickup a Date And Time</p>
			</div>
			{errorMessage && <span className="text-red-500">{errorMessage} </span>}
			<DatePicker
				className="w-full "
				showTimeSelect
				minDate={new Date()}
				selected={startDate}
				onChange={(date) => {
					setStartDate(date);
					dispatch(setOrderDate(date.toISOString()));
				}}
				withPortal
				shouldCloseOnSelect={true}
				timeIntervals={60}
				excludeTimes={[
					setHours(setMinutes(new Date(), 0), 21),
					setHours(setMinutes(new Date(), 0), 22),
					setHours(setMinutes(new Date(), 0), 23),
					setHours(setMinutes(new Date(), 0), 24),
					setHours(setMinutes(new Date(), 0), 0),
					setHours(setMinutes(new Date(), 0), 1),
					setHours(setMinutes(new Date(), 0), 2),
					setHours(setMinutes(new Date(), 0), 3),
					setHours(setMinutes(new Date(), 0), 4),
					setHours(setMinutes(new Date(), 0), 5),
					setHours(setMinutes(new Date(), 0), 6),
					setHours(setMinutes(new Date(), 0), 7),
				]}
				dateFormat="MMMM d, yyyy h:mm aa"
			/>
			<div>
				<p className="text-2xl pt-8">Frequency</p>
				<Frequency />
			</div>
			<div className="flex flex-row justify-between items-center my-5">
				<div
					onClick={(e) => dispatch(setSection(CHOOSE_SERVICE))}
					type="button"
					className="inline-flex justify-center rounded-md border-2 border-color-accent  px-5 py-1 text-lg font-medium text-color-accent hover:bg-yellow-200  cursor-pointer"
				>
					Back
				</div>
				<div
					onClick={(e) => {
						const now = setHours(setMinutes(new Date(), 30), 16);
						if (startDate.toISOString() <= now.toISOString()) {
							setErrorMessage("field is required");
						} else {
							setErrorMessage(null);
							dispatch(setSection(ORDER_DESCRIPTION));
						}
					}}
					type="button"
					className="inline-flex justify-center rounded-md border border-transparent bg-color-accent px-5 py-1 text-lg font-medium text-white hover:bg-yellow-500  cursor-pointer"
				>
					Next
				</div>
			</div>
		</div>
	);
};

export default DateAndTime;
