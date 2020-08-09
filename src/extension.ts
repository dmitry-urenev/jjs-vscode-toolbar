import * as vscode from 'vscode';

/**
 * called on extension start
 *
 * @export
 * @param {vscode.ExtensionContext} context
 */
export function activate(context: vscode.ExtensionContext) {

    registerFileCommands(context);

    registerEditorCommands(context);
}

/**
 * registers file related commands
 *
 * @param {vscode.ExtensionContext} context
 */
function registerFileCommands(context: vscode.ExtensionContext) {            
    const saveCmd = vscode.commands.registerCommand('quickbar.save', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.document.save();
        }
    });
    context.subscriptions.push(saveCmd);    
}

function registerEditorCommand(
    context: vscode.ExtensionContext,
    commandId: string,
    vscodeCommandId: string
) {
    const cmd = vscode.commands.registerCommand(commandId, () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        else {
            vscode.commands.executeCommand(vscodeCommandId);
        }
    });

    context.subscriptions.push(cmd);
}

/**
 * registers editor related commands
 *
 * @param {vscode.ExtensionContext} context
 */
function registerEditorCommands(context: vscode.ExtensionContext) {
    registerEditorCommand(context, 'quickbar.copy', 'editor.action.clipboardCopyAction');
    registerEditorCommand(context, 'quickbar.cut', 'editor.action.clipboardCutAction');
    registerEditorCommand(context, 'quickbar.paste', 'editor.action.clipboardPasteAction');

    registerEditorCommand(context, 'quickbar.undo', 'undo');
    registerEditorCommand(context, 'quickbar.redo', 'redo');

    const trimWhiteSpaceCmd = vscode.commands.registerCommand('quickbar.trimWhitespace', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        else {
            vscode.commands.executeCommand('editor.action.selectAll');
            vscode.commands.executeCommand('editor.action.trimTrailingWhitespace');
            vscode.commands.executeCommand('workbench.action.navigateBack');
            vscode.commands.executeCommand('workbench.action.navigateForward');
        }
    });
    context.subscriptions.push(trimWhiteSpaceCmd);
    
    const uppercaseCmd = vscode.commands.registerCommand('quickbar.upperCase', () => {
        vscode.commands.executeCommand('editor.action.transformToUppercase');
    });
    context.subscriptions.push(uppercaseCmd);

    const lowercaseCmd = vscode.commands.registerCommand('quickbar.lowerCase', () => {
        vscode.commands.executeCommand('editor.action.transformToLowercase');
    });
    context.subscriptions.push(lowercaseCmd);    
}

/**
 * called on extension unload
 *
 * @export
 */
export function deactivate() {}
