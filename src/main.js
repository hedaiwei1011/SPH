import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router/index.js'
//三级联动--全局组件
import TypeNav from '@/components/TypeNav/index.vue'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { Button, MessageBox } from 'element-ui'
Vue.component('TypeNav', TypeNav)
Vue.component('Carousel', Carousel)
Vue.component('Pagination', Pagination)
Vue.component(Button.name, Button)
//elementui注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

//引入仓库
import store from '@/store'

Vue.config.productionTip = false
//引入mock
import '@/mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'
//统一接口api文件夹里面全部请求函数
import * as API from '@/api'
//引入表单校验插件
import '@/plugins/validate.js'

new Vue({
  render: (h) => h(App),
  //全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  //注册仓库 组件实例上会多一个$store属性
  store,
}).$mount('#app')
