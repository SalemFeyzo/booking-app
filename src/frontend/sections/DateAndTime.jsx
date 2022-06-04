import { useState } from "react";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { useDispatch, useSelector } from "react-redux";
import { setOrderDate } from "../../features/orders/userOrderSlice";

const DateAndTime = () => {
	const [startDate, setStartDate] = useState(
		setHours(setMinutes(new Date(), 30), 16)
	);
	const dispatch = useDispatch();
	return (
		<div>
			<DatePicker
				className="w-full"
				showTimeSelect
				minDate={new Date()}
				selected={startDate}
				onChange={(date) => {
					setStartDate(date);
					dispatch(setOrderDate(date.toISOString()));
				}}
				withPortal
				shouldCloseOnSelect={false}
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
				timeClassName={(s) => " hover:bg-red-200"}
			/>
		</div>
	);
};

export default DateAndTime;
