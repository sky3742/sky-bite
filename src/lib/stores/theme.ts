export function getStoredTheme(): boolean {
	if (typeof localStorage === 'undefined') return true;
	const stored = localStorage.getItem('sb-theme');
	return stored !== null ? stored === 'dark' : true;
}

export function applyTheme(dark: boolean): void {
	if (typeof document === 'undefined') return;
	document.documentElement.classList.toggle('dark', dark);
}

export function persistTheme(dark: boolean): void {
	if (typeof localStorage === 'undefined') return;
	localStorage.setItem('sb-theme', dark ? 'dark' : 'light');
}
