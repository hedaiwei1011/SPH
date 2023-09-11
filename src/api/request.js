//对于axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
//在当前模块中引入store
import store from '@/store'
//requests就是axios 只不过稍微配置了一下
const requests = axios.create({
  //基础路径 发请求的时候，路径当中会出现api
  baseURL: '/api',
  //请求超时的时间5S
  timeout: 5000,
})
//请求拦截器
requests.interceptors.request.use((config) => {
  //uuid
  if (store.state.detail.uuid_token) {
    //请求头添加一个字段，和后台老师商量好了
    config.headers.userTempId = store.state.detail.uuid_token
  }
  //需要携带token带给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  //进度条开始
  nprogress.start()
  return config
})
//响应服务器
requests.interceptors.response.use(
  (res) => {
    //进度条结束
    nprogress.done()
    return res.data
  },
  (error) => {
    return Promise.reject(new Error('faile'))
  }
)
export default requests
