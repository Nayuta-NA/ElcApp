import { ipcMain, shell, dialog } from "electron";
import { spawn } from "node:child_process";
import fs from "node:fs";
import {
  readBrowserSettings,
  saveBrowserPath,
  getBrowserPath,
} from "./service";

export const registerBrowserHandlers = () => {
  ipcMain.handle("open-external", async (_, url: string) => {
    const settings = readBrowserSettings();
    const browserPath = settings.browserPath;

    if (browserPath && fs.existsSync(browserPath)) {
      try {
        if (process.platform === "win32") {
          // Windows: 直接使用浏览器路径打开
          spawn(browserPath, [url], { detached: true, stdio: "ignore" });
          return;
        } else if (process.platform === "darwin") {
          // macOS: 使用 open 命令
          spawn("open", ["-a", browserPath, url], {
            detached: true,
            stdio: "ignore",
          });
          return;
        } else {
          // Linux: 直接使用浏览器路径打开
          spawn(browserPath, [url], { detached: true, stdio: "ignore" });
          return;
        }
      } catch (error) {
        console.error("使用指定浏览器打开失败，回退到默认浏览器:", error);
        // 如果失败，回退到默认浏览器
      }
    }

    // 使用默认浏览器打开
    return shell.openExternal(url);
  });

  // 选择浏览器路径
  ipcMain.handle("select-browser-path", async () => {
    try {
      const result = await dialog.showOpenDialog({
        properties: ["openFile"],
        filters: [
          { name: "可执行文件", extensions: ["exe", "app", "App"] },
          { name: "所有文件", extensions: ["*"] },
        ],
      });

      if (!result.canceled && result.filePaths.length > 0) {
        return result.filePaths[0];
      }
      return null;
    } catch (error) {
      console.error("选择浏览器路径失败:", error);
      throw error;
    }
  });

  // 保存浏览器路径到本地缓存
  ipcMain.handle("save-browser-path", (_, browserPath: string) => {
    try {
      return saveBrowserPath(browserPath);
    } catch (error) {
      console.error("保存浏览器路径失败:", error);
      return false;
    }
  });

  // 获取浏览器路径（从本地缓存读取）
  ipcMain.handle("get-browser-path", () => {
    try {
      return getBrowserPath();
    } catch (error) {
      console.error("获取浏览器路径失败:", error);
      return null;
    }
  });
};
