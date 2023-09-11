import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
//封装游客身份模块uuid---》生成一个随机字符串（不能再变了）
import { getUUID } from '@/utils/uuid_token'
const state = {
  goodInfo: {},
  //游客临时身份
  uuid_token: getUUID(),
}
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  },
}
const actions = {
  //获取产品信息的action
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId)
    if (result.code == 200) {
      commit('GETGOODINFO', result.data)
    }
  },
  //将产品添加到购物车中
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    //加入购物车返回的结果
    //加入购物车以后，前台将参数带给服务器
    //服务器写入数据成功，并没有返回其他数据，只返回code=200 代表这次操作成功
    //因为服务器没有返回其余数据，因此不需要三连环存储数据
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    //console.log(result)
    //当前这个函数如果执行返回promise
    if (result.code == 200) {
      return 'ok'
    } else {
      //代表加入购物车失败
      return Promise.reject(new Error('faile'))
    }
  },
}
const getters = {
  //路径导航简化
  categoryView(state) {
    return state.goodInfo.categoryView || {}
  },
  //产品信息简化
  skuInfo() {
    return state.goodInfo.skuInfo || {}
  },
  //产品售卖属性的简化
  spuSaleAttrList() {
    return state.goodInfo.spuSaleAttrList || []
  },
}
export default {
  state,
  mutations,
  actions,
  getters,
}
