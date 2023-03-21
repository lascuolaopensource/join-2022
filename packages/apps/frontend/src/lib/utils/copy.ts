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
