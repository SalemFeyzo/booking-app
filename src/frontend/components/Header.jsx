import { useState } from "react";
import { useSelector } from "react-redux";
import PriceQouteModal from "./PriceQuoteModal";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { order } = useSelector((state) => state.userOrder);
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
					<span>Price Quote</span>
					<span>${order.total}</span>
				</div>

				<p className="text-md">{order.service}</p>
				<h1 className="text-3xl text-color-primary md:text-5xl">
					What are you looking for?
				</h1>
			</div>
			<PriceQouteModal
				closeModal={closeModal}
				isOpen={isOpen}
				ariaModal={true}
				ariaHidden={false}
			/>
		</>
	);
};

export default Header;
