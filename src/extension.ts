import * as vscode from 'vscode';
import {createClasses } from './services/createClasses';

export async function activate(context: vscode.ExtensionContext) {



	vscode.workspace.onDidSaveTextDocument(async (event) => {
        const editor = vscode.window.activeTextEditor;
        if (editor && event === editor.document && editor.document.languageId === 'html') {
            await createClasses(editor);
        }
    });
}


export function deactivate() {}
