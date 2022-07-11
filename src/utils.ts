import * as vscode from 'vscode';

export function currentPageUri(): string | undefined {
  return vscode.window.activeTextEditor?.document?.uri?.path;
};

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

export function getFullHttpPath(port: number, base: string, path: string): string {
  return base === '/' ? `http://localhost:${port}/${path}` : `http://localhost:${port}/${base}/${path}`;
}

export function runCommandInTerminal(command: string): void {
  if (vscode.window.activeTerminal === undefined) {
    const terminal = vscode.window.createTerminal();
    terminal.sendText(command);
  } else {
    vscode.window.activeTerminal.sendText(command);
  }
}
