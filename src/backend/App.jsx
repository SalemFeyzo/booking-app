import { __ } from "@wordpress/i18n";

const App = () => {
	console.log("object");
	return (
		<div className=" ">
			<h1 className="text-color-text font-body">
				{__("Admin App", "booking-app")}
			</h1>
		</div>
	);
};

export default App;
