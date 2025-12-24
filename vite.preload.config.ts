import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config
export default defineConfig({
  build: {
    outDir: ".vite/build",
    emptyOutDir: false,
    lib: false,
    rollupOptions: {
      input: path.resolve(__dirname, "src/preload.ts"),
      output: {
        format: "cjs",
        entryFileNames: "preload.js",
      },
      external: ["electron"],
    },
  },
});
