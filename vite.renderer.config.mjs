/* eslint-disable import/no-unresolved */
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["antd"],
  },
  build: {
    outDir: ".vite/renderer/main_window",
    emptyOutDir: true,
    minify: "esbuild",
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          antd: ["antd"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  base: "./",
});
