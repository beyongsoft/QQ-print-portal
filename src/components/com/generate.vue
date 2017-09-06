<template>
  <fieldset>
    <h3>Generate</h3>
    <div class="form-group">
      <label class="col-sm-4 col-xs-4 col-md-4 control-label text-left" for="ds_host">
        <span class="icon-zhanghao iconfont"></span>SKU</label>
      <div class="col-sm-6 col-xs-6 col-md-6">
        <select v-model="selected" class="form-control">
          <option v-for="(opt,index) in options" :value="opt.value" :key="index">
            {{opt.value}}
          </option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" for="ds_username">
        <span class="icon-youxiang iconfont"></span>PrintEmailId</label>
      <div class="col-sm-6 col-xs-6 col-md-6">
        <input class="form-control" id="ds_username" type="text" placeholder="PrintEmailId" v-model="PrintEmailId" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-xs-4 control-label text-left" for="ds_username"></label>
      <div class="col-sm-6 col-xs-6 col-md-6 bth-style">
        <button class="btn btn-default btn-primary" @click="step1" :class="{'disabled':btnState}">Genetare QR Code</button>
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
      PrintEmailId:''
    }
  },
 beforeCreate(){
   const vm = this;
  vm.$http.get(vm.$store.state.url+"/qrcode/getSku").then((data)=>{//动态获取SKU
    for(var i=0;i<data.body.length;i++){
      vm.options.push({value:data.body[i]})
    }
  })
 },
  methods: {
    step1: function() {//第一次生成图片二维码
      const vm = this;
      vm.btnState = true;
      setTimeout(function() {//每次按下之后，将按钮禁用5秒
        vm.btnState = false
      }, 5 * 1000)
      const obj = {
        sku: vm.selected,
        emailId: vm.PrintEmailId
      }
      this.$store.commit('newStep1', obj)
      var json = JSON.stringify(obj)
      vm.$http.post(vm.$store.state.url + "/qrcode/generate", json, { emulateJSON: true }).then((data) => {
        if (data.body == "") {
          vm.$store.state.warningState = true;
          vm.$store.state.warningContent = "The server did not return data"
        }
        vm.$store.state.printerId = data.body.content.split("=")[1]
        vm.$store.state.codeSrc = "data:image/png;base64," + data.body.data
        vm.$store.commit('log', JSON.stringify(data.body))
      }, (err) => {
        if (err.state == 500) {
          vm.$store.state.warningState = true;
          vm.$store.state.warningContent = "Server error"
        } else if (err.state == 404) {
          vm.$store.state.warningState = true;
          vm.$store.state.warningContent = "No resource found"
        } else {
          vm.$store.state.warningState = true;
          vm.$store.state.warningContent = "Server exception"
        }
        vm.$store.commit('log', JSON.stringify(err))
      })
    }
  }
}
</script>
