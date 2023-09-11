<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件的委派 -->
      <div @mouseleave="leaveIndex()" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级分类 -->
              <div
                class="item"
                v-for="(c1, index) in categroyList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <!-- 自定义属性 -->
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                  >
                </h3>
                <!-- 二级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <!-- 三级分类 -->
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex' //引入mapState 引入数据的辅助函数
//这种引入方式，是将所有功能函数引入
//import _ from 'lodash'
//最好的引入方式是按需引入
import throttle from 'lodash/throttle'

export default {
  name: 'TypeNav',
  data() {
    return {
      //存储鼠标移上哪一个一级分类
      currentIndex: -1,
      show: true,
    }
  },
  //组件挂载完毕向服务器发请求
  mounted() {
    //通知vuex发请求，获取数据，存储于仓库当中
    //this.$store.dispatch('categroyList')
    //如果不是home路由将TypeNav隐藏
    if (this.$route.path != '/home') {
      this.show = false
    }
  },
  computed: {
    //右侧需要的是一个函数,当使用这个计算属性的时候,右侧函数会立即执行一次
    //注入一个参数state,其实就是大仓库的数据
    ...mapState({
      categroyList: (state) => {
        //映射为组件实例身上的数据
        return state.home.categroyList //大仓库的数据给到组件中的categoryList
      },
    }),
  },
  methods: {
    //ES5的写法  进行了节流操作
    changeIndex: throttle(function (index) {
      this.currentIndex = index
    }, 50),
    leaveIndex() {
      this.currentIndex = -1
      //当鼠标移除的时候，其余页面的商品分类列表需要消失
      if (this.$route.path != '/home') {
        this.show = false
      }
    },
    goSearch(event) {
      //编程式导航+事件委派
      //事件委派的问题：是否点的是<a></a>标签 如何获取参数（1，2，3级分类的产品名字、id）
      let element = event.target
      let { categoryname, category1id, category2id, category3id } =
        element.dataset
      //console.log(element.dataset)
      if (categoryname) {
        //整理路由跳转的参数
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        //判断：如果路由跳转的时候，带有params参数，捎带传递过去
        if (this.$route.params) {
          location.params = this.$route.params
          //整理完参数
          location.query = query
          //路由跳转
          this.$router.push(location)
        }
      }
    },
    enterShow() {
      //当鼠标移入的时候，让商品列表进行展示
      if (this.$route.path != '/home') {
        this.show = true
      }
    },
  },
}
</script>

<style lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          /* &表示嵌套上一级 */
          /* &:hover {
            .item-list {
              display: block;
            }
          } */
        }
        .cur {
          background: skyblue;
        }
      }
    }
    //过渡动画的样式
    //过渡动画进入的开始状态
    .sort-enter {
      height: 0px;
    }
    //过渡动画结束状态（进入）
    .sort-enter-to {
      height: 461px;
    }
    //定义动画时间、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
