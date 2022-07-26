// Checks if current url is open
export function isOpen(href: string, currentUrl: URL) {
	return (
		currentUrl.pathname == href ||
		(currentUrl.pathname.includes(href) && href != '/inside')
	);
}

// Copies text to clipboard
export function copy(s: string | null | undefined) {
	if (s) {
		navigator.clipboard.writeText(s).then(() => {
			alert('Copied to clipboard');
		});
	}
	//
	else {
		alert('Nothing has been copied, text is empty');
	}
}
