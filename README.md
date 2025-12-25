# Ai-Match

- Node 版本 v20.18.0

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发环境

```bash
pnpm start
```

### 3. 构建项目

#### 构建所有平台

```bash
pnpm build
```

#### 构建 Windows

```bash
pnpm build:win
```

#### 构建 macOS (还没做)

```bash
pnpm build:mac
```

### 需要调用系统操作

根目录下的 `main.ts`文件

### 需要调用系统操作在app做对应的操作

1.在`main.ts`使用`ipcMain.handle`注册方法

2.在`preload.ts`里 `contextBridge.exposeInMainWorld("electronAPI", { ipcRenderer.invoke里暴露}`

3.`rebderer`里已经配置好了React框架，直接在页面/组件上调用即可。

## 后端服务

当前应用需要后端 API 服务运行在 `http://localhost:8000`。

如果需要修改 API 地址，请编辑 `src/fetch/variable.ts` 文件中的 `API_BASE_URL`。

## 可用脚本

- `pnpm start` - 启动开发环境
- `pnpm build` - 构建应用（使用 electron-builder）
- `pnpm build:win` - 构建 Windows 版本
- `pnpm build:mac` - 构建 macOS 版本
- `pnpm lint` - 运行 ESLint 检查
- `pnpm package` - 打包应用（使用 electron-forge）
- `pnpm make` - 制作安装包（使用 electron-forge）

## 项目结构

```
my-app/
├── src/              # 源代码目录
│   ├── main/        # Electron 主进程
│   ├── components/  # React 组件
│   ├── pages/       # 页面组件
│   ├── api/         # API 接口
│   └── fetch/       # HTTP 请求配置
├── assets/          # 静态资源
├── dist/            # 构建输出（electron-builder）
└── out/             # 构建输出（electron-forge）
```

## 技术栈

- **Electron** - 跨平台桌面应用框架
- **React** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **TailwindCSS** - CSS 框架
- **Ant Design** - UI 组件库

## 注意事项

- 确保后端服务在 `http://localhost:8000` 运行
- 首次运行前需要执行 `pnpm install` 安装依赖
- 构建产物会输出到 `dist/` 目录（electron-builder pnpm build）或 `out/` 目录（electron-forge pnpm make）
