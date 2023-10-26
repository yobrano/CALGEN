import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"


export default defineConfig({
  resolve:{
    alias: [
		{find: "@src-views", replacement:path.resolve(__dirname, './src/views')},
		{find: "@src-components", replacement:path.resolve(__dirname, './src/components')},
		{find: "@src-context", replacement:path.resolve(__dirname, './src/context')},
		{find: "@src-utils", replacement:path.resolve(__dirname, './src/utils')},
	],
  },
  plugins: [react()],
  server:{ port:3000 },
  base: './',
  build: { sourcemap: true, },
})
