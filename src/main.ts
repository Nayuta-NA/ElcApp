declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string | undefined;
declare const MAIN_WINDOW_VITE_NAME: string;

import { app, BrowserWindow } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import { registerBrowserHandlers } from "./main/browser";

if (started) {
  app.quit();
}

// 注册浏览器选择相关的 IPC 处理器
registerBrowserHandlers();

const createWindow = () => {
  // Create the browser window.
  const preloadPath = path.join(__dirname, "preload.js");
  // 设置窗口图标路径
  // 在打包后，资源文件在 app.asar 中，需要使用不同的路径
  const iconPath =
    process.platform === "win32"
      ? process.env.NODE_ENV === "production"
        ? path.join(
            process.resourcesPath,
            "app.asar",
            "assets",
            "icons",
            "appIcon.ico"
          )
        : path.join(__dirname, "../../assets/icons/appIcon.ico")
      : undefined;
  const mainWindow = new BrowserWindow({
    width: 960,
    height: 600,
    icon: iconPath,
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
