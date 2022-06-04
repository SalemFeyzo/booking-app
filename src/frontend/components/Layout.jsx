import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
	return (
		<div className="font-body mx-auto text-color-text  my-3 w-full p-5  h-full md:w-[70rem]">
			<Header />
			<main>
				<div className="flex flex-row w-full h-full gap-2 ">{children}</div>
			</main>
		</div>
	);
};

export default Layout;
