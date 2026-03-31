/**
 * Vue 3 Snippets - VSCode extension entry point.
 * Provides auto-formatting, file generation, and status bar management.
 */
import * as vscode from 'vscode';
import { StatusBarUi } from './status';
import prettier from 'prettier';
import { generateComponent, generateService, generateModule } from './generate';

/** Extract file extension from a filename. */
function getFileExtension(filename: string): string {
  const dotIndex = filename.lastIndexOf('.');
  return filename.substring(dotIndex);
}

/** Prettier formatting options from VSCode configuration. */
interface PrettierOptions {
  arrowParens?: string;
  bracketSpacing?: boolean;
  endOfLine?: string;
  htmlWhitespaceSensitivity?: string;
  insertPragma?: boolean;
  jsxBracketSameLine?: boolean;
  jsxSingleQuote?: boolean;
  printWidth?: number;
  proseWrap?: string;
  quoteProps?: string;
  requirePragma?: boolean;
  semi?: boolean;
  singleQuote?: boolean;
  tabWidth?: number;
  trailingComma?: string;
  useTabs?: boolean;
  vueIndentScriptAndStyle?: boolean;
  filepath?: string;
}

/** Read Prettier options from VSCode configuration. */
function getPrettierOptions(config: vscode.WorkspaceConfiguration): PrettierOptions {
  return {
    arrowParens: config.get('arrowParens'),
    bracketSpacing: config.get('bracketSpacing'),
    endOfLine: config.get('endOfLine'),
    htmlWhitespaceSensitivity: config.get('htmlWhitespaceSensitivity'),
    insertPragma: config.get('insertPragma'),
    jsxBracketSameLine: config.get('jsxBracketSameLine'),
    jsxSingleQuote: config.get('jsxSingleQuote'),
    printWidth: config.get('printWidth'),
    proseWrap: config.get('proseWrap'),
    quoteProps: config.get('quoteProps'),
    requirePragma: config.get('requirePragma'),
    semi: config.get('semi'),
    singleQuote: config.get('singleQuote'),
    tabWidth: config.get('tabWidth'),
    trailingComma: config.get('trailingComma'),
    useTabs: config.get('useTabs'),
    vueIndentScriptAndStyle: config.get('vueIndentScriptAndStyle'),
  };
}

/** Activate the extension. */
export function activate(context: vscode.ExtensionContext): void {
  const compileOff = vscode.commands.registerCommand('vue3snippets.compileOff', () => {
    const config = vscode.workspace.getConfiguration('vue3snippets');
    config.update('enable-compile-vue-file-on-did-save-code', true);
    StatusBarUi.watching();
  });

  const compileOn = vscode.commands.registerCommand('vue3snippets.compileOn', () => {
    const config = vscode.workspace.getConfiguration('vue3snippets');
    config.update('enable-compile-vue-file-on-did-save-code', false);
    StatusBarUi.notWatching();
  });

  const format = vscode.commands.registerCommand('vue3snippets.format', () => {
    const config = vscode.workspace.getConfiguration('vue3snippets');
    const options = getPrettierOptions(config);

    const editor = vscode.window.activeTextEditor;
    if (!editor) throw new Error('no active editor');

    const filepath = editor.document.uri.fsPath;
    const doc = editor.document;
    const lineCount = doc.lineCount;
    const text = doc.getText();
    const start = new vscode.Position(0, 0);
    const end = new vscode.Position(lineCount + 1, 0);
    const range = new vscode.Range(start, end);
    const prettierText = prettier.format(text, { ...options, filepath });

    editor.edit((editBuilder: vscode.TextEditorEdit) => {
      editBuilder.replace(range, prettierText);
    });
  });

  const compileStatus = vscode.window.onDidChangeActiveTextEditor((editor?: vscode.TextEditor) => {
    if (!editor?.document.fileName) {
      StatusBarUi.hide();
      return;
    }
    // Show status bar only for .vue files
    if (['.vue'].includes(getFileExtension(editor.document.fileName))) {
      StatusBarUi.show();
    } else {
      StatusBarUi.hide();
    }
  });

  const compileConfigure = vscode.workspace.onDidChangeConfiguration(() => {
    const config = vscode.workspace.getConfiguration('vue3snippets');
    const isDisable = config.get<boolean>('enable-compile-vue-file-on-did-save-code');
    if (isDisable) {
      StatusBarUi.watching();
    } else {
      StatusBarUi.notWatching();
    }
  });

  context.subscriptions.push(compileOn);
  context.subscriptions.push(compileOff);
  context.subscriptions.push(compileStatus);
  context.subscriptions.push(compileConfigure);
  context.subscriptions.push(format);
  context.subscriptions.push(
    vscode.commands.registerCommand('vue3snippets.generator-component', generateComponent),
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('vue3snippets.generator-service', generateService),
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('vue3snippets.generator-module', generateModule),
  );

  vscode.workspace.onWillSaveTextDocument(() => {
    const config = vscode.workspace.getConfiguration('vue3snippets');
    const isEnabled = config.get<boolean>('enable-compile-vue-file-on-did-save-code');
    if (!isEnabled) return;

    const activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor && activeTextEditor.document.languageId === 'vue') {
      vscode.commands.executeCommand('vue3snippets.format');
    }
  });

  vscode.languages.registerDocumentFormattingEditProvider('vue', {
    provideDocumentFormattingEdits(): vscode.TextEdit[] {
      vscode.commands.executeCommand('vue3snippets.format');
      return [];
    },
  });

  StatusBarUi.init(
    vscode.workspace.getConfiguration('vue3snippets').get<boolean>('enable-compile-vue-file-on-did-save-code') ?? false,
  );
}

/** Deactivate the extension. */
export function deactivate(): void {
  // Cleanup handled by VSCode disposables
}