import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteFaviconsPlugin } from "vite-plugin-favicon2";

export default defineConfig({
  plugins: [
    react(),
    ViteFaviconsPlugin({
      logo: "public/assets/logo.png",
      favicons: {
        path: "assets/",
      },
    }),
  ],
});
