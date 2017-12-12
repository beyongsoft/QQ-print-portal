<!--这是绑定printerId的页面-->
<template>
  <div class="bind-progress">
    <form method="POST" action="http://10.10.56.40:8088/product/addProduct" enctype="multipart/form-data" >
      <div class="submitPrinterBox">
        <!-- <div class="btn btn-info" v-on:click="templateIsShow = true">template</div> -->
        <button class="btn submitPrinter">Submit the updates</button>
      </div>
      <div class="row">
        <div class="col-md-5 col-padding">
          <Gen v-on:message="recieveMessage"></Gen>
          <PushMessage></PushMessage>
        </div>
        <div class="col-md-6 col-padding">
          <ImgsAndFiles></ImgsAndFiles>
          <PrintSetting></PrintSetting>
          <PrinterDescription></PrinterDescription>
        </div>
        <Loading v-show="showLoading"></Loading>
      </div>
    </form>
    <div id="addPrinterModel" v-show="templateIsShow" v-on:click="templateIsShow = false"><img src="../assets/images/addPrinter-template.png"></div>
  </div>
</template>
<script>
import Gen from './com/generate'
import ImgsAndFiles from './com/imgsAndFiles'
import PrintSetting from './com/printSetting'
import PushMessage from './com/pushMessage'
import PrinterDescription from './com/printerDescription'
import Loading from "./com/loading"
export default {
  name: 'updata',
  data() {
    return {
      templateIsShow:false
    }
  },  
  methods: {
   recieveMessage: function (text) {
    Toast('监听到子组件变化'+text);
   }
  },
   mounted:function(){//表格刷新
        this.$http.post('http://10.10.56.40:8088/product/productList').then(function(response) {
          this.tableList = response.data.list;
          console.log(response.data.list)
        },function() {
          console.log('error')
        });
      this.refresh()
  },
  components: {
    Gen,
    ImgsAndFiles,
    PrintSetting,
    PushMessage,
    PrinterDescription,
    Loading
  },
  computed: {
    showLoading() {
      return this.$store.state.loading
    }
  }
}

</script>
<style lang="less" scoped>
* {
  color: black;
}

.submitPrinterBox {
  overflow: hidden;
  margin-bottom: 20px;
  margin-top: 20px;
}

.submitPrinter {
  background: #2e6da4;
  color: white;
  float: right;
  width: 80px;
}
#addPrinterModel{position: fixed;top: 0;left: 0;right: 0;bottom: 0;background: rgba(200,200,200,0.6)}
#addPrinterModel>img{height: 100%;}
</style>
