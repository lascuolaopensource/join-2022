export function isOpen(href: string, currentUrl: URL) {
	return (
		currentUrl.pathname == href ||
		(currentUrl.pathname.includes(href) && href != '/inside')
	);
}
