import { __ } from "@wordpress/i18n";

const App = () => {
	return (
		<div className="text-color-text font-body">
			<h1>{__("App", "booking-app")}</h1>
		</div>
	);
};

export default App;
