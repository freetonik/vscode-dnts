'use strict';
import * as vscode from 'vscode';

const userConfig = vscode.workspace.getConfiguration();
let extensionConfig;
let nightTheme, dayTheme;

function updateSettings() {
  console.log("updated settings");
  extensionConfig = vscode.workspace.getConfiguration('dayNightThemeSwitcher');
  nightTheme = extensionConfig.nightTheme;
  dayTheme = extensionConfig.dayTheme;
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.workspace.onDidChangeConfiguration(updateSettings, this);
  updateSettings();

  vscode.commands.registerCommand('extension.switchToNightTheme', () => {
    console.log("to night: " + nightTheme);
    userConfig.update("workbench.colorTheme", nightTheme, true);
  });

  vscode.commands.registerCommand('extension.switchToDayTheme', () => {
    console.log("to day: " + dayTheme);
    userConfig.update("workbench.colorTheme", dayTheme, true);
  });

  context.subscriptions.push(disposable);  
}
