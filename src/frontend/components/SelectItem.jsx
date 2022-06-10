import { useEffect, useState } from "react";
import Select from "react-select";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { FaMinusCircle, FaPlusCircle, FaTrash } from "react-icons/fa";
import {
	restOrderTotal,
	setOrderItems,
	incrementItemNumber,
	decrementItemNumber,
	deleteItem,
	setItemsTotal,
} from "../../features/orders/userOrderSlice";
import {
	getServiceItems,
	setOptions,
} from "../../features/service-items/serviceItemsSlice";
import {
	DATE_AND_TIME,
	ORDER_DESCRIPTION,
} from "../../features/section/sectionConstants";
import { Transition } from "@headlessui/react";

const SelectItem = () => {
	const dispatch = useDispatch();
	const { backTo } = useSelector((state) => state.section);

	const { isError, isLoading, isSuccess, message, items, options } =
		useSelector((state) => state.serviceItems);
	const { order } = useSelector((state) => state.userOrder);

	useEffect(() => {
		if (!backTo || (backTo !== ORDER_DESCRIPTION && backTo !== DATE_AND_TIME)) {
			dispatch(getServiceItems());
		}
	}, [dispatch, backTo]);

	useEffect(() => {
		const initOptions = items?.map((i) => {
			const label = i.name;
			const value = i.item_id;
			return { label, value };
		});
		if (!backTo || (backTo !== ORDER_DESCRIPTION && backTo !== DATE_AND_TIME)) {
			dispatch(setOptions(initOptions));
		}
	}, [items, backTo]);

	const selectOrderItems = (option) => {
		dispatch(setOptions(options.filter((o) => o.value !== option.value)));
		const selectedItem = items.find((i) => i.item_id === option.value);

		if (selectedItem) {
			dispatch(
				setOrderItems({
					id: selectedItem.item_id,
					name: selectedItem.name,
					number: 1,
					price: Number(selectedItem.price),
					total: Number(selectedItem.price),
				})
			);
			dispatch(setItemsTotal());
			dispatch(restOrderTotal());
		}
	};

	return (
		<div className="my-5 md:min-w-fit">
			{isLoading ? (
				<Skeleton count={2} />
			) : isError ? (
				<span>{message}</span>
			) : (
				<>
					<form>
						<Select
							isClearable={false}
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
					<div>
						{order.items.map((i) => (
							<div
								key={i.id}
								className="flex flex-col justify-between items-center border-2 my-2 border-gray-200 rounded-md p-4 md:flex-row gap-3 shadow-md"
							>
								<div className="w-full md:w-[70%]">
									{i.name} (${i.price} per item)
								</div>

								<div className="flex flex-row justify-center items-center w-full gap-5 md:w-[30%] md:justify-between md:gap-0">
									<span>Total: ${i.total}</span>
									<span
										className="text-xl text-red-500 cursor-pointer"
										onClick={(e) => {
											dispatch(decrementItemNumber(i.id));
											if (i.number <= 1) {
												dispatch(
													setOptions([
														...options,
														{ label: i.name, value: i.id },
													])
												);
												dispatch(deleteItem(i.id));
												dispatch(setItemsTotal());
												dispatch(restOrderTotal());
											}
											dispatch(setItemsTotal());
											dispatch(restOrderTotal());
										}}
									>
										<FaMinusCircle />
									</span>
									<span>{i.number}</span>
									<span
										className="text-xl text-green-500 cursor-pointer"
										onClick={(e) => {
											dispatch(incrementItemNumber(i.id));
											dispatch(setItemsTotal());
											dispatch(restOrderTotal());
										}}
									>
										<FaPlusCircle />
									</span>
									<span
										className="text-xl text-red-500 cursor-pointer"
										onClick={(e) => {
											dispatch(
												setOptions([...options, { label: i.name, value: i.id }])
											);
											dispatch(deleteItem(i.id));
											dispatch(setItemsTotal());
											dispatch(restOrderTotal());
										}}
									>
										<FaTrash />
									</span>
								</div>
							</div>
						))}
					</div>
				</>
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
		backgroundColor: state.isSelected && "white",
		color: state.isSelected && "#7A7A7A",
		"&:hover": {
			backgroundColor: state.isSelected ? "#fffee6" : "#fffee6",
		},
	}),

	singleValue: (provided, state) => {
		const opacity = state.isDisabled ? 0.5 : 1;
		const transition = "opacity 300ms";

		return { ...provided, opacity, transition };
	},
};
