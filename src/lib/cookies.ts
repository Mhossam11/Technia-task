export function setCookie(name: string, value: string, days = 7): void {
	const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()
	document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

export function getCookie(name: string): string | null {
	const nameEQ = encodeURIComponent(name) + "="
	const ca = document.cookie.split(";")
	for (let c of ca) {
		while (c.charAt(0) === " ") c = c.substring(1)
		if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length))
	}
	return null
}

export function deleteCookie(name: string): void {
	document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`
}
