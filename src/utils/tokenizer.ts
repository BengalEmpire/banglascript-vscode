// Token interface
export interface Token {
    type: 'comment' | 'string' | 'number' | 'word' | 'operator' | 'other';
    text: string;
}

// Tokenizer: Breaks code into tokens for highlighting
export function tokenizePreserve(code: string): Token[] {
    const tokens: Token[] = [];
    let i = 0;
    while (i < code.length) {
        const char = code[i];
        // Comment: // ...
        if (char === '/' && i + 1 < code.length && code[i + 1] === '/') {
            const end = code.indexOf('\n', i);
            const commentText = code.slice(i, end !== -1 ? end : code.length);
            tokens.push({ type: 'comment', text: commentText });
            i = end !== -1 ? end : code.length;
            continue;
        }
        // String: "..."
        if (char === '"') {
            let end = i + 1;
            while (end < code.length && code[end] !== '"') {
                if (code[end] === '\\') end += 2;  // Skip escaped quotes
                else end++;
            }
            const stringText = code.slice(i, end + 1 < code.length ? end + 1 : code.length);
            tokens.push({ type: 'string', text: stringText });
            i = end + 1 < code.length ? end + 1 : code.length;
            continue;
        }
        // Number: Includes Bengali digits \u09E6-\u09EF and Latin \d + .
        if (/[\d\u09E6-\u09EF.]/.test(char)) {
            const start = i;
            while (i < code.length && /[\d\u09E6-\u09EF.]/.test(code[i])) i++;
            tokens.push({ type: 'number', text: code.slice(start, i) });
            continue;
        }
        // Word: Bangla/English identifiers
        if (/[a-zA-Z\u0980-\u09FF_]/.test(char)) {
            const start = i;
            while (i < code.length && /[a-zA-Z\u0980-\u09FF0-9\u09E6-\u09EF_]/.test(code[i])) i++;
            const word = code.slice(start, i).normalize('NFC');
            tokens.push({ type: 'word', text: word });
            continue;
        }
       // Operator: Common JS/Bangla ops (FIXED: Moved - to end, no ranges)
        if (/[+*/=<>!&|~^%=(){};,\\[\\]]-/.test(char)) {  // ← FIXED: - at end; reordered specials first
            tokens.push({ type: 'operator', text: char });
            i++;
            continue;
        }
        // Other chars (whitespace, etc.)
        tokens.push({ type: 'other', text: char });
        i++;
    }
    return tokens;
}

// HTML Escaper: For safe webview rendering
export function escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}