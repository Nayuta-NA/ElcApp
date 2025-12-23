import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { MakerDMG } from "@electron-forge/maker-dmg";
import { VitePlugin } from "@electron-forge/plugin-vite";
import { FusesPlugin } from "@electron-forge/plugin-fuses";
import { FuseV1Options, FuseVersion } from "@electron/fuses";
import path from "path";

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    name: "Ai-Match",
    executableName: "Ai-Match",
    icon: "assets/icons/appIcon.ico", // Windows 图标路径
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      name: "Ai-Match",
      // 绝对路径 安装程序图标
      setupIcon: path.resolve(__dirname, "assets", "icons", "appIcon.ico"),
    }),

    // macOS DMG 安装包
    new MakerDMG({
      name: "Ai-Match",
      format: "UDZO", // 压缩格式
    }),
    // Linux DEB 包 (Debian/Ubuntu)
    new MakerDeb({
      options: {
        maintainer: "康凌",
        homepage: "https://example.com",
      },
    }),
    // Linux RPM 包 (RedHat/CentOS/Fedora)
    new MakerRpm({
      options: {
        name: "Ai-Match",
      },
    }),
    // ZIP 压缩包 (所有平台)
    new MakerZIP({}),
  ],
  plugins: [
    new VitePlugin({
      build: [
        {
          entry: "src/main.ts",
          config: "vite.main.config.ts",
          target: "main",
        },
        {
          entry: "src/preload.ts",
          config: "vite.preload.config.ts",
          target: "preload",
        },
      ],
      renderer: [
        {
          name: "main_window",
          config: "vite.renderer.config.mjs",
        },
      ],
    }),
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
