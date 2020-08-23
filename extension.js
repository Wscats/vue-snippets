const vscode = require("vscode");
const statusBarUi = require("./status");
const format = require('./format');

function activate(context) {
    let compileOff = vscode.commands.registerCommand("vue3snippets.compileOff", () => {
        let config = vscode.workspace.getConfiguration("vue3snippets");
        config.update("enable-compile-vue-file-on-did-save-code", true);
        statusBarUi.StatusBarUi.watching();
    });
    let compileOn = vscode.commands.registerCommand("vue3snippets.compileOn", () => {
        let config = vscode.workspace.getConfiguration("vue3snippets");
        config.update("enable-compile-vue-file-on-did-save-code", false);
        statusBarUi.StatusBarUi.notWatching();
    });
    context.subscriptions.push(compileOn);
    context.subscriptions.push(compileOff);
    vscode.workspace.onWillSaveTextDocument(() => {
        let config = vscode.workspace.getConfiguration("vue3snippets");
        let isEnableOnDidSaveTextDocument = config.get("enable-compile-vue-file-on-did-save-code");
        if (!isEnableOnDidSaveTextDocument) { return };
        let activeTextEditor = vscode.window.activeTextEditor;
        if (activeTextEditor && activeTextEditor.document.languageId === 'vue') {
            format.init();
        } else {
            // vscode.window.showInformationMessage('It‘s not a .vue file');
        }
    });
    statusBarUi.StatusBarUi.init(vscode.workspace.getConfiguration("vue3snippets").get("enable-compile-vue-file-on-did-save-code"));
}
exports.activate = activate;
function deactivate() { };
exports.deactivate = deactivate;