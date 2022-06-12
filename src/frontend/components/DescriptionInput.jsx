import { useDispatch, useSelector } from "react-redux";
import { setDescription } from "../../features/orders/userOrderSlice";

const DescriptionInput = ({ descriptionError }) => {
	const dispatch = useDispatch();
	const { order } = useSelector((state) => state.userOrder);
	const handleChange = (e) => {
		dispatch(setDescription(e.target.value));
	};
	return (
		<div className="mt-3">
			<p className="text-2xl">Tell us a bit more</p>
			{descriptionError && (
				<span className="text-red-500">{descriptionError}</span>
			)}
			<textarea
				className={`w-full p-2 rounded-md  shadow-md ${
					descriptionError
						? "border-2 border-red-500 focus:border-2 focus:border-red-500"
						: "border-2 border-gray-200 focus:border-2 focus:border-color-accent"
				} `}
				placeholder={`Enter further details ...`}
				rows="7"
				cols="50"
				defaultValue={order.description}
				onChange={handleChange}
			/>
		</div>
	);
};

export default DescriptionInput;
