<template>
  <div>
    <!-- 三级联动 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor
      v-for="(floor, index) in floorList"
      :key="floor.id"
      :list="floor"
    ></Floor>

    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer/index.vue'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like/index.vue'
import Floor from '@/pages/Home/Floor/index.vue'
import Brand from '@/pages/Home/Brand'
import { mapState } from 'vuex'
export default {
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    this.$store.dispatch('getFloorList')
    //获取用户信息在首页展示
    //this.$store.dispatch('getUserInfo')
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
}
</script>

<style></style>
