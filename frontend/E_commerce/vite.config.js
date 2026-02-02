import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// Declaring __dirname Manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    plugins: [react()],
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
            "@context": resolve(__dirname, "src/context"),
            "@hooks": resolve(__dirname, "src/hooks"),
        },
    },
});
