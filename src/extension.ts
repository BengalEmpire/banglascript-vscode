import * as vscode from 'vscode';
import { createHoverProvider } from './providers/hoverProvider';
import { createCompletionProvider, createSignatureHelpProvider } from './providers/completionProvider';
import { createDiagnosticCollection, updateDiagnostics } from './providers/diagnosticProvider';
import { createCodeActionProvider, registerConvertLineCommand, registerConvertDocumentCommand } from './providers/codeActionProvider';
import { createHelloWorldCommand, createDocsCommand, createNewFileCommand, createRunFileCommand, createKeywordReferenceCommand } from './commands';

// Status bar item for BanglaScript
let statusBarItem: vscode.StatusBarItem;

// ==================== ACTIVATION ====================
export function activate(context: vscode.ExtensionContext) {
    console.log('🇧🇩 BanglaScript extension is now active!');

    // ==================== STATUS BAR ====================
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = '$(code) বাংলাস্ক্রিপ্ট';
    statusBarItem.tooltip = 'BanglaScript - বাংলায় কোডিং করুন!';
    statusBarItem.command = 'banglascript.showDocumentation';
    context.subscriptions.push(statusBarItem);

    // Update status bar visibility based on active editor
    updateStatusBar();
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(() => updateStatusBar())
    );

    // ==================== WELCOME MESSAGE ====================
    const config = vscode.workspace.getConfiguration('banglascript');
    if (config.get('showWelcomeMessage')) {
        vscode.window.showInformationMessage(
            '🎉 বাংলাস্ক্রিপ্ট সক্রিয়! বাংলায় কোডিং শুরু করুন! 🇧🇩',
            'নতুন ফাইল তৈরি করুন',
            'ডকুমেন্টেশন দেখুন',
            'আর দেখাবেন না'
        ).then(selection => {
            if (selection === 'নতুন ফাইল তৈরি করুন') {
                vscode.commands.executeCommand('banglascript.createNewFile');
            } else if (selection === 'ডকুমেন্টেশন দেখুন') {
                vscode.commands.executeCommand('banglascript.showDocumentation');
            } else if (selection === 'আর দেখাবেন না') {
                config.update('showWelcomeMessage', false, true);
            }
        });
    }

    // ==================== LANGUAGE PROVIDERS ====================

    // Hover Provider - shows keyword documentation on hover
    const hoverProvider = vscode.languages.registerHoverProvider(
        'banglascript',
        createHoverProvider()
    );

    // Completion Provider - IntelliSense autocomplete
    const completionProvider = vscode.languages.registerCompletionItemProvider(
        'banglascript',
        createCompletionProvider(),
        '.', // Trigger on dot
        '"', // Trigger in strings
        "'" // Trigger in strings
    );

    // Signature Help Provider - function parameter hints
    const signatureProvider = vscode.languages.registerSignatureHelpProvider(
        'banglascript',
        createSignatureHelpProvider(),
        '(', ','
    );

    // Code Action Provider - quick fixes
    const codeActionProvider = vscode.languages.registerCodeActionsProvider(
        'banglascript',
        createCodeActionProvider(),
        {
            providedCodeActionKinds: [
                vscode.CodeActionKind.QuickFix,
                vscode.CodeActionKind.Refactor
            ]
        }
    );

    // ==================== DIAGNOSTICS ====================
    const diagnosticCollection = createDiagnosticCollection(context);

    // Update diagnostics on document change
    if (vscode.window.activeTextEditor) {
        updateDiagnostics(vscode.window.activeTextEditor.document, diagnosticCollection);
    }

    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument(event => {
            if (event.document.languageId === 'banglascript') {
                updateDiagnostics(event.document, diagnosticCollection);
            }
        }),
        vscode.workspace.onDidOpenTextDocument(document => {
            if (document.languageId === 'banglascript') {
                updateDiagnostics(document, diagnosticCollection);
            }
        }),
        vscode.window.onDidChangeActiveTextEditor(editor => {
            if (editor && editor.document.languageId === 'banglascript') {
                updateDiagnostics(editor.document, diagnosticCollection);
            }
        })
    );

    // ==================== COMMANDS ====================
    const helloWorldCommand = createHelloWorldCommand();
    const docsCommand = createDocsCommand();
    const newFileCommand = createNewFileCommand();
    const runFileCommand = createRunFileCommand();
    const keywordRefCommand = createKeywordReferenceCommand();
    const convertLineCommand = registerConvertLineCommand();
    const convertDocCommand = registerConvertDocumentCommand();

    // ==================== PUSH TO CONTEXT ====================
    context.subscriptions.push(
        hoverProvider,
        completionProvider,
        signatureProvider,
        codeActionProvider,
        helloWorldCommand,
        docsCommand,
        newFileCommand,
        runFileCommand,
        keywordRefCommand,
        convertLineCommand,
        convertDocCommand
    );

    console.log('✅ BanglaScript extension activated with all features!');
}

// Update status bar visibility
function updateStatusBar() {
    const editor = vscode.window.activeTextEditor;
    if (editor && editor.document.languageId === 'banglascript') {
        statusBarItem.show();
    } else {
        statusBarItem.hide();
    }
}

export function deactivate() {
    if (statusBarItem) {
        statusBarItem.dispose();
    }
    console.log('👋 BanglaScript extension deactivated');
}