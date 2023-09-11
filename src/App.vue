<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在登陆、注册时隐藏  用路由的元信息存储是否隐藏-->
    <Footer v-show="this.$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
export default {
  components: {
    Header,
    Footer,
  },
  mounted() {
    //通知vuex发请求，获取数据，存储于仓库当中
    this.$store.dispatch('categroyList')
  },
}
</script>

<style></style>
