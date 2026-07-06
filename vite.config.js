import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Static image assets don't need hot-reload watching, and on Windows,
      // watching files right after they're copied/written can throw EBUSY
      // (resource busy or locked) if antivirus or the OS still has a brief
      // lock on them. Excluding this folder avoids that crash entirely.
      ignored: ['**/public/images/**'],
    },
  },
})
