'use strict';
import * as vscode from 'vscode';

const userConfig = vscode.workspace.getConfiguration();
let extensionConfig;
let nightTheme, dayTheme;
let nightThemeCustomizations, dayThemeCustomizations;

function updateSettings() {
  console.log("updated settings");
  extensionConfig = vscode.workspace.getConfiguration('dayNightThemeSwitcher');
  nightTheme = extensionConfig.nightTheme;
  dayTheme = extensionConfig.dayTheme;
  nightThemeCustomizations = extensionConfig.nightThemeCustomizations;
  dayThemeCustomizations = extensionConfig.dayThemeCustomizations;
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.workspace.onDidChangeConfiguration(updateSettings, this);
  updateSettings();

  vscode.commands.registerCommand('extension.switchToNightTheme', () => {
    console.log("to night: " + nightTheme);
    userConfig.update("workbench.colorTheme", nightTheme, true);
    userConfig.update("workbench.colorCustomizations", nightThemeCustomizations, true);
  });

  vscode.commands.registerCommand('extension.switchToDayTheme', () => {
    console.log("to day: " + dayTheme);
    userConfig.update("workbench.colorTheme", dayTheme, true);
    userConfig.update("workbench.colorCustomizations", dayThemeCustomizations, true);
  });

  context.subscriptions.push(disposable);  
}
