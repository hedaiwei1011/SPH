import Vue from 'vue'
import Vuex from 'vuex'
//需要使用插件

Vue.use(Vuex)
//引入小仓库
import home from './home/index.js'
import search from './search/index.js'
import detail from './detail/index.js'
import shopcart from './shopcart/index.js'
import user from './user/index.js'
import trade from './trade'
//对外暴露Store类的一个实例
export default new Vuex.Store({
  //这里是用modules[]包含小仓库
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade,
  },
})
