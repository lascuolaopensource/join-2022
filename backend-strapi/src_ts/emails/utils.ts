// Converts html email template into plain text

export function HTMLTemplateToText(s: string): string {
    // Listing tokens to replace
    const toReplace: Array<[string, string]> = [
        ["<br>", " "],
        ["<p>", ""],
        ["</p>", " "],
        ["<strong>", ""],
        ["</strong>", ""],
    ];

    // Iterating over list
    let cleanString = s;
    for (let r of toReplace) {
        cleanString = cleanString.replace(r[0], r[1]);
    }

    return cleanString;
}

// Separator for emails

export const s = "<p>---<p>";
