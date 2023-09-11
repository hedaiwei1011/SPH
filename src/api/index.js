//当前这个模块：API进行统一管理
import requests from './request.js'
//
import mockRequests from './mockAjax.js'

//三级联动接口
export const reqCategory = () => {
  //箭头函数可以在程序任意地方使用,箭头函数返回即为服务器的数据
  //下面箭头函数返回值：返回的是什么? promise,即为返回服务器的数据
  //return关键字，千万别忘记书写，如果忘记书写，你在任意地方获取的都是undeinfed
  return requests({ method: 'get', url: '/product/getBaseCategoryList' })
}

//轮播图的接口
export const reqGetBannerList = () => mockRequests.get('/banner')

//获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')

//获取搜索模块数 据 post请求
export const reqGetSearchInfo = (params) =>
  requests({ url: '/list', method: 'post', data: params })

//获取产品详情信息的接口
export const reqGoodsInfo = (skuId) =>
  requests({ url: `/item/${skuId}`, method: 'get' })

//将产品添加到购物车中（获取更新某一个产品的个数)/api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

//获取购物车列表 /api/cart/cartList GET
export const reqCartList = () =>
  requests({ url: '/cart/cartList', method: 'get' })

//删除某一个商品的接口
export const reqDeleteCart = (skuId) =>
  requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

//切换商品选中的接口 /api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateChecked = (skuId, isChecked) =>
  requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
//获取验证码的接口/api/user/passport/sendCode/{phone} get
export const reqGetCode = (phone) =>
  requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
//注册结构
export const reqRegister = (data) =>
  requests({ url: `/user/passport/register`, method: 'post', data })
//登陆接口
export const reqUserLogin = (data) =>
  requests({ url: `/user/passport/login`, method: 'post', data })
//得到用户信息 /api/user/passport/auth/getUserInfo 需要带着token 获取用户信息
export const reqUserInfo = () =>
  requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })
//退出登陆 /api/user/passport/logout
export const reqLogout = () =>
  requests({ url: '/user/passport/logout', method: 'get' })
//获取用户地址信息 /api/user/userAddress/auth/findUserAddressList
export const reqUserAddressInfo = () =>
  requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })
//获取商品清单
export const reqOrderInfo = () =>
  requests({ url: '/order/auth/trade', method: 'get' })
//提交订单 不用vuex如何使用在组件发出请求获得数据
export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'post',
  })

//获取订单支付信息 /payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) =>
  requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

//获取支付订单状态 /api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayStatus = (orderId) =>
  requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

//个人中心 获取我的订单列表 /api/order/auth/{page}/{limit} get
export const reqMyOrderList = (page, limit) =>
  requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })
