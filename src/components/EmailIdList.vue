<!--显示绑定的printerId-->
<template>
  <div class="email-list">
    <Search :param="param" @change-param="getParam"></Search>
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th width="30%">PrinteEmailId</th>
          <th width="10%">SKU</th>
          <th width="15%">Model</th>
          <th width="15%">Sn</th>
          <th width="15%">Pid</th>
          <th width="15%">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data,index) in tableList" :key="index">
          <td v-text="data.emailId"></td>
          <td v-text="data.sku"></td>
          <td v-text="data.model"></td>
          <td v-text="data.sn"></td>
          <td v-text="data.pid"></td>
          <td v-text="data.lastUpdateTime"></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="6">
            <div class="pull-left">
              <button class="btn btn-default" @click="refresh">Refresh</button>
            </div>
            <div class="pull-right">
              <Pagination ref="page"  @update-data="ChildData" :async="true"  :pathUrl="pathUrl" :lens="lenArr" :page-len="pageLen" :param="param"></Pagination>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
import Pagination from "./com/tableContent"
import Search from "./com/search"
export default {
  name: 'EmailIdList',
  components: {
    Pagination,
      Search
  },
  data() {
    return {
      lenArr: [10, 20, 50], // 每页显示长度设置
      pageLen: 5, // 可显示的分页数
      pathUrl: 'bindPrinter/bindInfo', // 请求路径
      param: {}, // 向服务器传递参数
      tableList: [] // 分页组件传回的分页后数据
    }
  },
  watch:{
    tableList(val){
      this.tableList = val
    }
  },
   mounted:function(){//表格刷新
      this.refresh()
  },
  methods: {
    ChildData(data){
      this.tableList=data

    },
    refresh() {
      this.$refs.page.refresh() // 这里提供了一个表格刷新功能
    },
      getParam(msg){//获取搜索框需要搜索的参数
        if(msg!=''){

            this.param = msg
            this.refresh()

        }
      }
  },
  events: {
    // 分页组件传回的表格数据（这里即为服务器传回的数据）
    'data'(data) {
      this.tableList = data
    },
    // 刷新数据
    'refresh'() {
      this.refresh()
    }
  }
}
</script>
<style scoped>
.email-list{
  background: #fff;
}
</style>


