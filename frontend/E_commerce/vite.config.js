import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite'
import react from "@vitejs/plugin-react-swc";

// Declaring __dirname Manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    plugins: [react(), tailwindcss(),],
    server: {
        allowedHosts: ["unmeasuredly-unplentiful-lynsey.ngrok-free.dev"],
    },
    resolve: {
        alias: {
            "@root": resolve(__dirname, "src"),
            "@common": resolve(__dirname, "src/common"),
            "@components": resolve(__dirname, "src/components"),
            "@pages": resolve(__dirname, "src/pages"),
            "@utils": resolve(__dirname, "src/utils"),
            "@layouts": resolve(__dirname, "src/layouts"),
            "@routes": resolve(__dirname, "src/routes"),
            "@context": resolve(__dirname, "src/context"),
            "@hooks": resolve(__dirname, "src/hooks"),
            "@themes": resolve(__dirname, "src/themes"),
        },
    },
});
