import { useState } from "react";
import { useSelector } from "react-redux";
import { FaChevronCircleDown } from "react-icons/fa";
import PriceQouteModal from "./PriceQuoteModal";
import {
	CHOOSE_SERVICE,
	DATE_AND_TIME,
	ORDER_DESCRIPTION,
	CONTACT_INFO,
	REVIEW_YOUR_ORDER,
} from "../../features/section/sectionConstants";
import ProgressBar from "./ProgressBar";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { order } = useSelector((state) => state.userOrder);
	const { section } = useSelector((state) => state.section);
	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}
	return (
		<>
			<div>
				<div
					className="w-full p-5 flex flex-row justify-between items-start rounded-md bg-yellow-100 hover:bg-yellow-200 cursor-pointer md:invisible  "
					onClick={openModal}
				>
					<span className="flex flex-row justify-between items-center gap-2">
						Price Quote <FaChevronCircleDown />
					</span>
					<span>${order.total}</span>
				</div>

				<p className="text-md">{order.service}</p>
				<h1 className="text-3xl text-color-primary md:text-5xl">
					{section === CHOOSE_SERVICE
						? "What are you looking for?"
						: "Date and Time"}
				</h1>
			</div>
			<div className="md:invisible">
				<ProgressBar />
			</div>

			<PriceQouteModal closeModal={closeModal} isOpen={isOpen} />
		</>
	);
};

export default Header;
