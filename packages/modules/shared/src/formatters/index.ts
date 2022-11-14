export const formatPriceNumber = (
	price: number,
	locale = "IT-it",
	currency = "EUR"
) => {
	const formatter = new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
	});
	return formatter.format(price);
};

export function formatDate(date: Date, locale = "IT-it") {
	return date.toLocaleDateString(locale, {
		month: "2-digit",
		day: "2-digit",
		year: "2-digit",
	});
}
