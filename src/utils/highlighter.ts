import { Token, tokenizePreserve, escapeHtml } from './tokenizer';  
import { KEYWORDS } from '../../themes/Keywords'; 

export function highlightBangla(code: string): string {
    const tokens: Token[] = tokenizePreserve(code);  // Now typed
    return tokens.map((t: Token) => {  // ← FIXED: Explicitly type 't' as Token
        let className = '';
        if (t.type === 'comment') className = 'text-green-600 italic';
        else if (t.type === 'string') className = 'text-emerald-400';
        else if (t.type === 'number') className = 'text-amber-400';
        else if (t.type === 'word') {
            // Check if it's a Bangla keyword (from KEYWORDS keys)
            const isKeyword = Object.keys(KEYWORDS).some(kw => kw === t.text);
            if (isKeyword) className = 'text-purple-400 font-semibold';
            else className = 'text-blue-300';
        } else if (t.type === 'operator') {
            className = 'text-orange-400';
        } else {
            className = 'text-gray-400';
        }
        return `<span class="${className}">${escapeHtml(t.text)}</span>`; 
    }).join('');
}


export { tokenizePreserve, escapeHtml } from './tokenizer';