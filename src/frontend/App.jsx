import { __ } from "@wordpress/i18n";
import { useState, useEffect, useLayoutEffect } from "react";
import Layout from "./components/Layout";
import PriceQuote from "./sections/PriceQuote";
import ChooseService from "./sections/ChooseService";

const App = () => {
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	useLayoutEffect(() => {
		window.addEventListener("resize", () => {
			setScreenWidth(window.innerWidth);
		});
		return () => {
			window.removeEventListener("resize", () => {
				setScreenWidth(window.innerWidth);
			});
		};
	}, []);

	return (
		<div id="bookingAppLAyout">
			<Layout>
				<div className="col-span-3 px-10 pt-7 bg-white border-2 border-gray-100 rounded-md shadow-md">
					<ChooseService />
				</div>
				{screenWidth > 770 && (
					<div className="col-span-2 px-10 pt-7 bg-white border-2 border-gray-100 rounded-md shadow-md ">
						<PriceQuote />
					</div>
				)}
			</Layout>
		</div>
	);
};

export default App;
