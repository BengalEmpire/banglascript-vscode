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
const commands_1 = require("./commands");
// ==================== ACTIVATION ====================
function activate(context) {
    console.log('BanglaScript extension is now active!');
    // Show welcome message
    const config = vscode.workspace.getConfiguration('banglascript');
    if (config.get('showWelcomeMessage')) {
        vscode.window.showInformationMessage('🎉 BanglaScript is ready! বাংলায় কোডিং শুরু করুন!', 'Create Template', 'Documentation', "Don't Show Again").then(selection => {
            if (selection === 'Create Template') {
                vscode.commands.executeCommand('banglascript.helloWorld');
            }
            else if (selection === 'Documentation') {
                vscode.commands.executeCommand('banglascript.showDocumentation');
            }
            else if (selection === "Don't Show Again") {
                config.update('showWelcomeMessage', false, true);
            }
        });
    }
    // Register providers and commands
    const hoverProvider = vscode.languages.registerHoverProvider('banglascript', (0, hoverProvider_1.createHoverProvider)());
    const helloWorldCommand = (0, commands_1.createHelloWorldCommand)();
    const docsCommand = (0, commands_1.createDocsCommand)();
    // Push to context
    context.subscriptions.push(hoverProvider, helloWorldCommand, docsCommand);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map