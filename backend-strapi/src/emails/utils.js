"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s = exports.HTMLTemplateToText = void 0;
function HTMLTemplateToText(s) {
    const toReplace = [
        ["<br>", " "],
        ["<p>", ""],
        ["</p>", " "],
        ["<strong>", ""],
        ["</strong>", ""],
    ];
    let cleanString = s;
    for (let r of toReplace) {
        cleanString = cleanString.replace(r[0], r[1]);
    }
    return cleanString;
}
exports.HTMLTemplateToText = HTMLTemplateToText;
exports.s = "<p>---<p>";
