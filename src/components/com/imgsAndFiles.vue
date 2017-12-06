<template>
  <fieldset>
    <h3>ImgsAndFiles</h3>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" for="ds_username"></span>certificate</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="ds_certificate" type="file" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" for="ds_username"></span>Flyer</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="ds_Flyer" type="file" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" for="ds_username"></span>PrinterIcon</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="ds_PrinterIcon" type="file"/>
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
      deviceId:'',
      isclick:false
    }
  },
  beforeCreate() {
    const vm = this;
    const url=vm.$api.url("qrcode/getSku")
    vm.$http.get(url).then((data) => {//动态获取SKU

      for (var i = 0; i < data.body.length; i++) {
          var str =""
            if(data.body[i].model!=null){
                str = data.body[i].sku+"——"+data.body[i].model
            }else{
                str = data.body[i].sku
            }
          vm.options.push({ text:str,value:data.body[i].sku})
      }
    })
  },
  methods: {
    step1: function() {//第一次生成图片二维码
      const vm = this;
      let str = ""

      var hasprint = vm.validator()
        if(!hasprint){

        }else if(vm.selected==""){
            str = "Please select sku"
            vm.showWarining(str)
        }else{
            vm.btnState = true;
          setTimeout(function() {//每次按下之后，将按钮禁用5秒
            vm.btnState = false
          }, 5 * 1000)
          const obj = {
            sku: vm.selected,
            emailId: $.trim(vm.PrintEmailId),
            deviceId: $.trim(vm.deviceId)
          }
          this.$store.commit('newStep1', obj)
          var json = JSON.stringify(obj)
          const url=vm.$api.url("qrcode/generate")
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
    validator: function(){//验证printeremailid是否存在
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        var flag=reg.test($.trim(this.PrintEmailId))//验证邮箱的正则表达式
        this.isclick = !flag
        this.btnState = !flag
        this.$store.state.newBing = flag//判断是否需要绑定
        if(!flag) {
            var str = "Please enter the correct PrintEmailId"
            this.showWarining(str)

        }
        return flag
    }
  }
}

</script>
<style type="text/css" scoped="">
  input{font-size: 10px;}
</style>