import { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
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
	setorderAddress,
} from "../../features/orders/userOrderSlice";
import { CHOOSE_SERVICE } from "../../features/section/sectionConstants";

const SelectAddress = ({ errorMessage, setErrorMessage }) => {
	const [value, setValue] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
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
			padding: 9,
			boxShadow:
				state.isFocused && !errorMessage
					? "2px solid #E8A901"
					: state.isFocused && errorMessage
					? "2px solid #ff3333"
					: errorMessage && !state.isFocused
					? "2px solid #ff3333"
					: "none",
			border:
				state.isFocused && !errorMessage
					? "2px solid #E8A901"
					: state.isFocused && errorMessage
					? "2px solid #ff3333"
					: errorMessage && !state.isFocused
					? "2px solid #ff3333"
					: "",
			"&:hover": {
				border:
					state.isFocused && !errorMessage
						? "2px solid #E8A901"
						: state.isFocused && errorMessage
						? "2px solid #ff3333"
						: errorMessage && !state.isFocused
						? "2px solid #ff3333"
						: "",
				boxShadow:
					state.isFocused && !errorMessage
						? "2px solid #E8A901"
						: state.isFocused && errorMessage
						? "2px solid #ff3333"
						: errorMessage && !state.isFocused
						? "2px solid #ff3333"
						: "none",
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

	const dispatch = useDispatch();
	const { addresses, isLoading, isSuccess, isError, message, selectedAddress } =
		useSelector((state) => state.addresses);
	const { selectedService } = useSelector((state) => state.services);
	const { backTo } = useSelector((state) => state.section);
	useEffect(() => {
		if (!backTo || backTo !== CHOOSE_SERVICE) dispatch(getAddresses());
	}, [dispatch, backTo]);

	const selectOrderAddress = (option) => {
		setValue(option);
		const address = addresses.find((a) =>
			a.zip === option.value.terms[0].value ? option.value.terms[0].value : null
		);

		if (address) {
			const prices = {
				junkRemovalPrice: Number(address.junk_removal),
				cardboardRemovalPrice: Number(address.cardboard_removal),
				dumpTrailerPrice: Number(address.dump_trailer),
			};
			dispatch(setorderAddress(option.label));
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
			setErrorMessage(null);
			setSuccessMessage("We serve in this area");
		} else {
			setSuccessMessage(null);
			setErrorMessage("We don't serve in this area");
		}
	};
	return (
		<div className="my-5">
			{isLoading ? (
				<Skeleton count={5} />
			) : isError ? (
				<span>{message}</span>
			) : (
				<>
					<p>Check if we serve in your area</p>
					{errorMessage && <span className="text-red-500">{errorMessage}</span>}
					{successMessage && (
						<span className="text-color-accent">{successMessage}</span>
					)}
					<GooglePlacesAutocomplete
						apiKey="AIzaSyCF_b0avoAPa-h76ELIZcudKMzrvxhAbBM"
						selectProps={{
							value,
							onChange: selectOrderAddress, //setValue ,
							styles: customStyles,
							placeholder: "Search places...",
							loadingMessage: () => "Searching...",
							isClearable: true,
							className: "shadow-md",
						}}
						apiOptions={{ language: "en" }}
						autocompletionRequest={{
							componentRestrictions: {
								country: ["us"],
							},
							// types: ["postal_code", "postal_town"],
						}}
					/>
				</>
			)}
		</div>
	);
};

export default SelectAddress;
