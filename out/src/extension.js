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
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const hoverProvider_1 = require("./providers/hoverProvider");
const completionProvider_1 = require("./providers/completionProvider");
const diagnosticProvider_1 = require("./providers/diagnosticProvider");
const codeActionProvider_1 = require("./providers/codeActionProvider");
const commands_1 = require("./commands");
// Status bar item for BanglaScript
let statusBarItem;
// ==================== ACTIVATION ====================
function activate(context) {
    console.log('🇧🇩 BanglaScript extension is now active!');
    // ==================== STATUS BAR ====================
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = '$(code) বাংলাস্ক্রিপ্ট';
    statusBarItem.tooltip = 'BanglaScript - বাংলায় কোডিং করুন!';
    statusBarItem.command = 'banglascript.showDocumentation';
    context.subscriptions.push(statusBarItem);
    // Update status bar visibility based on active editor
    updateStatusBar();
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(() => updateStatusBar()));
    // ==================== WELCOME MESSAGE ====================
    const config = vscode.workspace.getConfiguration('banglascript');
    if (config.get('showWelcomeMessage')) {
        vscode.window.showInformationMessage('🎉 বাংলাস্ক্রিপ্ট সক্রিয়! বাংলায় কোডিং শুরু করুন! 🇧🇩', 'নতুন ফাইল তৈরি করুন', 'ডকুমেন্টেশন দেখুন', 'আর দেখাবেন না').then(selection => {
            if (selection === 'নতুন ফাইল তৈরি করুন') {
                vscode.commands.executeCommand('banglascript.createNewFile');
            }
            else if (selection === 'ডকুমেন্টেশন দেখুন') {
                vscode.commands.executeCommand('banglascript.showDocumentation');
            }
            else if (selection === 'আর দেখাবেন না') {
                config.update('showWelcomeMessage', false, true);
            }
        });
    }
    // ==================== LANGUAGE PROVIDERS ====================
    // Hover Provider - shows keyword documentation on hover
    const hoverProvider = vscode.languages.registerHoverProvider('banglascript', (0, hoverProvider_1.createHoverProvider)());
    // Completion Provider - IntelliSense autocomplete
    const completionProvider = vscode.languages.registerCompletionItemProvider('banglascript', (0, completionProvider_1.createCompletionProvider)(), '.', // Trigger on dot
    '"', // Trigger in strings
    "'" // Trigger in strings
    );
    // Signature Help Provider - function parameter hints
    const signatureProvider = vscode.languages.registerSignatureHelpProvider('banglascript', (0, completionProvider_1.createSignatureHelpProvider)(), '(', ',');
    // Code Action Provider - quick fixes
    const codeActionProvider = vscode.languages.registerCodeActionsProvider('banglascript', (0, codeActionProvider_1.createCodeActionProvider)(), {
        providedCodeActionKinds: [
            vscode.CodeActionKind.QuickFix,
            vscode.CodeActionKind.Refactor
        ]
    });
    // ==================== DIAGNOSTICS ====================
    const diagnosticCollection = (0, diagnosticProvider_1.createDiagnosticCollection)(context);
    // Update diagnostics on document change
    if (vscode.window.activeTextEditor) {
        (0, diagnosticProvider_1.updateDiagnostics)(vscode.window.activeTextEditor.document, diagnosticCollection);
    }
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(event => {
        if (event.document.languageId === 'banglascript') {
            (0, diagnosticProvider_1.updateDiagnostics)(event.document, diagnosticCollection);
        }
    }), vscode.workspace.onDidOpenTextDocument(document => {
        if (document.languageId === 'banglascript') {
            (0, diagnosticProvider_1.updateDiagnostics)(document, diagnosticCollection);
        }
    }), vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor && editor.document.languageId === 'banglascript') {
            (0, diagnosticProvider_1.updateDiagnostics)(editor.document, diagnosticCollection);
        }
    }));
    // ==================== COMMANDS ====================
    const helloWorldCommand = (0, commands_1.createHelloWorldCommand)();
    const docsCommand = (0, commands_1.createDocsCommand)();
    const newFileCommand = (0, commands_1.createNewFileCommand)();
    const runFileCommand = (0, commands_1.createRunFileCommand)();
    const keywordRefCommand = (0, commands_1.createKeywordReferenceCommand)();
    const convertLineCommand = (0, codeActionProvider_1.registerConvertLineCommand)();
    const convertDocCommand = (0, codeActionProvider_1.registerConvertDocumentCommand)();
    // ==================== PUSH TO CONTEXT ====================
    context.subscriptions.push(hoverProvider, completionProvider, signatureProvider, codeActionProvider, helloWorldCommand, docsCommand, newFileCommand, runFileCommand, keywordRefCommand, convertLineCommand, convertDocCommand);
    console.log('✅ BanglaScript extension activated with all features!');
}
// Update status bar visibility
function updateStatusBar() {
    const editor = vscode.window.activeTextEditor;
    if (editor && editor.document.languageId === 'banglascript') {
        statusBarItem.show();
    }
    else {
        statusBarItem.hide();
    }
}
function deactivate() {
    if (statusBarItem) {
        statusBarItem.dispose();
    }
    console.log('👋 BanglaScript extension deactivated');
}
//# sourceMappingURL=extension.js.map