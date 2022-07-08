import * as vscode from 'vscode';
import { currentPageUri, cutFileUri, getBase, getCommand, getHttpPath, getPort, runCommandInTerminal } from './utils';
const tcpPortUsed = require('tcp-port-used');
const open = require('open');

export function activate(context: vscode.ExtensionContext) {

  let path: string;

  let openActivePage = vscode.commands.registerCommand('openthisvuepresspage.openActivePage', async () => {

    let base = getBase();
    let port = getPort();
    let command: string = getCommand();

    vscode.window.showInformationMessage(`Current base is "${base}", port is ${port}`);

    if (currentPageUri()) {
      path = cutFileUri(currentPageUri()!);
      path = getHttpPath(port, base, path);
    } else {
      vscode.window.showErrorMessage(`Can't get current uri!`);
      return;
    }

    const inUse = await tcpPortUsed.check(port, '127.0.0.1');
    if (!inUse) {
      vscode.window.showInformationMessage(`Server auto started. Please wait a few seconds for it.`);
      runCommandInTerminal(command);
    }

    vscode.window.activeTerminal?.show();
    open(path);
    path = '';
  });

  let openExplorer = vscode.commands.registerCommand('openthisvuepresspage.openExplorer', async (uri: vscode.Uri) => {

    let base: string = getBase();
    let port: number = getPort();
    let command: string = getCommand();

    vscode.window.showInformationMessage(`Current base is '${base}', port is ${port}`);

    let path = cutFileUri(uri.fsPath);
    path = getHttpPath(port, base, path);

    const inUse = await tcpPortUsed.check(port, '127.0.0.1');
    if (!inUse) {
      vscode.window.showInformationMessage(`Server auto started. Please wait a few seconds for it.`);
      runCommandInTerminal(command);
    }
    
    vscode.window.activeTerminal?.show();
    open(path);
    path = '';
  });

  context.subscriptions.push(openActivePage);
  context.subscriptions.push(openExplorer);
}
