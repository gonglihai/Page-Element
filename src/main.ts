import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})


app.mount('#app')
