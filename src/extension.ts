import * as vscode from 'vscode';

declare var window: any;

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

function registerClipboardCommand(
    context: vscode.ExtensionContext,
    commandId: string,
    action: 'cut' | 'copy' | 'paste'
) {
    const cmd = vscode.commands.registerTextEditorCommand(commandId, () => {

        const exec = (browserAction: string, apiCommand: string) => {
            try {
                vscode.commands.executeCommand(browserAction);
                vscode.commands.executeCommand(apiCommand);
            } catch (error) {
                console.log('Failed with exeption', error);
            }
        };
        
        if (action === 'copy' || action === 'cut') {
            const apiCommand = action === 'copy' 
                ? 'editor.action.clipboardCopyAction' 
                : 'editor.action.clipboardCutAction';
            exec(action, apiCommand);
        } else {
            exec('paste', 'editor.action.clipboardPasteAction');
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
    registerClipboardCommand(context, 'quickbar.copy', 'copy');
    registerClipboardCommand(context, 'quickbar.cut', 'cut');
    registerClipboardCommand(context, 'quickbar.paste', 'paste');

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
