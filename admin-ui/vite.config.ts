import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { createVitePlugins, useEnv } from '@xv-shared/vite'

export default defineConfig(({ mode }) => {
  const env = useEnv(mode, process.cwd())

  return {
    base: '/admin/',
    plugins: createVitePlugins({
      html: {
        minify: true,
        entry: '/src/main.ts',
        template: 'index.html',
      },
    }),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 5173,
      proxy: {
        '/admin/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: '../static/admin',
      emptyOutDir: true,
    },
  }
})
