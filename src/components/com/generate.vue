<template>
  <fieldset>
    <h3>Generate</h3>
    <div class="form-group">
      <label class="col-sm-4 col-xs-4 col-md-4 control-label text-left" >
        <span class="icon-zhanghao iconfont"></span>SKU</label>
      <div class="col-sm-6 col-xs-6 col-md-6">
        <select v-model="selected" class="form-control">
          <option v-for="(opt,index) in options" :value="opt.value" :key="index">
            {{opt.text}}
          </option>
        </select>
      </div>
    </div>
    <div class="form-group" :class="{'has-error':isclick}">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" for="ds_username">
        <span class="icon-youxiang iconfont"></span>PrintEmailId</label>
      <div class="col-sm-6 col-xs-6 col-md-6">
        <input class="form-control" id="ds_username" type="text" placeholder="PrintEmailId" v-model="PrintEmailId" @blur="validator" required/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-xs-4 control-label text-left" for="ds_username"></label>
      <div class="col-sm-6 col-xs-6 col-md-6 bth-style">
        <button class="btn btn-default btn-primary" @click="step1" :class="{'disabled':btnState}">Generate QR Code</button>
      </div>
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
      vm.btnState = true;
      vm.validator()
      setTimeout(function() {//每次按下之后，将按钮禁用5秒
        vm.btnState = false
      }, 5 * 1000)
      const obj = {
        sku: vm.selected,
        emailId: vm.PrintEmailId
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
    },
    validator: function(){//验证printeremailid是否存在
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        var flag=reg.test(this.PrintEmailId)//验证邮箱的正则表达式
        this.isclick = !flag
        this.btnState = !flag
        this.$store.state.newBing = flag//判断是否需要绑定
        if(!flag) {
            var str = "Please enter the correct PrintEmailId"
            this.showWarining(str)

        }
    }
  }
}

</script>
