// VS Code Hover Provider for Bangla keywords
import * as vscode from 'vscode';
import { KEYWORDS } from '../../themes/Keywords';

export function createHoverProvider(): vscode.HoverProvider {
    return {
        provideHover(document, position, token) {
            const range = document.getWordRangeAtPosition(position, /[a-zA-Z\u0980-\u09FF_][a-zA-Z0-9\u09E6-\u09EF_]*/);
            if (!range) return undefined;
            const word = document.getText(range);

            const jsEquivalent = KEYWORDS[word as keyof typeof KEYWORDS];
            if (jsEquivalent) {
                const markdown = new vscode.MarkdownString();
                markdown.appendMarkdown(`**${word}** → **${jsEquivalent}**\n\nJavaScript equivalent.`);
                return new vscode.Hover(markdown);
            }
            return undefined;
        }
    };
}