<template>
  <fieldset>
    <h3>Print Settings</h3>
    <div class="form-group">
      <div class="col-md-10 col-md-offset-1">
        <div style="border:1px solid #ccc;border-radius: 4px;">
          <div style="overflow: hidden;" class="printSettingNav">
            <ul class="printSetting printStyleModel">
              <li v-on:click="filePrint(true)" v-bind:class="[printImgOrFile ? 'printFileOrImgActive' : 'printFileOrImgNoActive']">
                <div class="input-group" style="text-align: center;margin:auto;">
                  <span v-bind:class="[printImgOrFile ? 'printImgOrFileActive' : 'printImgOrFileNoActive']">文件打印</span>
                </div>
              </li>
              <li v-on:click="filePrint(false)" v-bind:class="[printImgOrFile ? 'printFileOrImgNoActive' : 'printFileOrImgActive']">
                <div class="input-group" style="text-align: center;margin:auto;">
                  <span v-bind:class="[printImgOrFile ? 'printImgOrFileNoActive' : 'printImgOrFileActive']">图片打印</span>
                </div>
              </li>
            </ul>
          </div>
          <hr style="margin: 0px;">
          <div id="printModelContent">
            <div id="filePrint" v-show="printImgOrFile">
              <div style="overflow: hidden;">
                <span class="printTitle">支持纸张类型：</span>
                <ul class="printSetting">
                  <li>
                    <div class="input-group">
                      <input type="checkbox" id="fileSuportA4" name="filePrintpageType"> <label  for="fileSuportA4" >A4</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="checkbox" id="fileSuportA5" name="filePrintpageType"> <label  for="fileSuportA5" >A5</label>
                    </div>
                  </li>
                </ul>
              </div>
              <div style="overflow: hidden;">
                <span class="printTitle">默认纸张类型：</span>
                <ul class="printSetting">
                  <li>
                    <div class="input-group">
                      <input type="radio" id="fileDefaultA4" name="filePrintdefaultPageType"> <label  for="fileDefaultA4" >A4</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="radio" id="fileDefaultA5" name="filePrintdefaultPageType"> <label  for="fileDefaultA5" >A5</label>
                    </div>
                  </li>
                </ul>
              </div>
              <hr style="margin: 1px;">
              <div style="overflow: hidden;">
                <span class="printTitle">支持打印效果：</span>
                <ul class="printSetting">
                  <li>
                    <div class="input-group">
                      <input type="checkbox" id="fileSuportbest" name="filePrintprintEffect"> <label  for="fileSuportbest" >最佳</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="checkbox" id="fileSuportnomal" name="filePrintprintEffect"> <label  for="fileSuportnomal" >一般</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="checkbox" id="fileSuportdraft" name="filePrintprintEffect"> <label  for="fileSuportdraft" >草稿</label>
                    </div>
                  </li>
                </ul>
              </div>
              <div style="overflow: hidden;">
                <span class="printTitle">默认打印效果：</span>
                <ul class="printSetting">
                  <li>
                    <div class="input-group">
                      <input type="radio" id="fileDefaultbest" name="filePrintdefaultPrintEffect"> <label  for="fileDefaultbest" >最佳</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="radio" id="fileDefaultnomal" name="filePrintdefaultPrintEffect"> <label  for="fileDefaultnomal" >一般</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="radio" id="filedefaultdraft" name="filePrintdefaultPrintEffect"> <label  for="filedefaultdraft" >草稿</label>
                    </div>
                  </li>
                </ul>
              </div>
              <hr style="margin: 1px;">
              <div style="overflow: hidden;">
                <span class="printTitle">支持双面打印：</span>
                <ul class="printSetting">
                  <li>
                    <div class="input-group">
                      <input type="checkbox" id="fileSuportdouble" name="filePrintsingleDoubleSide"> <label  for="fileSuportdouble" >双面打印</label>
                    </div>
                  </li>
                </ul>
              </div>
              <div style="overflow: hidden;">
                <span class="printTitle">默认单面双面：</span>
                <ul class="printSetting">
                  <li>
                    <div class="input-group">
                      <input type="radio" id="filedefaultsingle" name="filePrintdefaultSingleDoubleSide"> <label  for="filedefaultsingle" >单面打印</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="radio" id="filedefaultdouble" name="filePrintdefaultSingleDoubleSide"> <label  for="filedefaultdouble" >双面打印</label>
                    </div>
                  </li>
                </ul>
              </div>
              <hr style="margin: 1px;">
              <div style="overflow: hidden;">
                <span class="printTitle">支持彩色打印：</span>
                </ul>
                <ul class="printSetting">
                  <li>
                    <div class="input-group">
                      <input type="checkbox" id="fileSuportcolor" name="filePrintcolorPrint"> <label  for="fileSuportcolor" >彩色打印</label>
                    </div>
                  </li>
                </ul>
              </div>
              <div style="overflow: hidden;">
                <span class="printTitle">默认彩色黑白：</span>
                <ul class="printSetting">
                  <li>
                    <div class="input-group">
                      <input type="radio" id="fileDefaultblack" name="filePrintdefaultColorPrint"> <label  for="fileDefaultblack" >黑白打印</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="radio" id="fileDefaultcolor" name="filePrintdefaultColorPrint"> <label  for="fileDefaultcolor" >彩色打印</label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div id="imgPrint" v-show="!printImgOrFile">
              <div style="overflow: hidden;">
                <span class="printTitle">支持纸张类型：</span>
                <ul class="printSetting">
                  <li>
                    <div class="input-group">
                      <input type="checkbox" id="imgSuportA4" name="imgPrintpageType"> <label  for="imgSuportA4" >A4</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="checkbox" id="imgSuportA5" name="imgPrintpageType"> <label  for="imgSuportA5" >A5</label>
                    </div>
                  </li>
                  <li>
                  <div class="input-group">
                      <input type="checkbox" id="imgSuportImg" name="imgPrintpageType"> <label  for="imgSuportImg" >图片纸</label>
                    </div>
                  </li>
                </ul>
              </div>
              <div style="overflow: hidden;">
                <span class="printTitle">默认纸张类型：</span>
                <ul class="printSetting">
                  <li>
                    <div class="input-group">
                      <input type="radio" id="imgDefaultA4" name="imgPrintdefaultPageType"> <label  for="imgDefaultA4" >A4</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="radio" id="imgDefaultA5" name="imgPrintdefaultPageType"> <label  for="imgDefaultA5" >A5</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="radio" id="imgDefaultpaper" name="imgPrintdefaultPageType"> <label  for="imgDefaultpaper" >图片纸</label>
                    </div>
                  </li>
                </ul>
              </div>
              <hr style="margin: 1px;">
              <div style="overflow: hidden;">
                <span class="printTitle">支持打印效果：</span>
                <ul class="printSetting">
                  <li>
                    <div class="input-group">
                      <input type="checkbox" id="imgSuportbest" name="imgPrintprintEffect"> <label  for="imgSuportbest" >最佳</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="checkbox" id="imgSuportnomal" name="imgPrintprintEffect"> <label  for="imgSuportnomal" >一般</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="checkbox" id="imgSuportdraft" name="imgPrintprintEffect"> <label  for="imgSuportdraft" >草稿</label>
                    </div>
                  </li>
                </ul>
              </div>
              <div style="overflow: hidden;">
                <span class="printTitle">默认打印效果：</span>
                <ul class="printSetting">
                  <li>
                    <div class="input-group">
                      <input type="radio" id="imgDefaultbest" name="imgPrintdefaultPrintEffect"> <label  for="imgDefaultbest" >最佳</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="radio" id="imgDefaultnomal" name="imgPrintdefaultPrintEffect"> <label  for="imgDefaultnomal" >一般</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="radio" id="imgdefaultdraft" name="imgPrintdefaultPrintEffect"> <label  for="imgdefaultdraft" >草稿</label>
                    </div>
                  </li>
                </ul>
              </div>
              <hr style="margin: 1px;">
              <div style="overflow: hidden;">
                <span class="printTitle">支持双面打印：</span>
                <ul class="printSetting">
                  <li>
                    <div class="input-group">
                      <input type="checkbox" id="imgSuportdouble" name="imgPrintsingleDoubleSide"> <label  for="imgSuportdouble" >双面打印</label>
                    </div>
                  </li>
                </ul>
              </div>
              <div style="overflow: hidden;">
                <span class="printTitle">默认单面双面：</span>
                <ul class="printSetting">
                  <li>
                    <div class="input-group">
                      <input type="radio" id="imgdefaultsingle" name="imgPrintdefaultSingleDoubleSide"> <label  for="imgdefaultsingle" >单面打印</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="radio" id="imgdefaultdouble" name="imgPrintdefaultSingleDoubleSide"> <label  for="imgdefaultdouble" >双面打印</label>
                    </div>
                  </li>
                </ul>
              </div>
              <hr style="margin: 1px;">
              <div style="overflow: hidden;">
                <span class="printTitle">支持彩色打印：</span>
                </ul>
                <ul class="printSetting">
                  <li>
                    <div class="input-group">
                      <input type="checkbox" id="imgSuportcolor" name="imgPrintcolorPrint"> <label  for="imgSuportcolor" >彩色打印</label>
                    </div>
                  </li>
                </ul>
              </div>
              <div style="overflow: hidden;">
                <span class="printTitle">默认彩色黑白：</span>
                <ul class="printSetting">
                  <li>
                    <div class="input-group">
                      <input type="radio" id="imgDefaultblack" name="imgPrintdefaultColorPrint"> <label  for="imgDefaultblack" >黑白打印</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="radio" id="imgDefaultcolor" name="imgPrintdefaultColorPrint"> <label  for="imgDefaultcolor" >彩色打印</label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="form-group">
       <button class="btn btn-save">save</button>
    </div> -->
  </fieldset>
</template>
<script>
export default {
  data() {
    return {
      selected: 'F5S46B',
      options: [],
      btnState: false,
      PrintEmailId: '',
      deviceId: '',
      isclick: false,
      printImgOrFile:true
    }
  },
  beforeCreate() {
  },
  mounted() {
    if(localStorage.getItem('updataPrinterMessage')){
      var obj = JSON.parse(localStorage.getItem('updataPrinterMessage'));
      var doc_defaultObj = obj.doc_default;
      var photo_defaultObj = obj.photo_default;

      this.updataAssign(doc_defaultObj,'#file');
      this.updataAssign(photo_defaultObj,'#img');

    }
  },
  methods: {
    filePrint:function (flag) {
      this.printImgOrFile = flag
    },
    updataAssign:function(defaultObj,fileOrImg){
       //纸张类型
      if(defaultObj.pageType.indexOf('IsoA4_210x297mm') >= 0){
          $(fileOrImg+'SuportA4').attr('checked','checked');
      }
      if(defaultObj.pageType.indexOf('NaIndex_4x6_4x6in') >= 0){
          $(fileOrImg+'SuportA5').attr('checked','checked');
      }
      if(defaultObj.pageType.indexOf('Na_5x7_5x7in') >= 0){
          $(fileOrImg+'SuportImg').attr('checked','checked');
      }
      if(defaultObj.defaultPageType.indexOf('IsoA4_210x297mm') >= 0){
          $(fileOrImg+'DefaultA4').attr('checked','checked');
      }
      if(defaultObj.defaultPageType.indexOf('NaIndex_4x6_4x6in') >= 0){
          $(fileOrImg+'DefaultA5').attr('checked','checked');
      }
      if(defaultObj.defaultPageType.indexOf('Na_5x7_5x7in') >= 0){
          $(fileOrImg+'Defaultpaper').attr('checked','checked');
      }
      //打印效果
      if(defaultObj.printEffect.indexOf('Best') >= 0){
          $(fileOrImg+'Suportbest').attr('checked','checked');
      }
      if(defaultObj.printEffect.indexOf('Normal') >= 0){
          $(fileOrImg+'Suportnomal').attr('checked','checked');
      }
      if(defaultObj.printEffect.indexOf('FastDraft') >= 0){
          $(fileOrImg+'Suportdraft').attr('checked','checked');
      }
      if(defaultObj.defaultPrintEffect.indexOf('Best') >= 0){
          $(fileOrImg+'Defaultbest').attr('checked','checked');
      }
      if(defaultObj.defaultPrintEffect.indexOf('Normal') >= 0){
          $(fileOrImg+'Defaultnomal').attr('checked','checked');
      }
      if(defaultObj.defaultPrintEffect.indexOf('FastDraft') >= 0){
          $(fileOrImg+'Defaultdraft').attr('checked','checked');
      }
      //单双面打印
      if(defaultObj.singleDoubleSide.indexOf('Duplex') >= 0){
          $(fileOrImg+'Suportdouble').attr('checked','checked');
      }
      if(defaultObj.defaultSingleDoubleSide.indexOf('OneSided') >= 0){
          $(fileOrImg+'defaultsingle').attr('checked','checked');
      }
      if(defaultObj.defaultSingleDoubleSide.indexOf('Duplex') >= 0){
          $(fileOrImg+'defaultdouble').attr('checked','checked');
      }
      //彩色打印
      if(defaultObj.colorPrint.indexOf('Color') >= 0){
          $(fileOrImg+'Suportcolor').attr('checked','checked');
      }
      if(defaultObj.defaultSingleDoubleSide.indexOf('Grey_K') >= 0){
          $(fileOrImg+'Defaultblack').attr('checked','checked');
      }
      if(defaultObj.defaultSingleDoubleSide.indexOf('Color') >= 0){
          $(fileOrImg+'Defaultcolor').attr('checked','checked');
      }
    }
  }
}

</script>
<style type="text/css" scoped="">
ul {
  list-style: none;
}

input {
  vertical-align: middle;
}

.printTitle {
  float: left;
  padding: 3px;
  width: 110px;
}

.printSetting {
  overflow: hidden;
  padding: 0;
  float: left;
  margin-bottom: 0px;
}

.printSetting li {
  width: 80px;
  padding: 3px;
  float: left;
}
label{vertical-align: middle;margin-bottom: 0px;font-weight: 1;margin-left: 2px;}
.printImgOrFileActive{color: #337ab7;font-size: 17px;}
.printImgOrFileNoActive{color: black;font-size: 17px;}
.printModelSlider{width: 100%;height: 2px;background: black;}

.printFileOrImgActive{border-top-left-radius: 2px;border-top-right-radius: 2px;border-top: 1px solid rgb(204,204,204);border-left: 1px solid rgb(204,204,204);border-right: 1px solid rgb(204,204,204);border-bottom: 0;}
.printFileOrImgNoActive{border-top: 0;border-left: 0;border-right: 0;border-bottom: 1px solid rgb(204,204,204);}
input[type=checkbox],input[type=radio]{margin:0;}
</style>
