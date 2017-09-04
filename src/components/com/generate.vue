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
        <button class="btn btn-default btn-primary" @click="step1">Genetare QR Code</button>
      </div>
    </div>
  </fieldset>
</template>
<script>
export default {
  data() {
    return {
      selected: 'F5S46B',
      options: [
        { value: 'F5S46B' },
        { value: 'F5S46B' },
        { value: 'F5S46B' }
      ]
    }
  },
  methods: {
    step1: function() {//第一次生成图片二维码
      const vm = this;
      const obj = {
        sku: vm.selected,
        emailId: vm.PrintEmailId
      }
      this.$store.commit('newStep1', obj)
      var json = JSON.stringify(obj)
      console.log(json)
      vm.$http.post(vm.$store.state.url + "/qrcode/generate", json, { emulateJSON: true }).then((data) => {
        vm.$store.state.printerId = data.body.content.split("=")[1]
        vm.$store.state.codeSrc = "data:image/png;base64," + data.body.data
        vm.$store.commit('log', JSON.stringify(data.body))
      }, (err) => {
        console.log(err)
        vm.$store.commit('log', JSON.stringify(err))
      })
    }
  }
}
</script>
