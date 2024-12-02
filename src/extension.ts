import * as vscode from 'vscode';


export async function activate(context: vscode.ExtensionContext) {



	vscode.workspace.onDidSaveTextDocument(async (event) => {
        const editor = vscode.window.activeTextEditor;
        if (editor && event === editor.document && editor.document.languageId === 'html') {
            await checkForClassAttribute(editor);
        }
    });
}


async function checkForClassAttribute(editor? : vscode.TextEditor){

	const text = editor!.document.getText();
	const classAttributeRegex = /class=["'][^"']*["']/g;
	const matches = [...text.matchAll(classAttributeRegex)];
	const htmlClassNames = matches.map(match => {
		const classNameMatch = match[0].match(/["']([^"']+)["']/);
		return classNameMatch ? classNameMatch[1] : '';  
	});

 

	const cssFileName = (editor?.document.fileName)?.replace("html","css");
	const uri = vscode.Uri.file(cssFileName!);
	await vscode.workspace.fs.stat(uri);
	const cssFileContent = await vscode.workspace.fs.readFile(uri);
	const cssText = new TextDecoder().decode(cssFileContent);
	const cssClassRegex = /\.([a-zA-Z0-9_-]+)/g;
	const cssMatches = [...cssText.matchAll(cssClassRegex)];
	const cssClassNames = cssMatches.map(match => match[1]);

	const commonElements = htmlClassNames.filter(item => !cssClassNames.includes(item));
	await createClass(commonElements, cssFileName!, cssText);
};

async function createClass(classNames : string[], cssFileName : string, existingCssContent : string){

	classNames.forEach((className)=> {
		let temp = `.${className}{} \n \n`
		existingCssContent = existingCssContent + temp;
	})

	const encoder = new TextEncoder();
	const data = encoder.encode(existingCssContent);
	
	const uri = vscode.Uri.file(cssFileName!);
	await vscode.workspace.fs.writeFile(uri, data);
}

export function deactivate() {}
