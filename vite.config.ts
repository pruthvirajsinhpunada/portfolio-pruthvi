import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("@react-three/rapier") || id.includes("/rapier")) {
            return "vendor-rapier";
          }
          if (id.includes("@react-three/postprocessing") || id.includes("postprocessing")) {
            return "vendor-postprocessing";
          }
          if (id.includes("@react-three/drei")) {
            return "vendor-drei";
          }
          if (id.includes("@react-three/fiber")) {
            return "vendor-r3f";
          }
          if (id.includes("/three/") || id.includes("three-stdlib")) {
            return "vendor-three";
          }
          if (id.includes("react-dom") || id.includes("/react/")) {
            return "vendor-react";
          }
        },
      },
    },
  },
});
