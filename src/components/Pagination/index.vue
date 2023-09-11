<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageno', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="starNumAndEndNum.start > 1"
      @click="$emit('getPageno', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="starNumAndEndNum.start > 2">···</button>

    <button
      v-for="(page, index) in starNumAndEndNum.end"
      :key="index"
      v-if="page >= starNumAndEndNum.start"
      @click="$emit('getPageno', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>
    <!-- 这些判断条件都是测出来的不需要记 -->
    <button v-if="starNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="starNumAndEndNum.end < totalPage"
      @click="$emit('getPageno', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageno', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    //总共多少页
    totalPage() {
      //向上取整
      return Math.ceil(this.total / this.pageSize)
    },
    //计算连续页码，起始数字与结束数字
    starNumAndEndNum() {
      let start = 0
      let end = 0
      //判断数据是否足够
      if (this.continues > this.totalPage) {
        start = 1
        end = this.totalPage
      } else {
        start = this.pageNo - parseInt(this.continues / 2)
        end = this.pageNo + parseInt(this.continues / 2)
        if (start < 1) {
          start = 1
          end = this.continues
        }
        if (end > this.totalPage) {
          start = this.totalPage - this.continues + 1
          end = this.totalPage
          //console.log(start, end)
        }
      }
      return { start, end }
    },
  },
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background: skyblue;
}
</style>
