<template>
  <div>
    <nav class="boot-nav">
      <ul class="pagination boot-page">
        <li>
          <a href="javascript:void(0)" aria-label="Previous" @click="onFirstClick">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" aria-label="Next" @click="onPrevClick">
            <span aria-hidden="true">‹</span>
          </a>
        </li>
        <li v-for="(page,index) in pages" :key="index" :class="activeNum === page ? 'active' : ''">
          <a href="javascript:void(0)" v-text="page" @click="onPageClick(page)"></a>
        </li>
        <li>
          <a href="javascript:void(0)" aria-label="Next" @click="onNextClick">
            <span aria-hidden="true">›</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" aria-label="Next" @click="onLastClick">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
      <div class="page-total">
        共
        <span v-text="pageTotal"></span> 页
      </div>
    </nav>
    <select class="form-control boot-select" v-model="len">
      <option v-for="(arr,index) in lens" :key="index" :value="arr" v-text="arr" :selected="arr=== 0 ? true : false"></option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    async: { // 是否请求服务器端数据
      type: Boolean,
      default: true
    },
    len: {// 每页显示个数
      type: Number,
      default: 10
    },
    lens: { // 显示个数数组
      type: Array,
      default: function() {
        return [10, 20, 50]
      }
    },
    data: {  // 表格数据（数组）
      type: Array,
      default: function() {
        return []
      }
    },
    pathUrl: {// AJAX地址
      type: String,
      default: ''
    },
    pageLen: { // 显示页数
      type: Number,
      default: 5
    },
    pageTotal: { // 总页数
      type: Number,
      default: 1
    },
    param: { // 参数内容
      type: Object
    }
  },
  data() {
    return {
      activeNum: 0,
        pages:""
    }
  },
  model:{
    prop:'data',
    event:'update-data'
  },
  methods: {
    onPageClick(index) {// 点击页码刷新数据
      this.activeNum = index
      console.log(index)
    },
    onPrevClick() { // 上一页
      if (this.activeNum > 0) {  // 当前页是否为当前最小页码
        this.activeNum = this.activeNum - 1
      } else {
        if (this.pages[0] !== 1) {
          let newPages = []
          for (let i = 0; i < this.pages.length; i++) {
            newPages[i] = this.pages[i] - 1
          }
          this.pages = newPages
          this.getData()
        }
      }
    },
    onNextClick() {// 下一页
      if (this.activeNum < this.pages.length - 1) { // 当前页是否为当前最大页码
        this.activeNum = this.activeNum + 1
      } else {
        if (this.pages[this.pages.length - 1] < this.pageTotal) {
          let newPages = []
          for (let i = 0; i < this.pages.length; i++) {
            newPages[i] = this.pages[i] + 1
          }
          this.pages = newPages
          this.getData()
        }else{
          this.onLastClick()
        }
      }
    },
    onFirstClick() {   // 第一页
      if (this.pages[0] === 1) {
        this.activeNum = 1
      } else {
        let originPage = []
        for (let i = 1; i <= this.pageLen; i++) {
          originPage.push(i)
        }
        this.pages = originPage
        this.activeNum === 0 ? this.getData() : this.activeNum = 0
      }
    },
    onLastClick() { // 最后一页
      if (this.pageTotal <= this.pageLen) {
        this.activeNum = this.pages.length
      } else {
        let lastPage = []
        for (let i = this.pageLen - 1; i >= 0; i--) {
          lastPage.push(this.pageTotal - i)
        }
        this.pages = lastPage
        console.log(this.pages)
        this.activeNum === this.pages.length - 1 ? this.getData() : this.activeNum = this.pages.length - 1
      }
    },
    getPages() { // 获取页码
      this.pages = []
      if (!this.async) {
        this.pageTotal = Math.ceil(this.data.length / this.len)
      }
      if (this.pageTotal <= this.pageLen) { // 比较总页码和显示页数
        for (let i = 1; i <= this.pageTotal; i++) {
          this.pages.push(i)
        }
      } else {
        for (let i = 1; i <= this.pageLen; i++) {
          this.pages.push(i)
        }
      }
    },
    getData() { // 页码变化获取数据
      if (!this.async) {
        let len = this.len,
          pageNum = this.pages[this.activeNum]
          newData = [];
        for (let i = pageNum * len; i < (pageNum * len + len); i++) {
          this.data[i] !== undefined ? newData.push(this.data[i]) : ''
        }
        this.$dispatch('data', newData)
      } else {
        this.param.pageNo = this.pages[this.activeNum-1];
        this.param.pageSize = this.len;
        this.$http.post(this.$api.url(this.pathUrl), JSON.stringify(this.param), { emulateJSON: true }).then(function(res) {
          this.pageTotal = res.body.pages
          if (this.pages.length !== this.pageLen || this.pageTotal < this.pageLen) {
            this.getPages()
          }
          if (!res.body.list.length) {
            this.activeNum = this.pageTotal
          }
          this.$emit('update-data',res.body.list);
        })
      }
    },
    // 刷新表格
    refresh() {
      this.getData()
    },
    // 重置并刷新表格
    refresh2() {
      this.pages = [1]
      this.activeNum === 0 ? this.getData() : this.activeNum = 0
    }
  },
  ready() {
    if (!this.async) {
      this.getPages()
    }
    this.getData()
  },
  watch: {
    'len'(newVal, oldVal) {// 监听显示数量
      if (!this.async) {
        this.getPages()
        if (this.activeNum + 1 > this.pages.length) {
          this.activeNum = this.pages.length - 1
        }
        this.getData()
      } else {
        this.refresh2()
      }
    },
    'activeNum'(newVal, oldVal) {// 监测当前页变化
      this.getData()
    }
  },
  events: {
    'refresh::page'() {
      this.refresh()
    }
  }
}
</script>
<style scoped>
.boot-select {
  float: right;
  width: 80px;
}

.boot-nav {
  float: right;
}

.boot-page {
  display: inline-block;
  margin: 2px 10px 0 20px;
  vertical-align: middle;
}

.page-total {
  display: inline-block;
  vertical-align: middle;
}
</style>
