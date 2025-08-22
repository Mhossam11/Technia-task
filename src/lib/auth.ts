import { getCookie, setCookie, deleteCookie } from "@/lib/cookies"

export type Feature = "create" | "read" | "update" | "delete"

export type UserRecord = {
	username: string
	password: string
	role: string
	modules: Record<string, { features: Record<string, Feature[]> }>
}

export type SessionUser = Omit<UserRecord, "password"> & { token: string }

const USERS: UserRecord[] = [
	{
		username: "admin@technia.com",
		password: "technia",
		role: "Admin",
		modules: {
			HR: { features: { employees: ["create", "read", "update", "delete"], salaries: ["create", "read", "update", "delete"] } },
			RealEstate: { features: { leads: ["create", "read", "update", "delete"], actions: ["create", "read", "update", "delete"] } },
		},
	},
	{
		username: "hrmanager@technia.com",
		password: "technia",
		role: "HR Manager",
		modules: {
			HR: { features: { employees: ["create", "read", "update", "delete"], salaries: ["create", "read", "update", "delete"] } },
		},
	},
	{
		username: "hrstaff@technia.com",
		password: "technia",
		role: "HR Staff",
		modules: {
			HR: { features: { employees: ["read"], salaries: ["read"] } },
		},
	},
	{
		username: "realestateagent@technia.com",
		password: "technia",
		role: "Real Estate Agent",
		modules: {
			RealEstate: { features: { leads: ["create", "read", "update"], actions: ["create", "read"] } },
		},
	},
	{
		username: "realestateviewer@technia.com",
		password: "technia",
		role: "Real Estate Viewer",
		modules: {
			RealEstate: { features: { leads: ["read"], actions: ["read"] } },
		},
	},
]

const COOKIE_KEY = "technia_user"

export function authenticate(username: string, password: string): SessionUser | null {
	const user = USERS.find((u) => u.username === username && u.password === password)
	if (!user) return null
	const token = btoa(`${username}:${Date.now()}`)
	const session: SessionUser = { token, username: user.username, role: user.role, modules: user.modules }
	setCookie(COOKIE_KEY, JSON.stringify(session), 7)
	// Also persist role and modules in separate cookies for quick lookups
	setCookie("role", user.role, 7)
	setCookie("modules", JSON.stringify(user.modules), 7)
	return session
}

export function getCurrentUser(): SessionUser | null {
	const raw = getCookie(COOKIE_KEY)
	if (!raw) return null
	try {
		return JSON.parse(raw)
	} catch {
		return null
	}
}

export function logout(): void {
	deleteCookie(COOKIE_KEY)
	deleteCookie("role")
	deleteCookie("modules")
}
