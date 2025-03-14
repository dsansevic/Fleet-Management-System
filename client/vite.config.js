import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@layouts": path.resolve(__dirname, "src/layouts"),
        "@contexts": path.resolve(__dirname, "src/contexts"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@api": path.resolve(__dirname, "src/api"),
        "@auth": path.resolve(__dirname, "src/auth")

    },
  },
})