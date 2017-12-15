<!--显示printer列表-->
<template>
  <div class="email-list">
    <HeaderDiv></HeaderDiv>
    <!-- <Search :param="param" @change-param="getParam"></Search> -->
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
          <td v-on:click="savePbid(data.pbId)"><router-link :to="{name:'updata',params:{pbId:data.pbId}}"  tag="a" v-text="data.modelName"></router-link></td>
          <td v-text="data.sku"></td>
          <td v-text="data.pId"></td>
          <td  v-on:click="updateProduct()">修改</td>
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
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
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
import HeaderDiv from './com/header.vue'
export default {
  name: 'PrinterList',
  components: {
      Loading,
      HeaderDiv
  },
  data() {
    return {
      lenArr: [10, 20, 50], // 每页显示长度设置
      pageLen: 5, // 可显示的分页数
      pathUrl: 'bindPrinter/bindInfo', // 请求路径
      param: {}, // 向服务器传递参数
      tableList: [
        // {"printerModel":"HP DeskJet Ink Advantage 3630 All-in-One Printer","sku":"F5S46B， K4U05B","pid":"1700001671","status":"pending for approval"},{"printerModel":"HP OfficeJet Pro 8710","sku":"D9L18A","pid":"1700002173","status":"approved"},{"printerModel":"HP DeskJet Ink Advantage 3630 All-in-One Printer","sku":"F5S46B， K4U05B","pid":"1700001671","status":"pending for approval"},{"printerModel":"HP OfficeJet Pro 8710","sku":"D9L18A","pid":"1700002173","status":"approved"},{"printerModel":"HP DeskJet Ink Advantage 3630 All-in-One Printer","sku":"F5S46B， K4U05B","pid":"1700001671","status":"pending for approval"},{"printerModel":"HP OfficeJet Pro 8710","sku":"D9L18A","pid":"1700002173","status":"approved"},{"printerModel":"HP DeskJet Ink Advantage 3630 All-in-One Printer","sku":"F5S46B， K4U05B","pid":"1700001671","status":"pending for approval"},{"printerModel":"HP OfficeJet Pro 8710","sku":"D9L18A","pid":"1700002173","status":"approved"},{"printerModel":"HP DeskJet Ink Advantage 3630 All-in-One Printer","sku":"F5S46B， K4U05B","pid":"1700001671","status":"pending for approval"}
      ] // 分页组件传回的分页后数据
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
  },
   mounted:function(){//表格刷新
        this.$http.post('http://10.10.56.30:8088/product/productList').then(function(response) {
          this.tableList = response.data.list;
          console.log(response.data.list)
        },function() {
          console.log('error')
        });
      this.refresh()
  },
  methods: {
    ChildData(data){
      this.tableList=data

    },
    savePbid(pbid){
      localStorage.setItem('pbid',pbid);
    },
    updateProduct:function () {
      this.$http.post('http://10.10.56.40:8088/product/updateProduct').then(function(response) {
          console.log(response);
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
</style>


