import * as vscode from 'vscode';
import { currentPageUri, cutFileUri, getBase, getCommand, getHttpPath, getPort, runCommanInTerminal } from './utils';
const tcpPortUsed = require('tcp-port-used');
const open = require('open');

export function activate(context: vscode.ExtensionContext) {

  let path: string;

  let openActivePage = vscode.commands.registerCommand('openthisvuepresspage.openActivePage', () => {

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

    tcpPortUsed.check(port, '127.0.0.1').then((inUse: boolean) => {
      if (inUse) {
        open(path);
        path = '';
      } else {
        runCommanInTerminal(command);
        open(path);
        path = '';
      }
    });
  });

  let openExplorer = vscode.commands.registerCommand('openthisvuepresspage.openExlorer', (uri: vscode.Uri) => {

    let base: string = getBase();
    let port: number = getPort();
    let command: string = getCommand();

    vscode.window.showInformationMessage(`Current base is '${base}', port is ${port}`);

    let path = cutFileUri(uri.fsPath);
    path = getHttpPath(port, base, path);

    tcpPortUsed.check(port, '127.0.0.1').then((inUse: boolean) => {
      if (inUse) {
        open(path);
        path = '';
      } else {
        runCommanInTerminal(command);
        open(path);
        path = '';
      }
    });
  });

  context.subscriptions.push(openActivePage);
  context.subscriptions.push(openExplorer);
}
