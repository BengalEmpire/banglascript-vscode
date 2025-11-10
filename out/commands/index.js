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
exports.createHelloWorldCommand = createHelloWorldCommand;
exports.createDocsCommand = createDocsCommand;
// Command registrations for BanglaScript
const vscode = __importStar(require("vscode"));
const documentation_1 = require("../webviews/documentation"); // Import doc function
// Hello World Command
function createHelloWorldCommand() {
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
function createDocsCommand() {
    return vscode.commands.registerCommand('banglascript.showDocumentation', () => {
        const panel = vscode.window.createWebviewPanel('banglascriptDocs', 'BanglaScript Documentation', vscode.ViewColumn.Beside, {});
        panel.webview.html = (0, documentation_1.getDocumentationHTML)(); // Now imported
    });
}
//# sourceMappingURL=index.js.map