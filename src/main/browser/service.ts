import { app } from "electron";
import path from "node:path";
import fs from "node:fs";

export interface BrowserSettings {
  browserPath?: string;
}

interface SettingsData {
  browserPath?: string;
  [key: string]: unknown;
}

// 缓存设置文件路径
let settingsFilePath: string | null = null;

// 获取设置文件路径
const getSettingsFile = (): string => {
  if (!settingsFilePath) {
    settingsFilePath = path.join(app.getPath("userData"), "settings.json");
  }
  return settingsFilePath;
};

// 读取设置
const readSettings = (): SettingsData => {
  try {
    const settingsFile = getSettingsFile();
    if (fs.existsSync(settingsFile)) {
      const data = fs.readFileSync(settingsFile, "utf-8");
      return JSON.parse(data) as SettingsData;
    }
  } catch (error) {
    console.error("读取设置失败:", error);
  }
  return {};
};

// 保存设置
const saveSettings = (settings: SettingsData): boolean => {
  try {
    const settingsFile = getSettingsFile();
    fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("保存设置失败:", error);
    return false;
  }
};

// 读取浏览器设置
export const readBrowserSettings = (): BrowserSettings => {
  const settings = readSettings();
  return {
    browserPath: settings.browserPath,
  };
};

// 保存浏览器路径
export const saveBrowserPath = (browserPath: string): boolean => {
  const currentSettings = readSettings();
  const newSettings: SettingsData = {
    ...currentSettings,
    browserPath: browserPath || undefined,
  };
  return saveSettings(newSettings);
};

// 获取浏览器路径
export const getBrowserPath = (): string | null => {
  const settings = readBrowserSettings();
  return settings.browserPath || null;
};
