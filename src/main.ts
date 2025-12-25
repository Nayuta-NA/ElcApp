declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string | undefined;
declare const MAIN_WINDOW_VITE_NAME: string;

import {
  app,
  BrowserWindow,
  Tray,
  globalShortcut,
  Menu,
  nativeImage,
} from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import { registerBrowserHandlers } from "./main/browser";

if (started) {
  app.quit();
}

// 单实例锁定：确保只有一个应用实例运行
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  // 如果已经有实例在运行，退出新实例
  app.quit();
} else {
  // 当第二个实例尝试启动时，激活现有窗口
  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.show();
      mainWindow.focus();
    }
  });
}

// 注册浏览器选择相关的 IPC 处理器
registerBrowserHandlers();

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
let isQuitting = false;

// 获取图标路径
const getIconPath = () => {
  if (process.platform === "win32") {
    return process.env.NODE_ENV === "production"
      ? path.join(
          process.resourcesPath,
          "app.asar",
          "assets",
          "icons",
          "appIcon.ico"
        )
      : path.join(__dirname, "../../assets/icons/appIcon.ico");
  } else if (process.platform === "darwin") {
    // macOS 图标路径
    return process.env.NODE_ENV === "production"
      ? path.join(
          process.resourcesPath,
          "app.asar",
          "assets",
          "icons",
          "appIcon.icns"
        )
      : path.join(__dirname, "../../assets/icons/appIcon.icns");
  }
  return undefined;
};

// 创建系统托盘
const createTray = () => {
  // 如果托盘已存在，不重复创建
  if (tray) return;

  const iconPath = getIconPath();
  if (!iconPath) return;

  // 创建托盘图标
  const icon = nativeImage.createFromPath(iconPath);
  tray = new Tray(icon);

  // 创建托盘菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "显示窗口",
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
        }
      },
    },
    {
      label: "隐藏窗口",
      click: () => {
        if (mainWindow) {
          mainWindow.hide();
        }
      },
    },
    { type: "separator" },
    {
      label: "退出",
      click: () => {
        isQuitting = true;
        app.quit();
      },
    },
  ]);

  tray.setToolTip("Ai-Match");
  tray.setContextMenu(contextMenu);

  // 点击托盘图标显示/隐藏窗口
  tray.on("click", () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }
    }
  });
};

// 注册全局快捷键
const registerGlobalShortcut = () => {
  // 注册 Ctrl+Shift+O 快捷键来显示/隐藏窗口
  const ret = globalShortcut.register("CommandOrControl+Shift+O", () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }
    } else {
      createWindow();
    }
  });

  if (!ret) {
    console.log("全局快捷键注册失败");
  }
};

const createWindow = () => {
  // Create the browser window.
  const preloadPath = path.join(__dirname, "preload.js");
  // 设置窗口图标路径
  // 在打包后，资源文件在 app.asar 中，需要使用不同的路径
  const iconPath = getIconPath();
  mainWindow = new BrowserWindow({
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
    // 生产模式：加载构建后的 HTML 文件
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // 窗口关闭时隐藏到托盘而不是退出
  mainWindow.on("close", (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow?.hide();
    }
  });
};

app.on("ready", () => {
  // 确保在单实例锁内才初始化应用
  if (gotTheLock) {
    createWindow();
    createTray();
    registerGlobalShortcut();
  }
});

// 应用退出前注销全局快捷键
app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  if (process.platform === "darwin") {
    // macOS 上如果所有窗口关闭，应用仍然运行
  }
});

app.on("activate", () => {
  if (mainWindow) {
    mainWindow.show();
    mainWindow.focus();
  } else {
    createWindow();
  }
});
