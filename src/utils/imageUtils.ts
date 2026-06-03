/**
 * Sanitizes a filename for SEO-friendly URLs.
 * Converts to lowercase, removes special chars, replaces spaces with hyphens.
 * Example: "My Cool Image!.jpg" -> "my-cool-image.jpg"
 */
export function sanitizeImageName(filename: string): string {
    if (!filename) return '';

    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.')) || filename;
    const ext = filename.substring(filename.lastIndexOf('.'));

    const sanitized = nameWithoutExt
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Remove duplicate hyphens

    return `${sanitized}${ext}`;
}
