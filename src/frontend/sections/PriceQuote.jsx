import React from "react";

const PriceQuote = () => {
	return (
		<div>
			<b className="text-2xl">Price Quote</b>
			<ul className="flex flex-col justify-between  divide-y">
				<li className="flex flex-row justify-between items-center m-1">
					<span>Junk Removal</span>
					<span>$80</span>
				</li>
				<li className="flex flex-row justify-between items-center m-1">
					<span>Vehicle Size: Pick - Up Truck</span>
					<span>$15</span>
				</li>
				<li>
					<b className="text-md text-color-accent">Booking Details:</b>
					<ul className="divide-y text-sm">
						<li>10005 Greenbrier Road, Hopkins, MN, USA</li>
						<li>Tuesday, May 31 at 12 PM</li>
						<li className="grid grid-cols-2 grid-rows-1  m-1">
							<span className="will-change-transform col-span-1">
								Basketball Hoop (unattached to the ground) (x1)
							</span>
							<span className="col-span-1 text-right">$35</span>
						</li>
					</ul>
				</li>
				<li className="flex flex-row justify-between items-center m-1">
					<b className="text-lg">Total</b>
					<span>
						<b>$95.00</b>
					</span>
				</li>
			</ul>
		</div>
	);
};

export default PriceQuote;
