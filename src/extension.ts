import * as vscode from 'vscode';
import { createHoverProvider } from './providers/hoverProvider'; 
import { createHelloWorldCommand, createDocsCommand } from './commands';  

// ==================== ACTIVATION ====================
export function activate(context: vscode.ExtensionContext) {
    console.log('BanglaScript extension is now active!');

    // Show welcome message
    const config = vscode.workspace.getConfiguration('banglascript');
    if (config.get('showWelcomeMessage')) {
        vscode.window.showInformationMessage(
            '🎉 BanglaScript is ready! বাংলায় কোডিং শুরু করুন!',
            'Create Template',
            'Documentation',
            "Don't Show Again"
        ).then(selection => {
            if (selection === 'Create Template') {
                vscode.commands.executeCommand('banglascript.helloWorld');
            } else if (selection === 'Documentation') {
                vscode.commands.executeCommand('banglascript.showDocumentation');
            } else if (selection === "Don't Show Again") {
                config.update('showWelcomeMessage', false, true);
            }
        });
    }

    // Register providers and commands
    const hoverProvider = vscode.languages.registerHoverProvider('banglascript', createHoverProvider());
    const helloWorldCommand = createHelloWorldCommand();
    const docsCommand = createDocsCommand();

    // Push to context
    context.subscriptions.push(hoverProvider, helloWorldCommand, docsCommand);
}

export function deactivate() {}