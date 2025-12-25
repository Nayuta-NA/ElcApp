import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config
export default defineConfig({
  build: {
    outDir: ".vite/build",
    emptyOutDir: false,
    lib: false,
    rollupOptions: {
      input: path.resolve(__dirname, "src/main.ts"),
      output: {
        format: "cjs",
        entryFileNames: "main.js",
      },
      external: (id) => {
        if (id === "electron") {
          return true;
        }
        if (id.startsWith("node:")) {
          return true;
        }
        const nodeBuiltins = [
          "child_process",
          "fs",
          "path",
          "os",
          "crypto",
          "stream",
          "util",
          "events",
          "buffer",
          "url",
          "http",
          "https",
          "net",
          "tls",
          "dns",
          "zlib",
          "querystring",
        ];
        if (nodeBuiltins.includes(id)) {
          return true;
        }
        return false;
      },
    },
  },
  define: {
    MAIN_WINDOW_VITE_DEV_SERVER_URL: JSON.stringify(undefined),
    MAIN_WINDOW_VITE_NAME: JSON.stringify("main_window"),
  },
});
