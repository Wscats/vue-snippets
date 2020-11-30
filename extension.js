const vscode = require("vscode");
const statusBarUi = require("./status");
const prettier = require("prettier");
const { generateComponent, generateService, generateModule } = require("./generate");

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
        let config = vscode.workspace.getConfiguration("vue3snippets");
        let options = {
            arrowParens: config.get("arrowParens"),
            bracketSpacing: config.get("bracketSpacing"),
            endOfLine: config.get("endOfLine"),
            htmlWhitespaceSensitivity: config.get("htmlWhitespaceSensitivity"),
            insertPragma: config.get("insertPragma"),
            jsxBracketSameLine: config.get("jsxBracketSameLine"),
            jsxSingleQuote: config.get("jsxSingleQuote"),
            printWidth: config.get("printWidth"),
            proseWrap: config.get("proseWrap"),
            quoteProps: config.get("quoteProps"),
            requirePragma: config.get("requirePragma"),
            semi: config.get("semi"),
            singleQuote: config.get("singleQuote"),
            tabWidth: config.get("tabWidth"),
            trailingComma: config.get("trailingComma"),
            useTabs: config.get("useTabs"),
            vueIndentScriptAndStyle: config.get("vueIndentScriptAndStyle"),
        }

        const editor = vscode.window.activeTextEditor;
        const filepath = editor.document.uri.fsPath;
        if (!editor) throw new Error('no active editor');
        const doc = editor.document;
        const lineCount = doc.lineCount;
        const text = doc.getText();
        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(lineCount + 1, 0);
        const range = new vscode.Range(start, end);
        const prettierText = prettier.format(text, { ...options, filepath });
        editor.edit((editBuilder, error) => {
            error && window.showErrorMessage(error);
            editBuilder.replace(range, prettierText);
        });
    });
    context.subscriptions.push(compileOn);
    context.subscriptions.push(compileOff);
    context.subscriptions.push(format);
    context.subscriptions.push(vscode.commands.registerCommand("vue3snippets.generator-component", generateComponent));
    context.subscriptions.push(vscode.commands.registerCommand("vue3snippets.generator-service", generateService));
    context.subscriptions.push(vscode.commands.registerCommand("vue3snippets.generator-module", generateModule));
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