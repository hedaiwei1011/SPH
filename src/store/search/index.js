//search的小仓库
import { reqGetSearchInfo } from '@/api'
const state = {
  searchList: {},
}
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  },
}
const actions = {
  async getSearchList({ commit }, params = {}) {
    let result = await reqGetSearchInfo(params)
    if (result.code == 200) {
      commit('GETSEARCHLIST', result.data)
    }
  },
}
//计算属性 简化仓库中的数据
//可以吧需要用的数据简化一下（使用方便）
const getters = {
  goodsList(state) {
    //如果网络不给力或没网，返回的是undefined
    //计算新的属性值加[]以防万一
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
