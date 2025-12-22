import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  openExternal: (url: string) => ipcRenderer.invoke("open-external", url),
  // 选择浏览器路径
  selectBrowserPath: () =>
    ipcRenderer.invoke("select-browser-path") as Promise<string | null>,
  // 保存浏览器路径到本地缓存
  saveBrowserPath: (browserPath: string) =>
    ipcRenderer.invoke("save-browser-path", browserPath) as Promise<boolean>,
  // 获取浏览器路径（从本地缓存读取）
  getBrowserPath: () =>
    ipcRenderer.invoke("get-browser-path") as Promise<string | null>,
});
