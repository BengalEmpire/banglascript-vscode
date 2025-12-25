// Code action provider for BanglaScript - quick fixes
import * as vscode from 'vscode';

// Mapping of English JS keywords to Bengali equivalents
const JS_TO_BANGLA: { [key: string]: string } = {
    'console.log': 'লিখো',
    'function': 'অনুষ্ঠান',
    'if': 'যদি',
    'else': 'নাহলে',
    'else if': 'নাহলে যদি',
    'for': 'জন্য',
    'while': 'যখন',
    'do': 'করো',
    'const': 'ধ্রুবক',
    'let': 'চলক',
    'var': 'পরিবর্তনশীল',
    'return': 'প্রেরণ',
    'class': 'ক্লাস',
    'constructor': 'নির্মাতা',
    'extends': 'বিস্তৃত',
    'new': 'নতুন',
    'this': 'এই',
    'static': 'স্ট্যাটিক',
    'async': 'অ্যাসিঙ্ক',
    'await': 'অপেক্ষা',
    'try': 'চেষ্টা',
    'catch': 'ধরো',
    'finally': 'অবশেষে',
    'throw': 'ছুড়ে_দাও',
    'import': 'আমদানি',
    'export': 'রপ্তানি',
    'from': 'থেকে',
    'switch': 'সুইচ',
    'case': 'কেস',
    'default': 'সাধারণ',
    'break': 'থামাও',
    'continue': 'চালিয়ে_যাও',
    'true': 'সত্য',
    'false': 'মিথ্যা',
    'null': 'শূন্য',
    'undefined': 'অনির্ধারিত',
    'typeof': 'ধরন',
    'delete': 'মুছো',
    'in': 'মধ্যে',
    'of': 'অফ',
};

// Typo corrections
const TYPO_CORRECTIONS: { [key: string]: string } = {
    'যাদি': 'যদি',
    'নাহ্লে': 'নাহলে',
    'ফাংশান': 'ফাংশন',
    'রিটার্ন': 'প্রেরণ',
    'নাহলে_যদি': 'নাহলে যদি',
    'কনস্ট': 'ধ্রুবক',
    'লেট': 'চলক',
    'ভার': 'পরিবর্তনশীল',
    'সংখ্যা_': 'সংখ্যা',
    'ধ্রুবক_': 'ধ্রুবক',
    'চলক_': 'চলক',
};

export function createCodeActionProvider(): vscode.CodeActionProvider {
    return {
        provideCodeActions(document, range, context, token): vscode.CodeAction[] {
            const codeActions: vscode.CodeAction[] = [];

            // Get the text in the range
            const lineText = document.lineAt(range.start.line).text;

            // Look for JS keywords to convert to Bengali
            for (const [jsKeyword, banglaKeyword] of Object.entries(JS_TO_BANGLA)) {
                const regex = new RegExp(`\\b${jsKeyword.replace('.', '\\.')}\\b`, 'g');
                let match;

                while ((match = regex.exec(lineText)) !== null) {
                    const startPos = new vscode.Position(range.start.line, match.index);
                    const endPos = new vscode.Position(range.start.line, match.index + match[0].length);
                    const matchRange = new vscode.Range(startPos, endPos);

                    // Only provide action if the range overlaps
                    if (range.intersection(matchRange)) {
                        const action = new vscode.CodeAction(
                            `"${jsKeyword}" কে "${banglaKeyword}" এ রূপান্তর করুন`,
                            vscode.CodeActionKind.QuickFix
                        );
                        action.edit = new vscode.WorkspaceEdit();
                        action.edit.replace(document.uri, matchRange, banglaKeyword);
                        action.isPreferred = true;
                        codeActions.push(action);
                    }
                }
            }

            // Look for typos to fix
            for (const [typo, correction] of Object.entries(TYPO_CORRECTIONS)) {
                const regex = new RegExp(`\\b${typo}\\b`, 'g');
                let match;

                while ((match = regex.exec(lineText)) !== null) {
                    const startPos = new vscode.Position(range.start.line, match.index);
                    const endPos = new vscode.Position(range.start.line, match.index + match[0].length);
                    const matchRange = new vscode.Range(startPos, endPos);

                    if (range.intersection(matchRange)) {
                        const action = new vscode.CodeAction(
                            `"${typo}" কে "${correction}" দিয়ে সংশোধন করুন`,
                            vscode.CodeActionKind.QuickFix
                        );
                        action.edit = new vscode.WorkspaceEdit();
                        action.edit.replace(document.uri, matchRange, correction);
                        action.isPreferred = true;
                        action.diagnostics = context.diagnostics.filter(d =>
                            d.range.intersection(matchRange) !== undefined
                        );
                        codeActions.push(action);
                    }
                }
            }

            // Add "Convert all JS to Bengali" action if there's any JS keyword
            const hasJsKeywords = Object.keys(JS_TO_BANGLA).some(keyword => {
                const regex = new RegExp(`\\b${keyword.replace('.', '\\.')}\\b`);
                return regex.test(lineText);
            });

            if (hasJsKeywords) {
                const convertAllAction = new vscode.CodeAction(
                    'এই লাইনের সব JavaScript কীওয়ার্ড বাংলায় রূপান্তর করুন',
                    vscode.CodeActionKind.QuickFix
                );
                convertAllAction.command = {
                    title: 'Convert All JS Keywords',
                    command: 'banglascript.convertLineToLangla',
                    arguments: [document, range.start.line]
                };
                codeActions.push(convertAllAction);
            }

            return codeActions;
        }
    };
}

// Command to convert entire line
export function registerConvertLineCommand(): vscode.Disposable {
    return vscode.commands.registerCommand('banglascript.convertLineToLangla',
        async (document: vscode.TextDocument, lineNumber: number) => {
            const line = document.lineAt(lineNumber);
            let newText = line.text;

            // Replace all JS keywords with Bengali
            for (const [jsKeyword, banglaKeyword] of Object.entries(JS_TO_BANGLA)) {
                const regex = new RegExp(`\\b${jsKeyword.replace('.', '\\.')}\\b`, 'g');
                newText = newText.replace(regex, banglaKeyword);
            }

            if (newText !== line.text) {
                const edit = new vscode.WorkspaceEdit();
                edit.replace(document.uri, line.range, newText);
                await vscode.workspace.applyEdit(edit);
                vscode.window.showInformationMessage('✅ JavaScript কীওয়ার্ড বাংলায় রূপান্তরিত হয়েছে!');
            }
        }
    );
}

// Command to convert entire document
export function registerConvertDocumentCommand(): vscode.Disposable {
    return vscode.commands.registerCommand('banglascript.convertDocumentToBangla',
        async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor || editor.document.languageId !== 'banglascript') {
                vscode.window.showWarningMessage('অনুগ্রহ করে একটি BanglaScript ফাইল খুলুন।');
                return;
            }

            const document = editor.document;
            let newText = document.getText();
            let replacementCount = 0;

            // Replace all JS keywords with Bengali
            for (const [jsKeyword, banglaKeyword] of Object.entries(JS_TO_BANGLA)) {
                const regex = new RegExp(`\\b${jsKeyword.replace('.', '\\.')}\\b`, 'g');
                const matches = newText.match(regex);
                if (matches) {
                    replacementCount += matches.length;
                    newText = newText.replace(regex, banglaKeyword);
                }
            }

            if (replacementCount > 0) {
                const fullRange = new vscode.Range(
                    document.positionAt(0),
                    document.positionAt(document.getText().length)
                );

                const edit = new vscode.WorkspaceEdit();
                edit.replace(document.uri, fullRange, newText);
                await vscode.workspace.applyEdit(edit);

                vscode.window.showInformationMessage(
                    `✅ ${replacementCount}টি JavaScript কীওয়ার্ড বাংলায় রূপান্তরিত হয়েছে!`
                );
            } else {
                vscode.window.showInformationMessage('কোনো JavaScript কীওয়ার্ড পাওয়া যায়নি।');
            }
        }
    );
}
