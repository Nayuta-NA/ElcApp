// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge } from "electron";

// 暴露受保护的方法给渲染进程
// 这里可以添加需要在渲染进程中使用的 API
contextBridge.exposeInMainWorld("electronAPI", {
  // 示例：可以在这里添加需要暴露给渲染进程的 API
  // 例如：platform: process.platform,
});
