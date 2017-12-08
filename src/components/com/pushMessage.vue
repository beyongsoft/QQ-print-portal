<template>
  <fieldset>
    <h3>Push Message Rules({{num}})</h3>
    <!-- <div><router-link to="/pushMessageList" tag="li" class="addProduct">查看已添加推送信息</router-link></div> -->
    <div class="dropdown">
      <a href="#" class="dropdown-toggle" data-toggle="dropdown" v-model="threshold_level">{{threshold_level}}<b class="caret"></b></a>
      <ul class="dropdown-menu dd">
        <li><a v-on:click="threshold_level = 'Low' ">Low</a></li>
        <li><a v-on:click="threshold_level = 'VeryLow' ">VeryLow</a></li>
        <li><a v-on:click="threshold_level = 'Missing' ">Missing</a></li>
      </ul>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>Color</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="Color" type="text" placeholder="Color" v-model="Color" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>Selectability Num</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="SelectabilityNum" type="text" placeholder="Selectability Num" v-model="SelectabilityNum" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>Part#</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="Part" type="text" placeholder="Part#" v-model="Part" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>JD Link</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="JDLink" type="text" placeholder="JD Link" v-model="JDLink" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>Consumable Type</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="ConsumableType" type="text" placeholder="Consumable Type" v-model="ConsumableType" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>Threshold Value</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="ThresholdValue" type="text" placeholder="Threshold Value" v-model="ThresholdValue" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>Alter Title</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="AlterTitle" type="text" placeholder="Alter Title" v-model="AlterTitle" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>HelpUrl Title</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="HelpUrlTitle" type="text" placeholder="HelpUrl Title" v-model="HelpUrlTitle" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>Icon Url</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="IconUrl" type="text" placeholder="Icon Url" v-model="IconUrl" />
      </div>
    </div>
    <div class="form-group">
       <button class="btn btn-save" v-on:click="num++">save</button>
    </div>
  </fieldset>
</template>
<script>
export default {
  data() {
    return {
      threshold_level:'threshold_level',
      selected: 'F5S46B',
      options: [],
      btnState: false,
      PrintEmailId: '',
      deviceId: '',
      isclick: false,
      num:0
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
    step1: function() { //第一次生成图片二维码
      const vm = this;
      let str = ""

      var hasprint = vm.validator()
      if (!hasprint) {

      } else if (vm.selected == "") {
        str = "Please select sku"
        vm.showWarining(str)
      } else {
        vm.btnState = true;
        setTimeout(function() { //每次按下之后，将按钮禁用5秒
          vm.btnState = false
        }, 5 * 1000)
        const obj = {
          sku: vm.selected,
          emailId: $.trim(vm.PrintEmailId),
          deviceId: $.trim(vm.deviceId)
        }
        this.$store.commit('newStep1', obj)
        var json = JSON.stringify(obj)
        const url = vm.$api.url("qrcode/generate")
        vm.$http.post(url, json, { emulateJSON: true }).then((data) => {
          if (data.body == "") {
            str = "The server did not return data"
            vm.showWarining(str)
          } else if (data.body.statusCode == 1) {
            str = data.body.message
            vm.showWarining(str)
          } else {
            vm.$store.state.printerId = data.body.content.split("=")[1]
            vm.$store.state.codeSrc = "data:image/png;base64," + data.body.data
            vm.$store.commit('log', JSON.parse(JSON.stringify(data.body.log)))
            str = "Generate Success"
            vm.showSuccess(str)
          }
        }, (err) => {
          if (err.state == 500) {
            str = "Server error"
            vm.showWarining(str)
          } else if (err.state == 404) {
            str = "No resource found"
            vm.showWarining(str)
          } else {
            str = "Server exception"
            vm.showWarining(str)
          }
          vm.$store.commit('log', JSON.parse(JSON.stringify(err)))
        })
      }
    },
    validator: function() { //验证printeremailid是否存在
      var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      var flag = reg.test($.trim(this.PrintEmailId)) //验证邮箱的正则表达式
      this.isclick = !flag
      this.btnState = !flag
      this.$store.state.newBing = flag //判断是否需要绑定
      if (!flag) {
        var str = "Please enter the correct PrintEmailId"
        this.showWarining(str)

      }
      return flag
    }
  }
}

</script>
<style type="text/css" scoped="">
  .dd{margin-left: 35%;}
  .btn-save{margin-left: 70%;background: #2e6daF;color:white;}
</style>
