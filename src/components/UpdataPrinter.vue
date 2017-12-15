<!--这是编辑的页面-->
<template>
  <div class="bind-progress">
    <form method="POST" action="http://10.10.56.30:8088/product/addProduct" enctype="multipart/form-data" >
      <div class="submitPrinterBox">
        <button class="btn submitPrinter">Updata</button>
      </div>
      <div class="row">
        <div class="col-md-5 col-padding">
          <Gen :msg='printerMessage'></Gen>
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
      templateIsShow:false,
      printerMessage:{}
    }
  },  
  methods: {
   recieveMessage: function (text) {
    Toast('监听到子组件变化'+text);
   }
  },
   mounted:function(){
        // localStorage.setItem('pbid',this.$route.params.pbId);
        this.$http.post('http://10.10.56.30:8088/product/toUpdateProduct?id='+localStorage.getItem('pbid')).then(function(response) {
          this.printerMessage = response.body;
          console.log(this.printerMessage)
        },function() {
          console.log('error')
        });
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
