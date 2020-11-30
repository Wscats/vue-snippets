const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

const { moduleFile } = require("./template/module");
const { componentFile } = require("./template/component");
const { serviceFile } = require("./template/service");

const findDir = (filePath) => {
  if (fs.statSync(filePath).isFile()) {
    return path.dirname(filePath);
  }
  return filePath;
};

const makeDirSync = (dir) => {
  if (fs.existsSync(dir)) {
    return;
  }
  if (!fs.existsSync(path.dirname(dir))) {
    makeDirSync(path.dirname(dir));
  }
  fs.mkdirSync(dir);
};

const makeFileSync = (filename, content) => {
  if (!fs.existsSync(filename)) {
    makeDirSync(path.dirname(filename));
    fs.createWriteStream(filename).write(content);
  }
};

exports.generateComponent = (file) => {
  vscode.window
    .showInputBox({
      value: "",
      prompt: "Component name",
      ignoreFocusOut: true,
      valueSelection: [-1, -1],
    })
    .then((name) => {
      if (!name) {
        return;
      }
      const componentName = name.charAt(0).toUpperCase() + name.slice(1);
      const dir = findDir(file.fsPath);
      makeFileSync(
        `${dir}/${componentName}.vue`,
        componentFile.replace(/{componentName}/g, componentName)
      );
    });
};

exports.generateService = (file) => {
  vscode.window
    .showInputBox({
      value: "",
      prompt: "service name",
      ignoreFocusOut: true,
      valueSelection: [-1, -1],
    })
    .then((name) => {
      if (!name) {
        return;
      }
      const dir = findDir(file.fsPath);
      const targetPath = path.join(dir, name);
      makeFileSync(
        `${targetPath}/${name}.js`,
        serviceFile.replace(/{serviceName}/g, name)
      );
    });
};

exports.generateModule = (file) => {
  vscode.window
    .showInputBox({
      value: "",
      prompt: "module name",
      ignoreFocusOut: true,
      valueSelection: [-1, -1],
    })
    .then((name) => {
      if (!name) {
        return;
      }
      const dir = findDir(file.fsPath);
      makeFileSync(`${dir}/${name}.js`, moduleFile);
    });
};
