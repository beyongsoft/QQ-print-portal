<!--这是添加设备的页面-->
<template>
  <div class="bind-progress">
    <!-- method="POST" action="http://10.10.56.30:8088/product/addProduct" enctype="multipart/form-data"-->
    <form>
      <div class="submitPrinterBox">
        <!-- <span v-on:click="templateIsShow = true">template</span> -->
        <div class="btn btn-info" v-on:click="templateIsShow = true">template</div>
        <button class="btn submitPrinter" @click="submit">submit</button>
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
// import Submit from './com/submit'
export default {
  name: 'add',
  data() {
    return {
      templateIsShow:false
    }
  },  
  methods: {
   recieveMessage: function (text) {
    Toast('监听到子组件变化'+text);
   },
   submit:function (e) {
    e.preventDefault();

    //创建formData对象，取到页面中的file文件
    var formData = new FormData();
    formData.append('printerIconFile', document.getElementById('PrinterIcon').files[0]);
    formData.append('publicKeyFile', document.getElementById('public').files[0]);
    formData.append('privateKeyFile', document.getElementById('private').files[0]);

    //把正常的input输入框中的数据加入formData
    var inputs = $("form").serializeArray();
    for(var i = 0;i<inputs.length;i++){
      formData.append(inputs[i].name,inputs[i].value);
    }


    //把pushmessage中的数据加入formdata
    //注意这里不用JSON.parse(),这样后台没法解析
    var pushMessageList = localStorage.getItem('pushMessageArray22');
    formData.append('msg',pushMessageList);

    //printSetting的数据
    var pageTypes = $("input[name='pageType']");
    console.log('====='+pageTypes.length);
    for(var j=0;j<pageTypes.length;j++){
      if (pageTypes[j].checked) {
        console.log('-----');
        console.log($(pageTypes[j]).next().text());
      }
    }

    $.ajax({
        type: 'post',
        url: 'http://10.10.56.30:8088/product/addProduct',
        data: formData,
        contentType: false,// 当有文件要上传时，此项是必须的，否则后台无法识别文件流的起始位置
        processData: false,// 是否序列化data属性，默认true(注意：false时type必须是post)
        success: function(data) {
            console.log('OK');
        }
    })
   }
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
