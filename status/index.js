const vscode = require("vscode");
class StatusBarUi {
    static _statusBarItem;
    static get statusBarItem() {
        if (!StatusBarUi._statusBarItem) {
            StatusBarUi._statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 200);
            this.statusBarItem.show();
        }
        return StatusBarUi._statusBarItem;
    }
    static show() {
        this.statusBarItem.show();
    }
    static hide() {
        this.statusBarItem.hide();
    }
    static init(enableCompileFilesOnDidSaveCode) {
        StatusBarUi.working("Starting...");
        setTimeout(function () {
            enableCompileFilesOnDidSaveCode ? StatusBarUi.watching() : StatusBarUi.notWatching();
        }, 1000);
    }
    static watching() {
        StatusBarUi.statusBarItem.text = `$(eye) Auto Format Vue: On`;
        StatusBarUi.statusBarItem.color = 'inherit';
        StatusBarUi.statusBarItem.command = 'vue3snippets.compileOn';
        StatusBarUi.statusBarItem.tooltip = 'Stop live compilation';
    }
    static notWatching() {
        StatusBarUi.statusBarItem.text = `$(eye-closed) Auto Format Vue: Off`;
        StatusBarUi.statusBarItem.color = 'inherit';
        StatusBarUi.statusBarItem.command = 'vue3snippets.compileOff';
        StatusBarUi.statusBarItem.tooltip = 'live compilation';
    }
    static working(workingMsg = "Working on it...") {
        StatusBarUi.statusBarItem.text = `$(pulse) ${workingMsg}`;
        StatusBarUi.statusBarItem.tooltip = 'In case if it takes long time, Show output window and report.';
        StatusBarUi.statusBarItem.command = undefined;
    }

    static compilationSuccess(isWatching) {
        StatusBarUi.statusBarItem.text = `$(check) Success`;
        StatusBarUi.statusBarItem.color = '#33ff00';
        StatusBarUi.statusBarItem.command = undefined;
        if (isWatching) {
            setTimeout(function () {
                StatusBarUi.statusBarItem.color = 'inherit';
                StatusBarUi.watching();
            }, 4500);
        }
        else {
            StatusBarUi.notWatching();
        }
    }
    static compilationError(isWatching) {
        StatusBarUi.statusBarItem.text = `$(x) Error`;
        StatusBarUi.statusBarItem.color = '#ff0033';
        StatusBarUi.statusBarItem.command = undefined;
        if (isWatching) {
            setTimeout(function () {
                StatusBarUi.statusBarItem.color = 'inherit';
                StatusBarUi.watching();
            }, 4500);
        }
        else {
            StatusBarUi.notWatching();
        }
    }
    static dispose() {
        StatusBarUi.statusBarItem.dispose();
    }
}
exports.StatusBarUi = StatusBarUi;