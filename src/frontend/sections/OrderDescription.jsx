import { useDispatch, useSelector } from "react-redux";
import {
	DATE_AND_TIME,
	CONTACT_INFO,
} from "../../features/section/sectionConstants";
import { setSection } from "../../features/section/sectionSlice";
import SelectItem from "../components/SelectItem";

const OrderDescription = () => {
	const dispatch = useDispatch();

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
			<div className="flex flex-row justify-between items-center my-5">
				<div
					onClick={(e) => dispatch(setSection(DATE_AND_TIME))}
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
