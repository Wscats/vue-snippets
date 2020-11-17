const vscode = require("vscode");
const statusBarUi = require("./status");
const prettier = require("prettier");

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
    let format = vscode.commands.registerCommand("vue3snippets.format", () => {
        const editor = vscode.window.activeTextEditor;
        const filepath = editor.document.uri.fsPath;
        if (!editor) throw new Error('no active editor');
        const doc = editor.document;
        const lineCount = doc.lineCount;
        const text = doc.getText();
        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(lineCount + 1, 0);
        const range = new vscode.Range(start, end);
        const prettierText = prettier.format(text, { filepath });
        editor.edit((editBuilder, error) => {
            error && window.showErrorMessage(error);
            editBuilder.replace(range, prettierText);
        });
    });
    context.subscriptions.push(compileOn);
    context.subscriptions.push(compileOff);
    context.subscriptions.push(format);
    vscode.workspace.onWillSaveTextDocument((document) => {
        let config = vscode.workspace.getConfiguration("vue3snippets");
        let isEnableOnDidSaveTextDocument = config.get("enable-compile-vue-file-on-did-save-code");
        if (!isEnableOnDidSaveTextDocument) { return };
        let activeTextEditor = vscode.window.activeTextEditor;
        if (activeTextEditor && activeTextEditor.document.languageId === 'vue') {
            vscode.commands.executeCommand("vue3snippets.format");
        }
    });
    vscode.languages.registerDocumentFormattingEditProvider('vue', {
        provideDocumentFormattingEdits(document) {
            vscode.commands.executeCommand("vue3snippets.format");
        }
    });
    statusBarUi.StatusBarUi.init(vscode.workspace.getConfiguration("vue3snippets").get("enable-compile-vue-file-on-did-save-code"));
}

exports.activate = activate;
function deactivate() { };
exports.deactivate = deactivate;