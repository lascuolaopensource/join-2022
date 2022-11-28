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

export function formatDate(date: Date | string, locale = "IT-it") {
    let d: Date;
    if (typeof date === "string") {
        d = new Date(date);
    } else if (date instanceof Date) {
        d = date;
    }
    return d.toLocaleDateString(locale, {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
    });
}
