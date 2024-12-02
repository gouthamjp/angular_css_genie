import * as vscode from 'vscode';


export async function activate(context: vscode.ExtensionContext) {


	const fileName = vscode.window.activeTextEditor?.document.fileName;
	const cssFileName = fileName?.replace(".html",".css");


	const content = 'Hello, this is some content written from the VS Code extension!';
	const data = encoder.encode(content);
	
	const uri = vscode.Uri.file(cssFileName!);
	await vscode.workspace.fs.writeFile(uri, "data");
	vscode.workspace.onDidChangeTextDocument(event => {
        const editor = vscode.window.activeTextEditor;
        if (editor && event.document === editor.document) {
            checkForClassAttribute(editor);
        }
    });

	vscode.workspace.fs.writeFile

}

function checkForClassAttribute(editor? : vscode.TextEditor){
	const text = editor!.document.getText();
	const classAttributeRegex = /class=["'][^"']*["']/g;
	const matches = [...text.matchAll(classAttributeRegex)];
	console.log(matches);
};
// This method is called when your extension is deactivated
export function deactivate() {}
