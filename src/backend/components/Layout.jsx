import Navbar from "./Navbar";

const Layout = ({ children }) => {
	return (
		<div className="grid grid-flow-row grid-cols-4 grid-rows-1 gap-1  h-full ">
			<Navbar className="col-span-1" />
			<main className="col-span-3 ">
				<div>{children}</div>
			</main>
		</div>
	);
};

export default Layout;
