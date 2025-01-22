import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});



//
//import { defineConfig } from "vite";
//import react from "@vitejs/plugin-react-swc";
//import path from "path";
//import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
//export default defineConfig(({ mode }) => ({
//  server: {
//    host: "::",
//    port: 8080,
//  },
//  plugins: [
//    react(),
//    mode === 'development' &&
//    componentTagger(),
// ].filter(Boolean),
//  resolve: {
//    alias: {
//      "@": path.resolve(__dirname, "./src"),
//    },
//  },
//}));

