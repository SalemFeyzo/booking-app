import { useSelector } from "react-redux";
import {
	CHOOSE_SERVICE,
	DATE_AND_TIME,
	ORDER_DESCRIPTION,
	CONTACT_INFO,
	REVIEW_YOUR_ORDER,
} from "../../features/section/sectionConstants";

const ProgressBar = () => {
	const { section } = useSelector((state) => state.section);
	return (
		<div className={`w-full h-[1rem] bg-yellow-200 my-4 rounded-md `}>
			<div
				className={`rounded-md ${
					section === CHOOSE_SERVICE
						? "w-[20%]"
						: section === DATE_AND_TIME
						? "w-[40%]"
						: "w-[60%]"
				} h-full bg-color-accent transition-width transition-slowest ease`}
			></div>
		</div>
	);
};

export default ProgressBar;
