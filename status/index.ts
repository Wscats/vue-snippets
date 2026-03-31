/**
 * StatusBarUi - manages the VSCode status bar for Vue auto-format state.
 */
import * as vscode from 'vscode';

export class StatusBarUi {
  private static _statusBarItem: vscode.StatusBarItem;

  static get statusBarItem(): vscode.StatusBarItem {
    if (!StatusBarUi._statusBarItem) {
      StatusBarUi._statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right, 200,
      );
      this.statusBarItem.show();
    }
    return StatusBarUi._statusBarItem;
  }

  static show(): void {
    this.statusBarItem.show();
  }

  static hide(): void {
    this.statusBarItem.hide();
  }

  static init(enableCompileFilesOnDidSaveCode: boolean): void {
    StatusBarUi.working('Starting...');
    setTimeout(() => {
      enableCompileFilesOnDidSaveCode ? StatusBarUi.watching() : StatusBarUi.notWatching();
    }, 1000);
  }

  static watching(): void {
    StatusBarUi.statusBarItem.text = '$(eye) Auto Format Vue: On';
    StatusBarUi.statusBarItem.color = 'inherit';
    StatusBarUi.statusBarItem.command = 'vue3snippets.compileOn';
    StatusBarUi.statusBarItem.tooltip = 'Stop live compilation';
  }

  static notWatching(): void {
    StatusBarUi.statusBarItem.text = '$(eye-closed) Auto Format Vue: Off';
    StatusBarUi.statusBarItem.color = 'inherit';
    StatusBarUi.statusBarItem.command = 'vue3snippets.compileOff';
    StatusBarUi.statusBarItem.tooltip = 'live compilation';
  }

  static working(workingMsg: string = 'Working on it...'): void {
    StatusBarUi.statusBarItem.text = `$(pulse) ${workingMsg}`;
    StatusBarUi.statusBarItem.tooltip = 'In case if it takes long time, Show output window and report.';
    StatusBarUi.statusBarItem.command = undefined;
  }

  static compilationSuccess(isWatching: boolean): void {
    StatusBarUi.statusBarItem.text = '$(check) Success';
    StatusBarUi.statusBarItem.color = '#33ff00';
    StatusBarUi.statusBarItem.command = undefined;
    if (isWatching) {
      setTimeout(() => {
        StatusBarUi.statusBarItem.color = 'inherit';
        StatusBarUi.watching();
      }, 4500);
    } else {
      StatusBarUi.notWatching();
    }
  }

  static compilationError(isWatching: boolean): void {
    StatusBarUi.statusBarItem.text = '$(x) Error';
    StatusBarUi.statusBarItem.color = '#ff0033';
    StatusBarUi.statusBarItem.command = undefined;
    if (isWatching) {
      setTimeout(() => {
        StatusBarUi.statusBarItem.color = 'inherit';
        StatusBarUi.watching();
      }, 4500);
    } else {
      StatusBarUi.notWatching();
    }
  }

  static dispose(): void {
    StatusBarUi.statusBarItem.dispose();
  }
}