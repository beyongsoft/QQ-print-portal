<!--显示printer列表-->
<template>
  <div class="email-list">
    <div class="addPrinterHead">
      <router-link to="/add" tag="li" class="btn addPrinter">add printer</router-link>
    </div>
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th width="30%">PrinterModel</th>
          <th width="25%">SKU</th>
          <th width="25%">PID</th>
          <th width="20%">STATUS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data,index) in tableList" :key="index">
          <!-- <router-link :to="{name:'updata',params:{pbId:data.pbId}}"  tag="a" v-text="data.modelName"></router-link> -->
          <td v-on:click="savePbid(data.pbId)" v-text="data.modelName"></td>
          <td v-text="data.sku"></td>
          <td v-text="data.pId"></td>
          <td>pending for approval</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="7">
            <div class="pull-left">
              <button class="btn btn-default" @click="refresh">Refresh</button>
            </div>
            <div class="pull-right">
              <ul class="pagination" style="margin: 0;height: 34px;">
                <li><a href="#">&laquo;</a></li>
                <li><a href="#">1</a></li>
                <li><a href="#">&raquo;</a></li>
              </ul>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
    <Loading v-show="showLoading"></Loading>
  </div>
</template>
<script>
import Loading from "./com/loading";
export default {
  name: 'PrinterList',
  components: {
      Loading
  },
  data() {
    return {
      lenArr: [10, 20, 50], // 每页显示长度设置
      pageLen: 5, // 可显示的分页数
      pathUrl: 'product/productList', // 打印机列表请求路径
      pathUrlUpdata:'product/toUpdateProduct?id=',//updata路径
      param: {}, // 向服务器传递参数
      tableList: [] // 分页组件传回的分页后数据
    }
  },
  computed:{
        showLoading(){
            return this.$store.state.loading
        },
  },
  watch:{
    tableList(val){
      this.tableList = val
    }
  }, beforeCreate() {
  },
   mounted:function(){
        var self = this;
        this.$store.state.loading = true;

        const vm = this;
        const url = vm.$api.url(this.pathUrl);
        console.log('url:'+url);
        this.$http.post(url).then(function(response) {
          this.tableList = response.data.list;
          console.log(this.tableList);
          this.$store.state.loading = false;
        },function(err) {
          console.log('error')
          console.log(err);
          this.$store.state.loading = false;
        });
      this.refresh()
  },
  methods: {
    ChildData(data){
      this.tableList=data;
    },
    savePbid(pbid){
      const url = this.$api.url(this.pathUrlUpdata);
        this.$http.post(url+pbid).then(function(response) {
          localStorage.setItem('updataPrinterMessage',JSON.stringify(response.body));
          //数据拿到之后跳转到updata页面
          this.$router.replace('updata');
        },function() {
          console.log('error')
        });

    },
    refresh() {
      // this.$refs.page.refresh() // 这里提供了一个表格刷新功能
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
  },
    beforeLeaveRouter(){

    }
}
</script>
<style scoped>
.email-list{
  /*background: #fffff8;*/
}
table{background: white;}
th{text-align: center;}
.addPrinterHead{overflow: hidden;margin: 20px 0;}
.addPrinter{background: #2e6da4;color: white;float: right;}
</style>


