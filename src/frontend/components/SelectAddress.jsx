import { useEffect } from "react";
import Select from "react-select";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import {
	getAddresses,
	setSelectedAddress,
} from "../../features/addresses/addressesSlice";
import { setServicesPrices } from "../../features/services/serviceSlice";
import {
	setOrderServicePrice,
	restOrderTotal,
} from "../../features/orders/userOrderSlice";

const customStyles = {
	menu: (provided, state) => ({
		...provided,
		width: "100%",
		borderBottom: "1px dotted pink",
		color: state.selectProps.menuColor,
		padding: 10,
	}),

	control: (styles, state) => ({
		...styles,
		width: "100%",
		// backgroundColor: "#ccc",
		padding: 9,
		boxShadow: state.isFocused ? "2px solid #E8A901" : "none",
		border: state.isFocused && "2px solid #E8A901",
		"&:hover": {
			border: state.isFocused && "2px solid #E8A901",
			boxShadow: state.isFocused ? "2px solid #E8A901" : "none",
		},
	}),
	option: (styles, state) => ({
		...styles,
		backgroundColor: state.isSelected && "#E8A901",
		"&:hover": {
			backgroundColor: state.isSelected ? "#E8A901" : "#fffee6",
		},
	}),

	singleValue: (provided, state) => {
		const opacity = state.isDisabled ? 0.5 : 1;
		const transition = "opacity 300ms";

		return { ...provided, opacity, transition };
	},
};

const SelectAddress = () => {
	const dispatch = useDispatch();
	const { addresses, isLoading, isSuccess, isError, message, selectedAddress } =
		useSelector((state) => state.addresses);
	const { selectedService } = useSelector((state) => state.services);

	useEffect(() => {
		dispatch(getAddresses());
	}, [dispatch]);

	const options = addresses?.map((address) => {
		const label = ` ${address.zip} ${address.county}, ${address.city}, USA `;
		const value = address.address_id;
		return { label, value };
	});
	const selectOrderAddress = (option) => {
		const address = addresses.find((a) => a.address_id === option.value);
		const prices = {
			junkRemovalPrice: Number(address.junk_removal),
			cardboardRemovalPrice: Number(address.cardboard_removal),
			dumpTrailerPrice: Number(address.dump_trailer),
		};

		dispatch(setServicesPrices(prices));
		dispatch(setSelectedAddress(address));

		dispatch(
			setOrderServicePrice(
				selectedService.name === "Junk Removal"
					? prices.junkRemovalPrice
					: selectedService.name === "Cardboard Removal"
					? prices.cardboardRemovalPrice
					: prices.dumpTrailerPrice
			)
		);
		dispatch(restOrderTotal());
	};

	return (
		<div className="my-5 md:min-w-fit">
			{isLoading ? (
				<Skeleton count={4} />
			) : isError ? (
				<span>{message}</span>
			) : (
				<>
					<p>Check if we serve in your area</p>
					<form>
						<label className="focus:text-color-accent" htmlFor="address">
							Enter Your ZIP Code:
						</label>

						<Select
							options={options}
							id="address"
							name="address"
							placeholder="Search places ..."
							styles={customStyles}
							isClearable={true}
							value={options.value}
							noOptionsMessage={({ inputValue }) =>
								!inputValue ? noOptionsText : "Sorry! We don't serve your area."
							}
							onChange={selectOrderAddress}
						/>
					</form>
				</>
			)}
		</div>
	);
};

export default SelectAddress;
