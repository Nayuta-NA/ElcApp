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
  /**
   * @makers 打包器配置 输出位置在out目录下，缺陷为不能选择安装位置，没有安装流程，直接快速安装
   * 指令 @pnpm make:win
   * 现在使用electron-builder打包，输出位置在dist目录下，有安装流程，可以选择安装位置
   * 指令 @pnpm build
   * 后续需要打包成苹果，linux,在根目录下的electron-builder配置即可
   *
   */
  makers: [
    new MakerSquirrel({
      name: "Ai-Match",
      setupIcon: path.resolve(__dirname, "assets", "icons", "appIcon.ico"),
    }),
    new MakerDMG({
      name: "Ai-Match",
      format: "UDZO",
    }),
    new MakerDeb({
      options: {
        maintainer: "康凌",
        homepage: "https://example.com",
      },
    }),
    new MakerRpm({
      options: {
        name: "Ai-Match",
      },
    }),
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
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: false,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
