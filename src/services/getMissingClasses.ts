import * as vscode from 'vscode';

export async function getMissingClasses(editor? : vscode.TextEditor) :Promise<[string[], string, string]>{

	const text = editor!.document.getText();
	const classAttributeRegex = /class=["'][^"']*["']/g;
	const matches = [...text.matchAll(classAttributeRegex)];
	const htmlClassNames = matches.flatMap(match => {
		const classNameMatch = match[0].match(/["']([^"']+)["']/);
		return classNameMatch ? classNameMatch[1].split(' ') : [];
	})
	 
	const cssFileName = editor?.document.fileName.replace(/\.html$/, ".css");
	const uri = vscode.Uri.file(cssFileName!);

	try{
		await vscode.workspace.fs.stat(uri);
	}catch(error){
		vscode.window.showErrorMessage(`Could not find the css file`);
	}

	const cssFileContent = await vscode.workspace.fs.readFile(uri);
	const cssText = new TextDecoder().decode(cssFileContent);
	const cssClassRegex = /\.([a-zA-Z0-9_-]+)/g;
	const cssMatches = [...cssText.matchAll(cssClassRegex)];
	const cssClassNames = cssMatches.map(match => match[1]);

	const missingClasses = htmlClassNames.filter(item => !cssClassNames.includes(item));
	return [missingClasses, cssText, cssFileName!];
}