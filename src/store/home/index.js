import { reqCategory, reqGetBannerList, reqFloorList } from '@/api/index.js'

//home的小仓库
const state = {
  categroyList: [],
  bannerList: [],
  floorList: [],
}
const mutations = {
  CATEGORYLIST(state, categroyList) {
    state.categroyList = categroyList
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  },
}
const actions = {
  async categroyList({ commit }) {
    let result = await reqCategory()
    if (result.code == 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  //获取首页轮播图的数据
  async getBannerList({ commit }) {
    let result = await reqGetBannerList()
    //console.log(result)
    if (result.code == 200) {
      commit('GETBANNERLIST', result.data)
    }
  },
  async getFloorList({ commit }) {
    let result = await reqFloorList()
    if (result.code == 200) {
      commit('GETFLOORLIST', result.data)
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
