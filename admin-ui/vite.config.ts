import { fileURLToPath, URL } from 'node:url'
import { createVitePlugins, useEnv } from '@xv-shared/vite'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  const env = useEnv(mode, process.cwd())

  return {
    base: '/admin/',
    plugins: createVitePlugins({
      autoRouter: {
        dts: 'types/generated/typed-router.d.ts'
      },
      autoLayout: true,
      html: {
        minify: true,
        entry: '/src/main.ts',
        template: 'index.html'
      }
    }),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 5173,
      proxy: {
        '/admin/api': {
          target: 'http://localhost:8000',
          changeOrigin: true
        }
      }
    },
    build: {
      outDir: '../static/admin',
      emptyOutDir: true
    }
  }
})
