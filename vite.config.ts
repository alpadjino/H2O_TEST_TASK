import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr({ svgrOptions: { icon: true } })],
  optimizeDeps: {
    include: ["date-fns", "date-fns/locale/ru"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@assets": resolve(__dirname, "src/assets"),
      "@ui": resolve(__dirname, "src/shared/ui"),
      "@business": resolve(__dirname, "src/shared/business"),
      "@api": resolve(__dirname, "src/api"),
      "@pages": resolve(__dirname, "src/pages"),
    },
  },
});
