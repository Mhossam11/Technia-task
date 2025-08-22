import { useState } from "react"
import { NavLink } from "react-router-dom"
import type { LucideIcon } from "lucide-react"
import {
	LayoutDashboard,
	Users,
	ChevronLeft,
	ChevronRight,
	DollarSign,
	Building2,
	ClipboardList
} from "lucide-react"
import { getCookie } from "@/lib/cookies"

export type NavItem = {
	title: string
	href: string
	icon: LucideIcon
}

// admin
export const Admin: NavItem[] = [
	{ title: "Dashboard", href: "/", icon: LayoutDashboard },
	{ title: "Employees", href: "/employees", icon: Users },
	{ title: "Salaries", href: "/salaries", icon: DollarSign },
	{ title: "Leads", href: "/leads", icon: Building2 },
	{ title: "Actions", href: "/actions", icon: ClipboardList },
]

// hr
export const HR: NavItem[] = [
	{ title: "Dashboard", href: "/", icon: LayoutDashboard },
	{ title: "Employees", href: "/employees", icon: Users },
	{ title: "Salaries", href: "/salaries", icon: DollarSign },
]


// realEstate
export const RealEstate: NavItem[] = [
	{ title: "Dashboard", href: "/", icon: LayoutDashboard },
	{ title: "Leads", href: "/leads", icon: Building2 },
	{ title: "Actions", href: "/actions", icon: ClipboardList },
]

interface SidebarProps {
	initialOpen?: boolean
	mobileOpen?: boolean
	onMobileOpenChange?: (open: boolean) => void
}

const Sidebar = ({ initialOpen = true, mobileOpen, onMobileOpenChange }: SidebarProps) => {
	const role=getCookie("role")
	const roleToRender = 
		role?.includes("Admin") ? Admin : 
		role?.includes("HR") ? HR : 
		role?.includes("Real Estate") ? RealEstate : 
		[]

	const [isOpen, setIsOpen] = useState<boolean>(initialOpen)
	const [internalMobileOpen, setInternalMobileOpen] = useState<boolean>(false)

	const isMobileOpen = mobileOpen ?? internalMobileOpen
	const setMobileOpen = onMobileOpenChange ?? setInternalMobileOpen

	const toggleDesktop = () => setIsOpen((v) => !v)
	const closeMobile = () => setMobileOpen(false)

	return (
		<>
			{/* Sidebar container (drawer on mobile, static on desktop) */}
			<aside
				className={
					[
						"fixed inset-y-0 left-0 z-50 md:z-auto flex flex-col border-r border-amber-200/60 dark:border-amber-700/30 bg-gradient-to-b from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 text-foreground shadow-sm transition-all duration-300 ease-in-out",
						// Width handling for desktop collapse
						isOpen ? "w-64" : "w-20",
						// Mobile drawer slide
						isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
						"md:static",
					].join(" ")
				}
				aria-label="Sidebar navigation"
			>
				{/* Header with brand and toggles */}
				<div className="flex items-center justify-between gap-2 px-3 py-3 sticky top-0 bg-gradient-to-b from-amber-50/95 to-yellow-50/95 backdrop-blur supports-[backdrop-filter]:bg-opacity-90">
					<div className="flex items-center gap-2">
						{/* Toggle button in place of the brand icon */}
						<button
							onClick={() => (isMobileOpen ? closeMobile() : toggleDesktop())}
							className="rounded-md border border-amber-300/70 dark:border-amber-700/50 bg-gradient-to-br from-amber-200/60 to-yellow-200/60 dark:from-amber-900/40 dark:to-yellow-900/40 p-2 shadow-sm hover:shadow-md transition-all"
							aria-label="Toggle sidebar"
						>
							{/* Show right arrow when closed, left arrow when open (mobile and desktop) */}
							{(isMobileOpen || isOpen) ? (
								<ChevronLeft className="h-5 w-5 text-amber-700 dark:text-amber-300" />
							) : (
								<ChevronRight className="h-5 w-5 text-amber-700 dark:text-amber-300" />
							)}
						</button>
						<span className={`font-semibold bg-gradient-to-r from-amber-700 to-yellow-600 dark:from-amber-400 dark:to-yellow-300 bg-clip-text text-transparent transition-opacity ${isOpen ? "opacity-100" : "opacity-0 md:opacity-0"}`}>
							{role}
						</span>
					</div>
					{/* Removed right-side icon buttons */}
					<div />
				</div>

				{/* Nav */}
				<nav className="flex-1 overflow-y-auto px-2 py-2 space-y-2">
					<ul className="space-y-1">
						{
						roleToRender.map(({ title, href, icon: Icon }) => (
							<li key={href}>
								<NavLink
									to={href}
									className={({ isActive }) => [
										"group flex items-center gap-3 rounded-md border px-3 py-2 transition-all backdrop-blur-sm",
										"border-transparent hover:border-amber-300/60 dark:hover:border-amber-700/40",
										"hover:bg-amber-100/60 dark:hover:bg-amber-900/30 hover:shadow-sm",
										isActive ? "bg-amber-200/60 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-700" : "text-foreground",
									].join(" ")}
									onClick={closeMobile}
								>
									<Icon className="h-5 w-5 text-amber-700 dark:text-amber-300" />
									<span className={`truncate transition-opacity ${isOpen ? "opacity-100" : "opacity-0 md:opacity-0"}`}>
										{title}
									</span>
								</NavLink>
							</li>
						))}
					</ul>
				</nav>

				{/* Footer (optional) */}
				<div className={`mt-auto px-3 py-3 text-xs text-muted-foreground transition-opacity ${isOpen ? "opacity-100" : "opacity-0 md:opacity-0"}`}>
					© {new Date().getFullYear()} Technia
				</div>
			</aside>
		</>
	)
}

export default Sidebar;