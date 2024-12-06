import * as vscode from 'vscode';
import { getMissingClasses } from './getMissingClasses';

export async function createClasses(editor? : vscode.TextEditor){

	const [missingClasses, cssContent, cssFileName] = await getMissingClasses(editor);
	let existingCssContent =  cssContent;
	missingClasses.forEach((className)=> {
		let temp = `.${className}{} \n \n`
		existingCssContent = existingCssContent + temp;
	})

	const encoder = new TextEncoder();
	const data = encoder.encode(existingCssContent);
	
	try{
		const uri = vscode.Uri.file(cssFileName!);
		await vscode.workspace.fs.writeFile(uri, data);
	}catch(error){
		vscode.window.showErrorMessage(`Could not write to the css file`);
	}

}