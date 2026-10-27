import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages serves from /PEAK_48/ (base applies only inside the Actions build); local dev and Cloudflare Pages use "/".
export default defineConfig({
  base: (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env.GITHUB_ACTIONS ? "/PEAK_48/" : "/",
  plugins: [react(), tailwindcss()],
  build: { target: "es2022", chunkSizeWarningLimit: 600 },
});
