import { reqUserAddressInfo, reqOrderInfo } from '@/api'

const state = {
  address: [],
  orderInfo: {},
}
const mutations = {
  GETUSERADDRESS(state, address) {
    state.address = address
  },
  GETORDERLIST(state, orderInfo) {
    state.orderInfo = orderInfo
  },
}
const actions = {
  //获取用户地址信息
  async getUserAdress({ commit }) {
    let result = await reqUserAddressInfo()
    //console.log(result)
    if (result.code == 200) {
      commit('GETUSERADDRESS', result.data)
    }
  },
  async getOrderInfo({ commit }) {
    let result = await reqOrderInfo()
    //console.log(result)
    if (result.code == 200) {
      commit('GETORDERLIST', result.data)
    }
  },
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters,
}
