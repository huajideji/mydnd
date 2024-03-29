import axios from 'axios'
import {ElMessage} from 'element-plus'
import { ElMessageBox } from 'element-plus'
export default (config) => {
  // 创建axios实例
  const service = axios.create({
    baseURL: 'http://47.108.136.139:9803',
    // 超时
    timeout: 50000
  })
  // 请求拦截器
  service.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] =  ''
      config.headers['Content-Type'] =
        config.headers['Content-Type'] || 'application/json'
      // 8080
      if (config.type == 'file') {
        config.headers['content-type'] = 'application/multipart/form-data'
      } else if (config.type == 'form') {
        config.headers['Content-type'] = 'application/x-www-form-urlencoded'
      }
      if (config.method && config.method.toLowerCase() === 'get') {
        config.data = true
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // 响应拦截器
  service.interceptors.response.use(
    (response) => {
      const code = response.data.code
      if (code === 401) {
        ElMessageBox.confirm(
          '登录状态已过期，您可以继续留在该页面，或者重新登录',
          '系统提示',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          // 调用退出登录接口
        })
      } else if (code !== 200) {
        ElMessage({
          message: response.data.msg,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject('error')
      } else {
        return response.data
      }
    },
    (error) => {
        ElMessage({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  )
  return service(config)
}

