import Select from "react-select";

const options = [
	{ label: "option1", value: 1 },
	{ label: "option2", value: 2 },
	{ label: "option3", value: 3 },
];

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
	return (
		<div className="my-5 md:min-w-fit">
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
					noOptionsMessage={({ inputValue }) =>
						!inputValue ? noOptionsText : "Sorry! We don't serve your area."
					}
				/>
			</form>
		</div>
	);
};

export default SelectAddress;
