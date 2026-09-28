import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        // Split stable vendor code into its own long-lived cache chunks so a
        // content change doesn't invalidate React on every deploy.
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
});
