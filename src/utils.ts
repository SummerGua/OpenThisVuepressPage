import * as vscode from 'vscode';

export function currentPageUri() {
  return vscode.window.activeTextEditor
    && vscode.window.activeTextEditor.document
    && vscode.window.activeTextEditor.document.uri
    && vscode.window.activeTextEditor.document.uri.path;
};

export function getBase(): string {
  return vscode.workspace.getConfiguration('openthisvuepresspage').get('vuepressBase')!;
}