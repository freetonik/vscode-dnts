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
  let extPrefix = "dayNightThemeSwitcher";
  let themeKey = "workbench.colorTheme";
  updateSettings();

  vscode.commands.registerCommand(extPrefix + '.switchToNightTheme', () => {
    console.log("to night: " + nightTheme);
    userConfig.update(themeKey, nightTheme, true);
    userConfig.update("workbench.colorCustomizations", nightThemeCustomizations, true);
  });

  vscode.commands.registerCommand(extPrefix + '.switchToDayTheme', () => {
    console.log("to day: " + dayTheme);
    userConfig.update(themeKey, dayTheme, true);
    userConfig.update("workbench.colorCustomizations", dayThemeCustomizations, true);
  });

  vscode.commands.registerCommand(extPrefix + '.toggleDayNightTheme', () => {
    // NOTE: grab the latest setting, not what's cached above
    let currentTheme = vscode.workspace.getConfiguration().get(themeKey);
    console.log("Current Theme: " + currentTheme);
    if (currentTheme === dayTheme) {
      console.log("to night: " + nightTheme);
      userConfig.update(themeKey, nightTheme, true);
    } else if (currentTheme === nightTheme) {
      console.log("to day: " + dayTheme);
      userConfig.update(themeKey, dayTheme, true);
    } else {
      console.log("Toggle initiated, no theme changed");
    }
  });

  context.subscriptions.push(disposable);  
}
