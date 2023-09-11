//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
//引入store
import store from '@/store'
//作为插件
Vue.use(VueRouter)

//先把VueRouter原型对象的push 先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重写push｜replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

//配置路由
let router = new VueRouter({
  //配置路由
  routes,
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    //代表滚动条在最上方
    return { y: 0 }
  },
})

//全局守卫 前置守卫 在路由跳转之间进行判断
router.beforeEach(async (to, from, next) => {
  //to 可以获取到你要跳到哪的信息
  //from 获取到你从哪个路由而来的信息
  //next 放行函数
  //next()
  //用户登录了，才会有token，未登录一定不会有token
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  if (token) {
    //用户已经登录了还想去login
    if (to.path == '/login' || to.path == '/register') {
      next('/home')
    } else {
      //登陆了去的不是login
      //如果用户名已有
      if (name) {
        next()
      } else {
        //登陆了 但没用户信息
        //没有用户信息 派发action让仓库存储用户信息再跳转
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          //token失效  获取不到用户信息，重新登陆
          //清除token
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else {
    //未登录 不能去交易相关的
    let toPath = to.path
    if (
      toPath.indexOf('/trade') != -1 ||
      toPath.indexOf('/pay') != -1 ||
      toPath.indexOf('/center') != -1
    ) {
      next('/login?redirect=' + toPath)
    } else {
      next()
    }
  }
})

export default router
