/**
 * File generator commands for Vue 3 Snippets extension.
 * Generates component, service, and module files from templates.
 */
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { moduleFile } from './template/module';
import { componentFile } from './template/component';
import { serviceFile } from './template/service';

/** Resolve a path to its parent directory if it's a file. */
function findDir(filePath: string): string {
  if (fs.statSync(filePath).isFile()) {
    return path.dirname(filePath);
  }
  return filePath;
}

/** Recursively create directories. */
function makeDirSync(dir: string): void {
  if (fs.existsSync(dir)) return;
  if (!fs.existsSync(path.dirname(dir))) {
    makeDirSync(path.dirname(dir));
  }
  fs.mkdirSync(dir);
}

/** Create a file with content, creating parent directories as needed. */
function makeFileSync(filename: string, content: string): void {
  if (!fs.existsSync(filename)) {
    makeDirSync(path.dirname(filename));
    fs.createWriteStream(filename).write(content);
  }
}

/** Generate a Vue component file from template. */
export function generateComponent(file: vscode.Uri): void {
  vscode.window
    .showInputBox({
      value: '',
      prompt: 'Component name',
      ignoreFocusOut: true,
      valueSelection: [-1, -1],
    })
    .then((name: string | undefined) => {
      if (!name) return;
      const componentName = name.charAt(0).toUpperCase() + name.slice(1);
      const dir = findDir(file.fsPath);
      makeFileSync(
        `${dir}/${componentName}.vue`,
        componentFile.replace(/{componentName}/g, componentName),
      );
    });
}

/** Generate a service file from template. */
export function generateService(file: vscode.Uri): void {
  vscode.window
    .showInputBox({
      value: '',
      prompt: 'service name',
      ignoreFocusOut: true,
      valueSelection: [-1, -1],
    })
    .then((name: string | undefined) => {
      if (!name) return;
      const dir = findDir(file.fsPath);
      const targetPath = path.join(dir, name);
      makeFileSync(
        `${targetPath}/${name}.js`,
        serviceFile.replace(/{serviceName}/g, name),
      );
    });
}

/** Generate a Vuex module file from template. */
export function generateModule(file: vscode.Uri): void {
  vscode.window
    .showInputBox({
      value: '',
      prompt: 'module name',
      ignoreFocusOut: true,
      valueSelection: [-1, -1],
    })
    .then((name: string | undefined) => {
      if (!name) return;
      const dir = findDir(file.fsPath);
      makeFileSync(`${dir}/${name}.js`, moduleFile);
    });
}
