export interface ElectronAPI {
  openExternal: (url: string) => Promise<void>;
  selectBrowserPath: () => Promise<string | null>;
  saveBrowserPath: (browserPath: string) => Promise<boolean>;
  getBrowserPath: () => Promise<string | null>;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}
