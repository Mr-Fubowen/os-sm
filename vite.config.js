import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        outDir: 'dist',
        lib: {
            entry: './src/index.js',
            name: 'index',
            fileName: 'index',
            formats: ['cjs', 'es']
        },
        rollupOptions: {
            external: ['systeminformation', 'i18n', 'url', 'path', 'commander']
        }
    }
})
