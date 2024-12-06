import * as vscode from 'vscode';
import {createClasses } from './services/createClasses';
import { isAngularProject } from './services/isAngularCheck';

export async function activate(context: vscode.ExtensionContext) {



	vscode.workspace.onDidSaveTextDocument(async (event) => {
        const editor = vscode.window.activeTextEditor;
        if (editor && event === editor.document && editor.document.languageId === 'html') {
			const isAngular = await isAngularProject()
			if(!isAngular) return;		
            await createClasses(editor);
        }
    });
}

