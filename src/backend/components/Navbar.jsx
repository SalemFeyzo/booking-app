import { __ } from "@wordpress/i18n";
import { Disclosure } from "@headlessui/react";
import { FaChevronCircleUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../features/backend-pages/pagesSlice";
import {
	ITEMS,
	NEW_ITEM,
	NEW_ORDERS,
	NEW_OTHER,
	NEW_SERVICE,
	NEW_VEHICLE,
	OTHERS,
	SERVICES,
	VIEWED_ORDERS,
	VEHICLES,
} from "../constants/pageNamesConstants";

const Navbar = () => {
	const dispatch = useDispatch();
	const { page } = useSelector((state) => state.backendPage);
	return (
		<div className="w-full pt-6">
			<div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
				<Disclosure defaultOpen>
					{({ open }) => (
						<>
							<Disclosure.Button className="flex w-full justify-between rounded-lg bg-white px-4 py-2 text-left text-sm font-medium text-color-text hover:bg-yellow-100 focus:outline-none ">
								<span>
									<b>{__("Orders", "booking-app")}</b>
								</span>
								<FaChevronCircleUp
									className={`${
										open ? "rotate-180 transform" : ""
									} h-5 w-5 text-color-accent`}
								/>
							</Disclosure.Button>
							<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
								<ul>
									<li
										className={` ${
											page === NEW_ORDERS ? "bg-yellow-100 " : ""
										} flex justify-between cursor-pointer p-1 rounded-lg hover:bg-yellow-100`}
										onClick={() => dispatch(setPage(NEW_ORDERS))}
									>
										New Orders{" "}
										<span className=" text-red-700 ">
											<b>200</b>
										</span>
									</li>
									<li
										className={` ${
											page === VIEWED_ORDERS ? "bg-yellow-100 " : ""
										} cursor-pointer p-1 rounded-lg hover:bg-yellow-100`}
										onClick={() => dispatch(setPage(VIEWED_ORDERS))}
									>
										Viewed Orders
									</li>
								</ul>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
				<Disclosure>
					{({ open }) => (
						<>
							<Disclosure.Button className="flex w-full justify-between rounded-lg bg-white px-4 py-2 text-left text-sm font-medium text-color-text hover:bg-yellow-100 focus:outline-none ">
								<span>
									<b>Services</b>
								</span>
								<FaChevronCircleUp
									className={`${
										open ? "rotate-180 transform" : ""
									} h-5 w-5 text-color-accent`}
								/>
							</Disclosure.Button>
							<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
								<ul>
									<li
										className={` ${
											page === SERVICES ? "bg-yellow-100 " : ""
										}  cursor-pointer p-1 rounded-lg hover:bg-yellow-100`}
										onClick={() => dispatch(setPage(SERVICES))}
									>
										Services
									</li>
									<li
										className={` ${
											page === NEW_SERVICE ? "bg-yellow-100 " : ""
										}  cursor-pointer p-1 rounded-lg hover:bg-yellow-100`}
										onClick={() => dispatch(setPage(NEW_SERVICE))}
									>
										New Service
									</li>
								</ul>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
				<Disclosure>
					{({ open }) => (
						<>
							<Disclosure.Button className="flex w-full justify-between rounded-lg bg-white px-4 py-2 text-left text-sm font-medium text-color-text hover:bg-yellow-100 focus:outline-none ">
								<span>
									<b>Items</b>
								</span>
								<FaChevronCircleUp
									className={`${
										open ? "rotate-180 transform" : ""
									} h-5 w-5 text-color-accent`}
								/>
							</Disclosure.Button>
							<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
								<ul>
									<li
										className={` ${
											page === ITEMS ? "bg-yellow-100 " : ""
										} cursor-pointer p-1 rounded-lg hover:bg-yellow-100`}
										onClick={() => dispatch(setPage(ITEMS))}
									>
										Items
									</li>
									<li
										className={` ${
											page === NEW_ITEM ? "bg-yellow-100 " : ""
										} cursor-pointer p-1 rounded-lg hover:bg-yellow-100`}
										onClick={() => dispatch(setPage(NEW_ITEM))}
									>
										New Item
									</li>
								</ul>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
				<Disclosure>
					{({ open }) => (
						<>
							<Disclosure.Button className="flex w-full justify-between rounded-lg bg-white px-4 py-2 text-left text-sm font-medium text-color-text hover:bg-yellow-100 focus:outline-none ">
								<span>
									<b>Vehicles</b>
								</span>
								<FaChevronCircleUp
									className={`${
										open ? "rotate-180 transform" : ""
									} h-5 w-5 text-color-accent`}
								/>
							</Disclosure.Button>
							<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
								<ul>
									<li
										className={`${
											page === VEHICLES ? "bg-yellow-100 " : ""
										}  cursor-pointer p-1 rounded-lg  hover:bg-yellow-100`}
										onClick={() => dispatch(setPage(VEHICLES))}
									>
										Vehicles
									</li>
									<li
										className={`cursor-pointer p-1 rounded-lg ${
											page === NEW_VEHICLE ? "bg-yellow-100 " : ""
										} hover:bg-yellow-100`}
										onClick={() => dispatch(setPage(NEW_VEHICLE))}
									>
										New Vehicle
									</li>
								</ul>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
				<Disclosure>
					{({ open }) => (
						<>
							<Disclosure.Button className="flex w-full justify-between rounded-lg bg-white px-4 py-2 text-left text-sm font-medium text-color-text hover:bg-yellow-100 focus:outline-none ">
								<span>
									<b>Others</b>
								</span>
								<FaChevronCircleUp
									className={`${
										open ? "rotate-180 transform" : ""
									} h-5 w-5 text-color-accent`}
								/>
							</Disclosure.Button>
							<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
								<ul>
									<li
										className={`${
											page === OTHERS ? "bg-yellow-100 " : ""
										} cursor-pointer p-1 rounded-lg hover:bg-yellow-100`}
										onClick={() => dispatch(setPage(OTHERS))}
									>
										All
									</li>
									<li
										className={`${
											page === NEW_OTHER ? "bg-yellow-100 " : ""
										} cursor-pointer p-1 rounded-lg hover:bg-yellow-100 `}
										onClick={() => dispatch(setPage(NEW_OTHER))}
									>
										New
									</li>
								</ul>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
		</div>
	);
};

export default Navbar;
