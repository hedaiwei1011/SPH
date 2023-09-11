//引用路由组件
import Home from '@/pages/Home/index.vue'
import Search from '@/pages/Search/index.vue'
import Login from '@/pages/Login/index.vue'
import Register from '@/pages/Register/index.vue'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder/index.vue'
//路由配置
export default [
  //重定向
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
    //路由元信息--存储是否显示的信息--用于控制footer
    meta: { show: true },
  },
  {
    path: '/search/:keyword?',
    component: Search,
    meta: { show: true },
    name: 'search',
  },
  {
    path: '/login',
    component: Login,
    meta: { show: false },
  },
  {
    path: '/register',
    component: Register,
    meta: { show: false },
  },
  {
    path: '/detail/:skuid',
    component: Detail,
    //路由元信息--存储是否显示的信息--用于控制footer
    meta: { show: true },
  },
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: AddCartSuccess,
    //路由元信息--存储是否显示的信息--用于控制footer
    meta: { show: true },
  },
  {
    path: '/shopcart',
    component: ShopCart,
    //路由元信息--存储是否显示的信息--用于控制footer
    meta: { show: true },
  },
  {
    path: '/trade',
    component: Trade,
    //路由元信息--存储是否显示的信息--用于控制footer
    meta: { show: true },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      //只能从购物车跳转
      if (from.path == '/shopcart') {
        next()
      } else {
        next(false)
      }
    },
  },
  {
    path: '/pay',
    component: Pay,
    //路由元信息--存储是否显示的信息--用于控制footer
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      //只能从交易跳转
      if (from.path == '/trade') {
        next()
      } else {
        next(false)
      }
    },
  },
  {
    path: '/paysuccess',
    component: PaySuccess,
    //路由元信息--存储是否显示的信息--用于控制footer
    meta: { show: true },
  },
  {
    path: '/center',
    component: Center,
    meta: { show: true },
    //二级路由组件
    children: [
      {
        path: 'myorder',
        component: MyOrder,
      },
      {
        path: 'grouporder',
        component: GroupOrder,
      },
      {
        path: '/center',
        redirect: '/center/myorder',
      },
    ],
  },
]
