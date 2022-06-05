import { useEffect } from "react";
import Select from "react-select";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { restOrderTotal } from "../../features/orders/userOrderSlice";
import { getServiceItems } from "../../features/service-items/serviceItemsSlice";
const SelectItem = () => {
	const dispatch = useDispatch();

	const { isError, isLoading, isSuccess, message, items } = useSelector(
		(state) => state.serviceItems
	);

	useEffect(() => {
		dispatch(getServiceItems());
	}, [dispatch]);
	const options = items?.map((i) => {
		const label = i.name;
		const value = i.item_id;
		return { label, value };
	});
	const selectOrderItems = (option) => {
		dispatch(restOrderTotal());
	};

	return (
		<div className="my-5 md:min-w-fit">
			{isLoading ? (
				<Skeleton count={2} />
			) : isError ? (
				<span>{message}</span>
			) : (
				<form>
					<Select
						className="shadow-md"
						options={options}
						placeholder="Search items ..."
						styles={customStyles}
						defaultValue={options.value}
						noOptionsMessage={({ inputValue }) =>
							!inputValue ? noOptionsText : "No options."
						}
						onChange={selectOrderItems}
					/>
				</form>
			)}
		</div>
	);
};

export default SelectItem;

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
