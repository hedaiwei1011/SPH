import { reqCartList, reqDeleteCart, reqUpdateChecked } from '@/api'

const state = {
  cartList: [],
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  },
}
const actions = {
  async getCartList({ commit }) {
    let result = await reqCartList()
    //console.log(result)
    if (result.code == 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  //删除购物车某一个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCart(skuId)
    //console.log(result)
    if (result.code == 200) {
      return 'ok'
    } else {
      //代表删除失败
      return Promise.reject(new Error('faile'))
    }
  },
  //修改某一个商品勾选状态
  async changeChecked({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateChecked(skuId, isChecked)
    //console.log(result)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject()
    }
  },
  //删除全部勾选的产品
  deleteAllCheckedCart({ dispatch, getters }) {
    //console.log(context)
    //context 就是一个小仓库包含commit【提交mutations修改state】、dispatch、getters、state
    //console.log(getters.cartList.cartInfoList)
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach((item) => {
      let promise =
        item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
      //将每一次返回的promise添加到数组当中
      PromiseAll.push(promise)
    })
    //如果有一个失败 返回就是失败
    return Promise.all(PromiseAll)
  },
  //修改全部产品状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    let promiseAll = []
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch('changeChecked', {
        skuId: item.skuId,
        isChecked,
      })
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  },
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  },
  /* cartInfoList(state){
    return state.
  } */
}

export default {
  state,
  mutations,
  actions,
  getters,
}
