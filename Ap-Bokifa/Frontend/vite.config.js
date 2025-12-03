import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        tailwindcss(),
        react(),

        // 🔥 Custom plugin to show server URL on every HMR update
        {
            name: "show-server-url-on-hmr",
            handleHotUpdate(ctx) {
                const urls = ctx.server.resolvedUrls;
                if (urls?.local) {
                    console.log(`\n🔗 Server: ${urls.local.join(", ")}\n`);
                }
            },
        },
    ],
});
