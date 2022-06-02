import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
	return (
		<div className="font-body mx-auto text-color-text  my-3 w-full max-w-max ">
			<Header />
			<main>
				<div className="grid grid-cols-1 grid-rows-1 gap-2 md:grid-cols-12">
					{children}
				</div>
			</main>
		</div>
	);
};

export default Layout;
