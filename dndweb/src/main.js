import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/index';
import 'element-plus/dist/index.css'
// 所有业务api接口
import api from '../api/api.js'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
app.config.globalProperties.$api = api
 // 注册所有图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.use(ElementPlus)
app.use(router)
app.mount('#app')
