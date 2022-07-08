import * as vscode from 'vscode';

export function currentPageUri() {
  return vscode.window.activeTextEditor
    && vscode.window.activeTextEditor.document
    && vscode.window.activeTextEditor.document.uri
    && vscode.window.activeTextEditor.document.uri.path;
};

export function rightClickPageUri() {
  return vscode.window.onDidChangeActiveTextEditor.toString();
}

// get base string from setting
export function getBase(): string {
  return vscode.workspace.getConfiguration('openthisvuepresspage').get('vuepressBase')!;
}

// get port number from setting
export function getPort(): number {
  return vscode.workspace.getConfiguration('openthisvuepresspage').get('port')!;
}

// get command from setting
export function getCommand(): string {
  return vscode.workspace.getConfiguration('openthisvuepresspage').get('command')!;
}

// get file uri with `.html`
export function cutFileUri(uri: string): string {
  return uri.replace(/\\/g, '/').split('docs/')[1].replace('.md', '.html');
}

export function getHttpPath(port: number, base: string, path: string): string {
  if (base === '/') {
    return `http://localhost:${port}/${path}`;
  } else {
    return `http://localhost:${port}/${base}/${path}`;
  }
}

export function runCommanInTerminal(command: string): void {
  if(vscode.window.activeTerminal === undefined) {
    const terminal = vscode.window.createTerminal();
    terminal.sendText(command);
  } else {
    vscode.window.activeTerminal.sendText(command);
  }
}
