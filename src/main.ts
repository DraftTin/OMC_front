import { createApp } from 'vue'
// import './style.css'
import './assets/main.css'
import 'virtual:windi.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const pinia = createPinia()
pinia.use(piniaPersist)
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus, {
    locale: zhCn,
    // size: 'large',
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}


app.mount('#app')
