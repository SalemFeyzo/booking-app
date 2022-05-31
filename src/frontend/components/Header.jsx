import { useState } from "react";
import PriceQouteModal from "./PriceQuoteModal";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

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
					className="w-full p-5 rounded-md bg-yellow-100 hover:bg-yellow-200 cursor-pointer md:invisible  "
					onClick={openModal}
				>
					<span>Price Quote</span>
				</div>

				<p className="text-md">Junk Removal</p>
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
