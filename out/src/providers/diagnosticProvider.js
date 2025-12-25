"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDiagnosticCollection = createDiagnosticCollection;
exports.updateDiagnostics = updateDiagnostics;
// Diagnostic provider for BanglaScript - basic error checking
const vscode = __importStar(require("vscode"));
const Keywords_1 = require("../../themes/Keywords");
// Common BanglaScript syntax patterns
const BANGLA_KEYWORDS = Object.keys(Keywords_1.KEYWORDS);
const DIAGNOSTIC_RULES = [
    // Check for unmatched braces (simple check)
    {
        pattern: /\{[^}]*$/,
        message: 'সম্ভবত একটি বন্ধনী } অনুপস্থিত',
        severity: vscode.DiagnosticSeverity.Warning,
        code: 'unmatched-brace'
    },
    // Check for common Bengali keyword typos
    {
        pattern: /\bযাদি\b/,
        message: '"যাদি" সঠিক নয়। সঠিক: "যদি"',
        severity: vscode.DiagnosticSeverity.Error,
        code: 'typo-jodi'
    },
    {
        pattern: /\bনাহ্লে\b/,
        message: '"নাহ্লে" সঠিক নয়। সঠিক: "নাহলে"',
        severity: vscode.DiagnosticSeverity.Error,
        code: 'typo-nahle'
    },
    {
        pattern: /\bফাংশান\b/,
        message: '"ফাংশান" সঠিক নয়। সঠিক: "ফাংশন" বা "অনুষ্ঠান"',
        severity: vscode.DiagnosticSeverity.Error,
        code: 'typo-function'
    },
    {
        pattern: /\bরিটার্ন\b/,
        message: '"রিটার্ন" সঠিক নয়। সঠিক: "প্রেরণ" বা "ফেরত"',
        severity: vscode.DiagnosticSeverity.Error,
        code: 'typo-return'
    },
    // Check for potential issues
    {
        pattern: /console\.log/,
        message: 'JavaScript এর console.log এর বদলে "লিখো()" ব্যবহার করুন',
        severity: vscode.DiagnosticSeverity.Information,
        code: 'use-bangla-log'
    },
    {
        pattern: /\bfunction\b/,
        message: 'JavaScript এর function এর বদলে "অনুষ্ঠান" বা "ফাংশন" ব্যবহার করুন',
        severity: vscode.DiagnosticSeverity.Information,
        code: 'use-bangla-function'
    },
    {
        pattern: /\bif\s*\(/,
        message: 'JavaScript এর if এর বদলে "যদি" ব্যবহার করুন',
        severity: vscode.DiagnosticSeverity.Information,
        code: 'use-bangla-if'
    },
    {
        pattern: /\belse\b/,
        message: 'JavaScript এর else এর বদলে "নাহলে" ব্যবহার করুন',
        severity: vscode.DiagnosticSeverity.Information,
        code: 'use-bangla-else'
    },
    {
        pattern: /\bfor\s*\(/,
        message: 'JavaScript এর for এর বদলে "জন্য" ব্যবহার করুন',
        severity: vscode.DiagnosticSeverity.Information,
        code: 'use-bangla-for'
    },
    {
        pattern: /\bwhile\s*\(/,
        message: 'JavaScript এর while এর বদলে "যখন" ব্যবহার করুন',
        severity: vscode.DiagnosticSeverity.Information,
        code: 'use-bangla-while'
    },
    {
        pattern: /\bconst\b/,
        message: 'JavaScript এর const এর বদলে "ধ্রুবক" ব্যবহার করুন',
        severity: vscode.DiagnosticSeverity.Information,
        code: 'use-bangla-const'
    },
    {
        pattern: /\blet\b/,
        message: 'JavaScript এর let এর বদলে "চলক" বা "সংখ্যা" ব্যবহার করুন',
        severity: vscode.DiagnosticSeverity.Information,
        code: 'use-bangla-let'
    },
    {
        pattern: /\breturn\b/,
        message: 'JavaScript এর return এর বদলে "প্রেরণ" ব্যবহার করুন',
        severity: vscode.DiagnosticSeverity.Information,
        code: 'use-bangla-return'
    },
    {
        pattern: /\bclass\s+[A-Z]/,
        message: 'JavaScript এর class এর বদলে "ক্লাস" ব্যবহার করুন',
        severity: vscode.DiagnosticSeverity.Information,
        code: 'use-bangla-class'
    },
    {
        pattern: /\btrue\b/,
        message: 'JavaScript এর true এর বদলে "সত্য" ব্যবহার করুন',
        severity: vscode.DiagnosticSeverity.Information,
        code: 'use-bangla-true'
    },
    {
        pattern: /\bfalse\b/,
        message: 'JavaScript এর false এর বদলে "মিথ্যা" ব্যবহার করুন',
        severity: vscode.DiagnosticSeverity.Information,
        code: 'use-bangla-false'
    },
    {
        pattern: /\bnull\b/,
        message: 'JavaScript এর null এর বদলে "শূন্য" ব্যবহার করুন',
        severity: vscode.DiagnosticSeverity.Information,
        code: 'use-bangla-null'
    },
    // Warning for deprecated patterns
    {
        pattern: /\bনাহলে_যদি\b/,
        message: '"নাহলে_যদি" এর বদলে "নাহলে যদি" (স্পেস সহ) ব্যবহার করুন',
        severity: vscode.DiagnosticSeverity.Warning,
        code: 'deprecated-else-if'
    },
];
// Bracket matching check
function checkBracketMatching(text, lineNumber) {
    const diagnostics = [];
    let braceCount = 0;
    let parenCount = 0;
    let bracketCount = 0;
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        switch (char) {
            case '{':
                braceCount++;
                break;
            case '}':
                braceCount--;
                break;
            case '(':
                parenCount++;
                break;
            case ')':
                parenCount--;
                break;
            case '[':
                bracketCount++;
                break;
            case ']':
                bracketCount--;
                break;
        }
    }
    // Report unmatched brackets at end of line
    if (braceCount > 0) {
        diagnostics.push(new vscode.Diagnostic(new vscode.Range(lineNumber, 0, lineNumber, text.length), `${braceCount}টি বন্ধনী { এর সাথে মেলানো } নেই`, vscode.DiagnosticSeverity.Warning));
    }
    if (parenCount > 0) {
        diagnostics.push(new vscode.Diagnostic(new vscode.Range(lineNumber, 0, lineNumber, text.length), `${parenCount}টি বন্ধনী ( এর সাথে মেলানো ) নেই`, vscode.DiagnosticSeverity.Warning));
    }
    if (bracketCount > 0) {
        diagnostics.push(new vscode.Diagnostic(new vscode.Range(lineNumber, 0, lineNumber, text.length), `${bracketCount}টি বন্ধনী [ এর সাথে মেলানো ] নেই`, vscode.DiagnosticSeverity.Warning));
    }
    return diagnostics;
}
function createDiagnosticCollection(context) {
    const diagnosticCollection = vscode.languages.createDiagnosticCollection('banglascript');
    context.subscriptions.push(diagnosticCollection);
    return diagnosticCollection;
}
function updateDiagnostics(document, diagnosticCollection) {
    if (document.languageId !== 'banglascript') {
        return;
    }
    const diagnostics = [];
    const text = document.getText();
    const lines = text.split('\n');
    // Check each line
    for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
        const line = lines[lineNumber];
        // Skip comments
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('//') || trimmedLine.startsWith('/*')) {
            continue;
        }
        // Apply diagnostic rules
        for (const rule of DIAGNOSTIC_RULES) {
            let match;
            const regex = new RegExp(rule.pattern.source, 'g');
            while ((match = regex.exec(line)) !== null) {
                const startPos = new vscode.Position(lineNumber, match.index);
                const endPos = new vscode.Position(lineNumber, match.index + match[0].length);
                const range = new vscode.Range(startPos, endPos);
                const diagnostic = new vscode.Diagnostic(range, rule.message, rule.severity);
                if (rule.code) {
                    diagnostic.code = rule.code;
                    diagnostic.source = 'BanglaScript';
                }
                diagnostics.push(diagnostic);
            }
        }
    }
    // Full document bracket matching
    let totalBraces = 0;
    let totalParens = 0;
    let totalBrackets = 0;
    // Count all brackets in document (outside strings)
    let inString = false;
    let stringChar = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        // Handle string detection
        if ((char === '"' || char === "'") && (i === 0 || text[i - 1] !== '\\')) {
            if (!inString) {
                inString = true;
                stringChar = char;
            }
            else if (char === stringChar) {
                inString = false;
            }
        }
        if (!inString) {
            switch (char) {
                case '{':
                    totalBraces++;
                    break;
                case '}':
                    totalBraces--;
                    break;
                case '(':
                    totalParens++;
                    break;
                case ')':
                    totalParens--;
                    break;
                case '[':
                    totalBrackets++;
                    break;
                case ']':
                    totalBrackets--;
                    break;
            }
        }
    }
    // Report document-level bracket issues
    const lastLine = lines.length - 1;
    const lastLineLength = lines[lastLine].length;
    if (totalBraces !== 0) {
        diagnostics.push(new vscode.Diagnostic(new vscode.Range(0, 0, 0, 1), `ডকুমেন্টে ${Math.abs(totalBraces)}টি ${totalBraces > 0 ? 'বন্ধনী } অনুপস্থিত' : 'অতিরিক্ত বন্ধনী } আছে'}`, vscode.DiagnosticSeverity.Error));
    }
    if (totalParens !== 0) {
        diagnostics.push(new vscode.Diagnostic(new vscode.Range(0, 0, 0, 1), `ডকুমেন্টে ${Math.abs(totalParens)}টি ${totalParens > 0 ? 'বন্ধনী ) অনুপস্থিত' : 'অতিরিক্ত বন্ধনী ) আছে'}`, vscode.DiagnosticSeverity.Error));
    }
    if (totalBrackets !== 0) {
        diagnostics.push(new vscode.Diagnostic(new vscode.Range(0, 0, 0, 1), `ডকুমেন্টে ${Math.abs(totalBrackets)}টি ${totalBrackets > 0 ? 'বন্ধনী ] অনুপস্থিত' : 'অতিরিক্ত বন্ধনী ] আছে'}`, vscode.DiagnosticSeverity.Error));
    }
    diagnosticCollection.set(document.uri, diagnostics);
}
//# sourceMappingURL=diagnosticProvider.js.map