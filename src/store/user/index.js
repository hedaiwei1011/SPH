//登陆注册模块
import {
  reqGetCode,
  reqRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogout,
} from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {
  code: '',
  token: getToken(),
  userInfo: {},
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOFIN(state, token) {
    state.token = token
  },
  GETUESRINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  CLEAR(state) {
    state.token = ''
    state.userInfo = {}
    removeToken()
  },
}
const actions = {
  //获取验证码
  async getCode({ commit }, phone) {
    //获取验证码的接口 把验证码返回，正常情况是发到用户手机上
    let result = await reqGetCode(phone)
    //console.log(result)
    if (result.code == 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //用户注册
  async userRegister({ commit }, user) {
    let result = await reqRegister(user)
    //console.log(result)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //登陆 token--用户唯一标识符
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data)
    //console.log(result)
    if (result.code == 200) {
      //用户已经登陆，并且获得到了token
      commit('USERLOFIN', result.data.token)
      //持久化存储token
      //localStorage.setItem('TOKEN',result.data.token)
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo()
    //console.log(result)
    if (result.code == 200) {
      commit('GETUESRINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //退出登陆
  async userLogout({ commit }) {
    //向服务器
    let result = await reqLogout()
    if (result.code == 200) {
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
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
