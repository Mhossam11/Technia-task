import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router";

interface IProps {
}

const RootLayout = ({}: IProps) => {
	const [mobileOpen, setMobileOpen] = useState<boolean>(false)
	return(
		<div className="max-h-screen flex  overflow-y-auto md:overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none][&::-webkit-scrollbar]:hidden ">
			{/* Mobile backdrop overlay */}
			{mobileOpen && (
				<div
					onClick={() => setMobileOpen(false)}
					className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] md:hidden"
				/>
			)}
			<Sidebar mobileOpen={mobileOpen} onMobileOpenChange={setMobileOpen} />
			<div className={`flex-1 flex flex-col transition-all duration-300 ${mobileOpen ? 'ml-64 md:ml-0' : ''}`}>
				<Navbar onOpenSidebar={() => setMobileOpen(true)}>
					<div className="grid grid-cols-12 ">
						<Outlet />
						</div>
				</Navbar>
			</div>
		</div>
	)
}

export default RootLayout;