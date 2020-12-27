const vscode = require("vscode");
const statusBarUi = require("./status");
const prettier = require("prettier");
const { generateComponent, generateService, generateModule } = require("./generate");

function fileType(filename) {
    const index1 = filename.lastIndexOf(".");
    const index2 = filename.length;
    const type = filename.substring(index1, index2);
    return type;
};

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
    let compileStatus = vscode.window.onDidChangeActiveTextEditor((document) => {
        if (!document?.document.fileName) {
            statusBarUi.StatusBarUi.hide();
            return;
        }
        // 编辑器是否命中正确的编译文件，如果编译文件后缀正确才显示右下角状态栏
        if (['.vue'].includes(fileType(document?.document.fileName))) {
            statusBarUi.StatusBarUi.show();
        } else {
            statusBarUi.StatusBarUi.hide();
        }
    })

    let compileConfigure = vscode.workspace.onDidChangeConfiguration(() => {
        // 修改配置，更新右下角底部状态栏
        let config = vscode.workspace.getConfiguration("vue3snippets");
        let isDisable = config.get("enable-compile-vue-file-on-did-save-code");
        if (isDisable) {
            statusBarUi.StatusBarUi.watching();
        } else {
            statusBarUi.StatusBarUi.notWatching();
        }
    })

    context.subscriptions.push(compileOn);
    context.subscriptions.push(compileOff);
    context.subscriptions.push(compileStatus);
    context.subscriptions.push(compileConfigure);
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