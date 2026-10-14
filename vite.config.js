import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base '' keeps asset paths relative so the build works on GitHub Pages
// (both project pages /repo/ and user pages) without extra config.
export default defineConfig({
  base: '',
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },
})
