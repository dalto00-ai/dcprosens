// Trims a page's <title> and meta description to the length Google actually
// renders, without shortening the headline or excerpt shown on the page.
//
// 109 blog posts had a <title> over 65 characters and 108 had a description
// over 165, because both reused the article's own headline and excerpt. Those
// long headlines are good editorial copy — several are written for Google
// Discover, where a fuller sentence helps — but in a search result everything
// past the cut is simply dropped, and what gets dropped is usually the half
// that distinguishes the page.
//
// So the page keeps its full headline in the <h1> and its full excerpt in the
// intro, while these produce a shorter variant for the metadata only.

/**
 * Roughly what Google renders before truncating, minus the " | DCPROSENS"
 * suffix the root layout's title template appends. Budgeting 60 here produced
 * finished titles of 72 characters, because the suffix was not counted.
 */
export const TITLE_SUFFIX_LENGTH = " | DCPROSENS".length;
export const TITLE_LIMIT = 65 - TITLE_SUFFIX_LENGTH;
export const DESCRIPTION_LIMIT = 158;

/** Cuts at the last word boundary that fits, never mid-word. */
function truncateAtWord(text: string, limit: number): string {
    if (text.length <= limit) return text;
    const slice = text.slice(0, limit + 1);
    const lastSpace = slice.lastIndexOf(" ");
    const cut = (lastSpace > limit * 0.6 ? slice.slice(0, lastSpace) : slice.slice(0, limit)).trimEnd();
    // Never end on a dangling connector or punctuation that implies more text.
    return cut.replace(/[\s,;:—–-]+$/, "").replace(/\s+(and|or|the|a|an|of|for|to|in|on|with|that|is|it)$/i, "");
}

/**
 * A search-result title. Long headlines on this site are built as
 * "<claim> — <consequence>"; the first clause is the part that carries the
 * keyword, so it is preferred whenever it stands on its own.
 */
export function seoTitle(title: string, limit: number = TITLE_LIMIT): string {
    if (title.length <= limit) return title;

    // Prefer a natural break before falling back to a hard cut.
    for (const separator of [" — ", " – ", ": ", " - "]) {
        const index = title.indexOf(separator);
        if (index > 20 && index <= limit) {
            return title.slice(0, index).trim();
        }
    }
    return truncateAtWord(title, limit);
}

/**
 * A search-result description. Ends on a full sentence where one fits, since a
 * complete sentence reads better in a SERP than a clause cut off mid-thought.
 */
export function seoDescription(text: string, limit: number = DESCRIPTION_LIMIT): string {
    const clean = text.replace(/\s+/g, " ").trim();
    if (clean.length <= limit) return clean;

    const window = clean.slice(0, limit + 1);
    const lastStop = Math.max(window.lastIndexOf(". "), window.lastIndexOf("? "), window.lastIndexOf("! "));
    if (lastStop > limit * 0.55) {
        return clean.slice(0, lastStop + 1).trim();
    }
    return truncateAtWord(clean, limit - 1) + "…";
}
