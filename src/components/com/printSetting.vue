<template>
  <fieldset>
    <h3>PrintSetting</h3>
    <div class="form-group">
      <div class="col-sm-12">
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
                      <input type="checkbox" id="fileSuportA4"> <label  for="fileSuportA4" >A4</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="checkbox" id="fileSuportA5"> <label  for="fileSuportA5" >A5</label>
                    </div>
                  </li>
                </ul>
              </div>
              <div style="overflow: hidden;">
                <span class="printTitle">默认纸张类型：</span>
                <ul class="printSetting">
                  <li>
                    <div class="input-group">
                      <input type="radio" id="fileDefaultA4" name="filepaper"> <label  for="fileDefaultA4" >A4</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="radio" id="fileDefaultA5" name="filepaper"> <label  for="fileDefaultA5" >A5</label>
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
                      <input type="checkbox" id="fileSuportbest"> <label  for="fileSuportbest" >最佳</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="checkbox" id="fileSuportnomal"> <label  for="fileSuportnomal" >一般</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="checkbox" id="fileSuportdraft"> <label  for="fileSuportdraft" >草稿</label>
                    </div>
                  </li>
                </ul>
              </div>
              <div style="overflow: hidden;">
                <span class="printTitle">默认打印效果：</span>
                <ul class="printSetting">
                  <li>
                    <div class="input-group">
                      <input type="radio" id="fileDefaultbest" name="fileResult"> <label  for="fileDefaultbest" >最佳</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="radio" id="fileDefaultnomal" name="fileResult"> <label  for="fileDefaultnomal" >一般</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="radio" id="filedefaultdraft" name="fileResult"> <label  for="filedefaultdraft" >草稿</label>
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
                      <input type="checkbox" id="fileSuportdouble"> <label  for="fileSuportdouble" >双面打印</label>
                    </div>
                  </li>
                </ul>
              </div>
              <div style="overflow: hidden;">
                <span class="printTitle">默认单面双面：</span>
                <ul class="printSetting">
                  <li>
                    <div class="input-group">
                      <input type="radio" id="filedefaultsingle" name="fileDouble"> <label  for="filedefaultsingle" >单面打印</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="radio" id="filedefaultdouble" name="fileDouble"> <label  for="filedefaultdouble" >双面打印</label>
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
                      <input type="checkbox" id="fileSuportcolor"> <label  for="fileSuportcolor" >彩色打印</label>
                    </div>
                  </li>
                </ul>
              </div>
              <div style="overflow: hidden;">
                <span class="printTitle">默认彩色黑白：</span>
                <ul class="printSetting">
                  <li>
                    <div class="input-group">
                      <input type="radio" id="fileSuportblack" name="fileColor"> <label  for="fileSuportblack" >黑白打印</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="radio" id="fileDefaultcolor" name="fileColor"> <label  for="fileDefaultcolor" >彩色打印</label>
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
                      <input type="checkbox" id="imgSuportA4"> <label  for="imgSuportA4" >A4</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="checkbox" id="imgSuportA5"> <label  for="imgSuportA5" >A5</label>
                    </div>
                  </li>
                  <li>
                  <div class="input-group">
                      <input type="checkbox" id="imgSuportImg"> <label  for="imgSuportImg" >图片纸</label>
                    </div>
                  </li>
                </ul>
              </div>
              <div style="overflow: hidden;">
                <span class="printTitle">默认纸张类型：</span>
                <ul class="printSetting">
                  <li>
                    <div class="input-group">
                      <input type="radio" id="imgDefaultA4" name="imgpaper"> <label  for="imgDefaultA4" >A4</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="radio" id="imgDefaultA5" name="imgpaper"> <label  for="imgDefaultA5" >A5</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="radio" id="imgDefaultpaper" name="imgpaper"> <label  for="imgDefaultpaper" >图片纸</label>
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
                      <input type="checkbox" id="imgSuportbest"> <label  for="imgSuportbest" >最佳</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="checkbox" id="imgSuportnomal"> <label  for="imgSuportnomal" >一般</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="checkbox" id="imgSuportdraft"> <label  for="imgSuportdraft" >草稿</label>
                    </div>
                  </li>
                </ul>
              </div>
              <div style="overflow: hidden;">
                <span class="printTitle">默认打印效果：</span>
                <ul class="printSetting">
                  <li>
                    <div class="input-group">
                      <input type="radio" id="imgDefaultbest" name="imgResult"> <label  for="imgDefaultbest" >最佳</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="radio" id="imgDefaultnomal" name="imgResult"> <label  for="imgDefaultnomal" >一般</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="radio" id="imgdefaultdraft" name="imgResult"> <label  for="imgdefaultdraft" >草稿</label>
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
                      <input type="checkbox" id="imgSuportdouble"> <label  for="imgSuportdouble" >双面打印</label>
                    </div>
                  </li>
                </ul>
              </div>
              <div style="overflow: hidden;">
                <span class="printTitle">默认单面双面：</span>
                <ul class="printSetting">
                  <li>
                    <div class="input-group">
                      <input type="radio" id="imgdefaultsingle" name="imgDouble"> <label  for="imgdefaultsingle" >单面打印</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="radio" id="imgdefaultdouble" name="imgDouble"> <label  for="imgdefaultdouble" >双面打印</label>
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
                      <input type="checkbox" id="imgSuportcolor"> <label  for="imgSuportcolor" >彩色打印</label>
                    </div>
                  </li>
                </ul>
              </div>
              <div style="overflow: hidden;">
                <span class="printTitle">默认彩色黑白：</span>
                <ul class="printSetting">
                  <li>
                    <div class="input-group">
                      <input type="radio" id="imgSuportblack" name="imgColor"> <label  for="imgSuportblack" >黑白打印</label>
                    </div>
                  </li>
                  <li>
                    <div class="input-group">
                      <input type="radio" id="imgDefaultcolor" name="imgColor"> <label  for="imgDefaultcolor" >彩色打印</label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
       <button class="btn btn-save">save</button>
    </div>
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
    const vm = this;
    const url = vm.$api.url("qrcode/getSku")
    vm.$http.get(url).then((data) => { //动态获取SKU

      for (var i = 0; i < data.body.length; i++) {
        var str = ""
        if (data.body[i].model != null) {
          str = data.body[i].sku + "——" + data.body[i].model
        } else {
          str = data.body[i].sku
        }
        vm.options.push({ text: str, value: data.body[i].sku })
      }
    })
  },
  methods: {
    filePrint:function (flag) {
      this.printImgOrFile = flag
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
