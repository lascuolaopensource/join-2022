export function dateDiff(a: string, b: string): number {
    return Date.parse(a) - Date.parse(b);
}
