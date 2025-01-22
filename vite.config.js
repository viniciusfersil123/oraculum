import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Set output directory to 'dist'
    emptyOutDir: true, // Clear the output directory before building
  },
});
