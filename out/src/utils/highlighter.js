"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeHtml = exports.tokenizePreserve = void 0;
exports.highlightBangla = highlightBangla;
const tokenizer_1 = require("./tokenizer");
const Keywords_1 = require("../../themes/Keywords");
function highlightBangla(code) {
    const tokens = (0, tokenizer_1.tokenizePreserve)(code); // Now typed
    return tokens.map((t) => {
        let className = '';
        if (t.type === 'comment')
            className = 'text-green-600 italic';
        else if (t.type === 'string')
            className = 'text-emerald-400';
        else if (t.type === 'number')
            className = 'text-amber-400';
        else if (t.type === 'word') {
            // Check if it's a Bangla keyword (from KEYWORDS keys)
            const isKeyword = Object.keys(Keywords_1.KEYWORDS).some(kw => kw === t.text);
            if (isKeyword)
                className = 'text-purple-400 font-semibold';
            else
                className = 'text-blue-300';
        }
        else if (t.type === 'operator') {
            className = 'text-orange-400';
        }
        else {
            className = 'text-gray-400';
        }
        return `<span class="${className}">${(0, tokenizer_1.escapeHtml)(t.text)}</span>`;
    }).join('');
}
var tokenizer_2 = require("./tokenizer");
Object.defineProperty(exports, "tokenizePreserve", { enumerable: true, get: function () { return tokenizer_2.tokenizePreserve; } });
Object.defineProperty(exports, "escapeHtml", { enumerable: true, get: function () { return tokenizer_2.escapeHtml; } });
//# sourceMappingURL=highlighter.js.map