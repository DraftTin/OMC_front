import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import WindiCSS from 'vite-plugin-windicss'
import { viteMockServe } from 'vite-plugin-mock'


// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		WindiCSS(),
		viteMockServe({
			ignore: /^\_/,
			mockPath: 'mock',
			localEnabled: true,
			prodEnabled: false,
			injectCode: `
				import { setupProdMockServer } from '../mock/_createProductionServer'
				setupProdMockServer()
				`,
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	server: {
		proxy: {
			'/server': {
				target: 'http://localhost:8080',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/server/, ''),
			},
		},
	},
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnable: true,
			},
		},
	},
})
