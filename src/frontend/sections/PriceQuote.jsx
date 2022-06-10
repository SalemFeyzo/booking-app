import { useSelector } from "react-redux";
import { format, parseISO } from "date-fns";

const PriceQuote = () => {
	const { order } = useSelector((state) => state.userOrder);

	return (
		<div className="h-full ">
			<b className="text-2xl">Price Quote</b>
			<ul className=" h-[15rem] flex flex-col justify-between ">
				<ul>
					<li className=" m-1 ">
						<div className="flex flex-row justify-between items-center border-b-2 border-gray-100 w-full ">
							<span>{order.service}</span>
							<span>${Number(order.servicePrice).toFixed(2)}</span>
						</div>
					</li>
					{order.service === "Dump Trailer" ? (
						""
					) : (
						<li className=" m-1">
							<div className="flex flex-row justify-between items-center border-b-2 border-gray-100 w-full ">
								<span>Vehicle Size: {order.vehicleType}</span>
								<span>${order.vehicleTotal.toFixed(2)}</span>
							</div>
						</li>
					)}
					{order.itemsTotal ? (
						<li className=" m-1">
							<div className="flex flex-row justify-between items-center border-b-2 border-gray-100 w-full ">
								<span>Items Total: </span>
								<span>${order.itemsTotal.toFixed(2)}</span>
							</div>
						</li>
					) : (
						""
					)}
				</ul>
				<li>
					<b className="text-md text-color-accent">Booking Details:</b>
					<ul className="divide-y text-sm">
						<div className="border-b-2 border-gray-100 w-full text-sm">
							{order.address && <li>{order.address}</li>}
							{order.date && (
								<li>{format(parseISO(order.date), "MMMM d, yyyy h:mm aa")}</li>
							)}
							{/* <li className="grid grid-cols-2 grid-rows-1  m-1">
								<span className="will-change-transform col-span-1">
									Basketball Hoop (unattached to the ground) (x1)
								</span>
								<span className="col-span-1 text-right">$35</span>
							</li> */}
						</div>
					</ul>
				</li>
				<li className="flex flex-row justify-between items-center m-1">
					<b className="text-lg">Total</b>
					<span>
						<b>${order.total}</b>
					</span>
				</li>
			</ul>
		</div>
	);
};

export default PriceQuote;
