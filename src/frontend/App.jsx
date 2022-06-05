import { __ } from "@wordpress/i18n";
import { Transition } from "@headlessui/react";
import { useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "./components/Layout";
import PriceQuote from "./sections/PriceQuote";
import ChooseService from "./sections/ChooseService";
import DateAndTime from "./sections/DateAndTime";
import OrderDescription from "./sections/OrderDescription";
import ContactInfo from "./sections/ContactInfo";
import ReviewYourOrder from "./sections/ReviewYourOrder";
import {
	CHOOSE_SERVICE,
	DATE_AND_TIME,
	ORDER_DESCRIPTION,
	CONTACT_INFO,
	REVIEW_YOUR_ORDER,
} from "../features/section/sectionConstants";
import ProgressBar from "./components/ProgressBar";

const App = () => {
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const { section } = useSelector((state) => state.section);
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
		<div id="bookingAppLAyout" className="w-full h-full">
			<Layout>
				<div className="flex flex-col justify-between gap-2 w-full md:w-[75%]">
					<Transition show={section === CHOOSE_SERVICE}>
						{section === CHOOSE_SERVICE && (
							<div className="px-10 pt-7 bg-white border-2 border-gray-100 rounded-md shadow-md ">
								<Transition.Child
									enter="transition-opacity ease-linear duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="transition-opacity ease-linear duration-300"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<ChooseService />
								</Transition.Child>
							</div>
						)}
					</Transition>
					<Transition show={section === DATE_AND_TIME}>
						{section === DATE_AND_TIME && (
							<div className="px-10 pt-7 bg-white border-2 border-gray-100 rounded-md shadow-md ">
								<Transition.Child
									enter="transition-opacity ease-linear duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="transition-opacity ease-linear duration-300"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<DateAndTime />
								</Transition.Child>
							</div>
						)}
					</Transition>
					<Transition show={section === ORDER_DESCRIPTION}>
						{section === ORDER_DESCRIPTION && (
							<div className="px-10 pt-7 bg-white border-2 border-gray-100 rounded-md shadow-md ">
								<Transition.Child
									enter="transition-opacity ease-linear duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="transition-opacity ease-linear duration-300"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<OrderDescription />
								</Transition.Child>
							</div>
						)}
					</Transition>
					<Transition show={section === CONTACT_INFO}>
						{section === CONTACT_INFO && (
							<div className="px-10 pt-7 bg-white border-2 border-gray-100 rounded-md shadow-md ">
								<Transition.Child
									enter="transition-opacity ease-linear duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="transition-opacity ease-linear duration-300"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<ContactInfo />
								</Transition.Child>
							</div>
						)}
					</Transition>
					<Transition show={section === REVIEW_YOUR_ORDER}>
						{section === REVIEW_YOUR_ORDER && (
							<div className="px-10 pt-7 bg-white border-2 border-gray-100 rounded-md shadow-md ">
								<Transition.Child
									enter="transition-opacity ease-linear duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="transition-opacity ease-linear duration-300"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<ReviewYourOrder />
								</Transition.Child>
							</div>
						)}
					</Transition>
				</div>
				{screenWidth > 770 && (
					<div className="flex flex-col  w-[37%] h-[25rem]">
						<span>Your progress</span>
						<ProgressBar />
						<div className="w-[100%] h-[100%] px-10 pt-7 bg-white border-2 border-gray-100 rounded-md shadow-md ">
							<PriceQuote />
						</div>
					</div>
				)}
			</Layout>
		</div>
	);
};

export default App;
