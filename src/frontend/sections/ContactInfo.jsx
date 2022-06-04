import { useDispatch, useSelector } from "react-redux";
import {
	REVIEW_YOUR_ORDER,
	ORDER_DESCRIPTION,
} from "../../features/section/sectionConstants";
import { setSection } from "../../features/section/sectionSlice";

const ContactInfo = () => {
	const dispatch = useDispatch();
	return (
		<div>
			ContactInfo
			<div className="flex flex-row justify-between items-center my-5">
				<div
					onClick={(e) => dispatch(setSection(ORDER_DESCRIPTION))}
					type="button"
					className="inline-flex justify-center rounded-md border-2 border-color-accent  px-5 py-1 text-lg font-medium text-color-accent hover:bg-yellow-200  cursor-pointer"
				>
					Back
				</div>
				<div
					onClick={(e) => dispatch(setSection(REVIEW_YOUR_ORDER))}
					type="button"
					className="inline-flex justify-center rounded-md border border-transparent bg-color-accent px-5 py-1 text-lg font-medium text-white hover:bg-yellow-500  cursor-pointer"
				>
					Next
				</div>
			</div>
		</div>
	);
};

export default ContactInfo;
