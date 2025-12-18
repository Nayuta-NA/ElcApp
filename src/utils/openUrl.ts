// 类型定义
interface ElectronAPI {
  openExternal: (url: string) => Promise<void>;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}
export const openUrl = async (url: string) => {
  if (window.electronAPI) {
    return await window.electronAPI.openExternal(url);
  }
};
