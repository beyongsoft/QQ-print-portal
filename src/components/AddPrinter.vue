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
      </div>
    </form>
    <div id="addPrinterModel" v-show="templateIsShow" v-on:click="templateIsShow = false"><img src="../assets/images/addPrinter-template.png"></div>
    <Loading v-show="showLoading"></Loading>
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
      templateIsShow:false,
      pathUrl:'product/addProduct'
    }
  },  
  methods: {
   recieveMessage: function (text) {
    Toast('监听到子组件变化'+text);
   },
   submit:function (e) {
    e.preventDefault();

    this.$store.state.loading = true;

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
    
    //文件打印
    var doc_default_value = JSON.stringify(this.setPrintSettingData('#filePrint'));
    doc_default_value = doc_default_value.replace(/A4/g, "IsoA4_210x297mm");
    doc_default_value = doc_default_value.replace(/A5/g, "NaIndex_4x6_4x6in");
    doc_default_value = doc_default_value.replace(/图片纸/g, "Na_5x7_5x7in");
    doc_default_value = doc_default_value.replace(/最佳/g, "Best");
    doc_default_value = doc_default_value.replace(/一般/g, "Normal");
    doc_default_value = doc_default_value.replace(/草稿/g, "FastDraft");
    doc_default_value = doc_default_value.replace(/单面打印/g, "OneSided");
    doc_default_value = doc_default_value.replace(/双面打印/g, "Duplex");
    doc_default_value = doc_default_value.replace(/黑白打印/g, "Grey_K");
    doc_default_value = doc_default_value.replace(/彩色打印/g, "Color");
    console.log('doc_default_value:'+doc_default_value);
    formData.append('doc_default',doc_default_value);
    //图片打印
    formData.append('photo_default',JSON.stringify(this.setPrintSettingData('#imgPrint')));


    const url = this.$api.url(this.pathUrl);


    var self = this;
    $.ajax({
        type: 'post',
        url: url,
        data: formData,
        contentType: false,// 当有文件要上传时，此项是必须的，否则后台无法识别文件流的起始位置
        processData: false,// 是否序列化data属性，默认true(注意：false时type必须是post)
        success: function(data) {
            console.log('OK');
            // self.$store.state.loading = false;
            $('input').val('');
            $("input:checkbox,input:radio").prop("checked", false);
            self.showWarining('提交成功！');
            setTimeout(function(){
                self.$store.state.warningState = false;
                self.$store.state.loading = false;
            },1000)
        }
    })
   },
   setPrintSettingData:function(fileOrImg){
    //纸张类型
    //支持纸张类型
    var defaultValue = {}
    var pageTypes = $(fileOrImg).find("input[name='pageType']");
    var pageTypeArray = [];
    for(var j=0;j<pageTypes.length;j++){
      if (pageTypes[j].checked) {
        pageTypeArray.push($(pageTypes[j]).next().text());
      }
    }
    var pageTypesValue = pageTypeArray.join(',');
    defaultValue.pageType = pageTypesValue;
    //默认纸张类型
    var defaultPageTypes = $(fileOrImg).find("input[name='defaultPageType']");
    var defaultPageTypeValue = '';
    for(var j=0;j<defaultPageTypes.length;j++){
      if (defaultPageTypes[j].checked) {
        defaultPageTypeValue = $(defaultPageTypes[j]).next().text();
      }
    }
    defaultValue.defaultPageType = defaultPageTypeValue;

    //打印效果
    //支持打印效果
    var printEffects = $(fileOrImg).find("input[name='printEffect']");
    var printEffectArray = [];
    for(var j=0;j<printEffects.length;j++){
      if (printEffects[j].checked) {
        printEffectArray.push($(printEffects[j]).next().text());
      }
    }
    var printEffectsValue = printEffectArray.join(',');
    defaultValue.printEffect = printEffectsValue;
    //默认纸张类型
    var defaultPrintEffects = $(fileOrImg).find("input[name='defaultPrintEffect']");
    var defaultPrintEffectValue = '';
    for(var j=0;j<defaultPrintEffects.length;j++){
      if (defaultPrintEffects[j].checked) {
        defaultPrintEffectValue = $(defaultPrintEffects[j]).next().text();
      }
    }
    defaultValue.defaultPrintEffect = defaultPrintEffectValue;


    //单双面打印
    //支持双面打印
    var singleDoubleSides = $(fileOrImg).find("input[name='singleDoubleSide']");
    var singleDoubleSideArray = [];
    for(var j=0;j<singleDoubleSides.length;j++){
      if (singleDoubleSides[j].checked) {
        singleDoubleSideArray.push($(singleDoubleSides[j]).next().text());
      }
    }
    var singleDoubleSideValue = singleDoubleSideArray.join(',');
    defaultValue.singleDoubleSide = singleDoubleSideValue;
    //默认单双面打印
    var defaultSingleDoubleSides = $(fileOrImg).find("input[name='defaultSingleDoubleSide']");
    var defaultSingleDoubleSideValue = '';
    for(var j=0;j<defaultSingleDoubleSides.length;j++){
      if (defaultSingleDoubleSides[j].checked) {
        defaultSingleDoubleSideValue = $(defaultSingleDoubleSides[j]).next().text();
      }
    }
    defaultValue.defaultSingleDoubleSide = defaultSingleDoubleSideValue;

    //彩色打印
    //支持彩色打印
    var colorPrints = $(fileOrImg).find("input[name='colorPrint']");
    var colorPrintsArray = [];
    for(var j=0;j<colorPrints.length;j++){
      if (colorPrints[j].checked) {
        colorPrintsArray.push($(colorPrints[j]).next().text());
      }
    }
    var colorPrintValue = colorPrintsArray.join(',');
    defaultValue.colorPrint = colorPrintValue;
    //默认彩色打印
    var defaultColorPrints = $(fileOrImg).find("input[name='defaultColorPrint']");
    var defaultColorPrintValue = '';
    for(var j=0;j<defaultColorPrints.length;j++){
      if (defaultColorPrints[j].checked) {
        defaultColorPrintValue = $(defaultColorPrints[j]).next().text();
      }
    }
    defaultValue.defaultColorPrint = defaultColorPrintValue;

    return defaultValue
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
