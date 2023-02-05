import { createApp } from 'vue'
import './style.css'

// 完整引入element-plus组件库
import ElementPlus, { ElLoading } from 'element-plus'
// 引入element-plus组件库样式
import 'element-plus/dist/index.css'
import App from './App.vue'
import axios from 'axios'
import ConfigProvider from 'element-plus/es/components/config-provider/src/config-provider'

// 导入loading
let loadingInstance = null
// 配置请求拦截器
axios.interceptors.request.use(config => {
  loadingInstance = ElLoading.service()
  return config
})
// 配置响应拦截器
axios.interceptors.response.use(response => {
  loadingInstance.close()
  return response
})

const app = createApp(App)

app.config.globalProperties.$http = axios

// 注册ElementPlus
app.use(ElementPlus)
app.mount('#app')
