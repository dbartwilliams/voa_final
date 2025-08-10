

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react({
//       // Add these babel configurations for better compatibility
//       babel: {
//         plugins: [
//           ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
//         ],
//       },
//     }),
//     tailwindcss(),
//   ],
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:6000",
//         changeOrigin: true,
//         secure: false,
//       },
//       },
//     },
//     build: {
//       // Add these build optimizations
//       chunkSizeWarningLimit: 1600,
//       emptyOutDir: true,
//     },
// })

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  server: {
          proxy: {
          "/api": {
            target: "http://localhost:5000",
            changeOrigin: true,
            secure: false,
          },
        },
      },
      build: {
          chunkSizeWarningLimit: 1600,
          emptyOutDir: true,
        },
})



