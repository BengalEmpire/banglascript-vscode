// Diagnostic provider for BanglaScript - basic error checking
import * as vscode from 'vscode';
import { KEYWORDS } from '../../themes/Keywords';

// Common BanglaScript syntax patterns
const BANGLA_KEYWORDS = Object.keys(KEYWORDS);

// Patterns that suggest common mistakes
interface DiagnosticRule {
    pattern: RegExp;
    message: string;
    severity: vscode.DiagnosticSeverity;
    code?: string;
}

const DIAGNOSTIC_RULES: DiagnosticRule[] = [
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
function checkBracketMatching(text: string, lineNumber: number): vscode.Diagnostic[] {
    const diagnostics: vscode.Diagnostic[] = [];
    let braceCount = 0;
    let parenCount = 0;
    let bracketCount = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        switch (char) {
            case '{': braceCount++; break;
            case '}': braceCount--; break;
            case '(': parenCount++; break;
            case ')': parenCount--; break;
            case '[': bracketCount++; break;
            case ']': bracketCount--; break;
        }
    }

    // Report unmatched brackets at end of line
    if (braceCount > 0) {
        diagnostics.push(new vscode.Diagnostic(
            new vscode.Range(lineNumber, 0, lineNumber, text.length),
            `${braceCount}টি বন্ধনী { এর সাথে মেলানো } নেই`,
            vscode.DiagnosticSeverity.Warning
        ));
    }
    if (parenCount > 0) {
        diagnostics.push(new vscode.Diagnostic(
            new vscode.Range(lineNumber, 0, lineNumber, text.length),
            `${parenCount}টি বন্ধনী ( এর সাথে মেলানো ) নেই`,
            vscode.DiagnosticSeverity.Warning
        ));
    }
    if (bracketCount > 0) {
        diagnostics.push(new vscode.Diagnostic(
            new vscode.Range(lineNumber, 0, lineNumber, text.length),
            `${bracketCount}টি বন্ধনী [ এর সাথে মেলানো ] নেই`,
            vscode.DiagnosticSeverity.Warning
        ));
    }

    return diagnostics;
}

export function createDiagnosticCollection(context: vscode.ExtensionContext): vscode.DiagnosticCollection {
    const diagnosticCollection = vscode.languages.createDiagnosticCollection('banglascript');
    context.subscriptions.push(diagnosticCollection);
    return diagnosticCollection;
}

export function updateDiagnostics(document: vscode.TextDocument, diagnosticCollection: vscode.DiagnosticCollection): void {
    if (document.languageId !== 'banglascript') {
        return;
    }

    const diagnostics: vscode.Diagnostic[] = [];
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
            let match: RegExpExecArray | null;
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
            } else if (char === stringChar) {
                inString = false;
            }
        }

        if (!inString) {
            switch (char) {
                case '{': totalBraces++; break;
                case '}': totalBraces--; break;
                case '(': totalParens++; break;
                case ')': totalParens--; break;
                case '[': totalBrackets++; break;
                case ']': totalBrackets--; break;
            }
        }
    }

    // Report document-level bracket issues
    const lastLine = lines.length - 1;
    const lastLineLength = lines[lastLine].length;

    if (totalBraces !== 0) {
        diagnostics.push(new vscode.Diagnostic(
            new vscode.Range(0, 0, 0, 1),
            `ডকুমেন্টে ${Math.abs(totalBraces)}টি ${totalBraces > 0 ? 'বন্ধনী } অনুপস্থিত' : 'অতিরিক্ত বন্ধনী } আছে'}`,
            vscode.DiagnosticSeverity.Error
        ));
    }
    if (totalParens !== 0) {
        diagnostics.push(new vscode.Diagnostic(
            new vscode.Range(0, 0, 0, 1),
            `ডকুমেন্টে ${Math.abs(totalParens)}টি ${totalParens > 0 ? 'বন্ধনী ) অনুপস্থিত' : 'অতিরিক্ত বন্ধনী ) আছে'}`,
            vscode.DiagnosticSeverity.Error
        ));
    }
    if (totalBrackets !== 0) {
        diagnostics.push(new vscode.Diagnostic(
            new vscode.Range(0, 0, 0, 1),
            `ডকুমেন্টে ${Math.abs(totalBrackets)}টি ${totalBrackets > 0 ? 'বন্ধনী ] অনুপস্থিত' : 'অতিরিক্ত বন্ধনী ] আছে'}`,
            vscode.DiagnosticSeverity.Error
        ));
    }

    diagnosticCollection.set(document.uri, diagnostics);
}
