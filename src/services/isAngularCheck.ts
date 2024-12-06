import * as vscode from 'vscode';

export async function isAngularProject(): Promise<boolean> {
    try {
        const angularConfigFiles = await vscode.workspace.findFiles('angular.json', '**/node_modules/**', 1);
        return angularConfigFiles.length > 0;
    } catch (error) {
        console.error('Error checking for Angular project:', error);
        return false;
    }
}