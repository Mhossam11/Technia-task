import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { authenticate, getCurrentUser } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function LoginPage() {
	const navigate = useNavigate()
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const user = getCurrentUser()
		if (user) {
			navigate("/", { replace: true })
		}
	}, [navigate])

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)
		setLoading(true)
		setTimeout(() => {
			const session = authenticate(username.trim(), password)
			setLoading(false)
			if (!session) {
				setError("Invalid username or password")
				return
			}
			window.location.reload()
			navigate("/", { replace: true })
		}, 300)
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20">
			<Card className="w-full max-w-xs md:max-w-sm border-amber-200/60 dark:border-amber-700/40 shadow-xl bg-yellow-500/10 shadow-amber-900/40">
				<CardHeader>
					<CardTitle className="text-center bg-gradient-to-r from-amber-700 to-yellow-600 dark:from-amber-400 dark:to-yellow-300 bg-clip-text text-transparent">Welcome to Technia</CardTitle>
					<CardDescription className="text-center">Sign in to continue</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit} className="space-y-4">
						<div>
							<label className="block text-sm mb-1 text-muted-foreground">Username</label>
							<input
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="w-full rounded-md border border-amber-200/60 dark:border-amber-700/40 bg-card px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/50 "
								placeholder="Enter username"
								required
							/>
						</div>
						<div>
							<label className="block text-sm mb-1 text-muted-foreground">Password</label>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full rounded-md border border-amber-200/60 dark:border-amber-700/40 bg-card px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
								placeholder="Enter password"
								required
							/>
						</div>
						{error && <p className="text-sm text-destructive">{error}</p>}
						<Button
							type="submit"
							disabled={loading}
							className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200"
						>
							{loading ? "Signing in..." : "Sign In"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
