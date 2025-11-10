// Command registrations for BanglaScript
import * as vscode from 'vscode';
import { getDocumentationHTML } from '../webviews/documentation';  // Import doc function

// Hello World Command
export function createHelloWorldCommand(): vscode.Disposable {
    return vscode.commands.registerCommand('banglascript.helloWorld', async () => {
        const template = `// হ্যালো ওয়ার্ল্ড প্রোগ্রাম 🌍
লিখো("হ্যালো, বিশ্ব! 🇧🇩");

// ফাংশন উদাহরণ
অনুষ্ঠান যোগ(ক, খ) {
    প্রেরণ ক + খ;
}

সংখ্যা ফলাফল = যোগ(৫, ৩);
লিখো("যোগফল:", ফলাফল);
`;

        const doc = await vscode.workspace.openTextDocument({
            content: template,
            language: 'banglascript'
        });
        
        await vscode.window.showTextDocument(doc);
        vscode.window.showInformationMessage('✅ Hello World template created!');
    });
}

// Documentation Command
export function createDocsCommand(): vscode.Disposable {
    return vscode.commands.registerCommand('banglascript.showDocumentation', () => {
        const panel = vscode.window.createWebviewPanel(
            'banglascriptDocs',
            'BanglaScript Documentation',
            vscode.ViewColumn.Beside,
            {}
        );
        panel.webview.html = getDocumentationHTML();  // Now imported
    });
}