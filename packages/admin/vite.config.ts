import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { patchCssModules } from 'vite-css-modules'
import UnoCSS from 'unocss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS(),
    patchCssModules(),
    react(),
  ],
  css: {
    modules: {
      localsConvention: "camelCase"
    },
  }
})