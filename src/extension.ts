import * as vscode from 'vscode';
import { currentPageUri, getBase } from './utils';
const open = require('open');

export function activate(context: vscode.ExtensionContext) {
	
	let realPath: string;

	let disposable = vscode.commands.registerCommand('openthisvuepresspage.helloWorld', () => {

		let base = getBase();

		vscode.window.showInformationMessage(`Your current base is${base}, you can change it in VSCode setting`);

		if (currentPageUri() !== null) {
			realPath = currentPageUri()?.split('docs/')[1]!;
			realPath = realPath.replace('.md', '.html');
		}
		if (base === '/') {
			realPath = 'http://localhost:8080/' + realPath;
		} else {
			realPath = 'http://localhost:8080/'+ base + '/' + realPath;
		}
		open(realPath);
		realPath = '';
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
