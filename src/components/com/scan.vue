<template>
  <fieldset>
    <h3>Scan QR Code</h3>
    <div class="form-group">
      <label for="disabledSelect" class="col-sm-4 col-xs-4 col-md-4 control-label text-left">
        <span class="icon-shengchengerweimaxuanzhong iconfont"></span>OR code
      </label>
      <div class="col-sm-6 col-xs-6 col-md-6">
        <img id="qRCode" :src="codeSrc" class="img-responsive img-center" alt="qRcode">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" for="ds_password"></label>
      <div class="col-sm-6 col-xs-6 col-md-6 bth-style">
        <button class="btn btn-default btn-primary" @click="step2">Scan</button>
      </div>
    </div>
  </fieldset>
</template>
<script>
export default {
  name:'scan',
  data() {
    return {
    }
  },
  computed:{
    codeSrc(){
      return this.$store.state.codeSrc
    }
  },
  methods: {
    step2: function() {//根据生成二维码获得的id去调用获取该printerid的相关信息
      var vm = this;
      vm.$http.get(vm.$store.state.url + "/scanQRCode/getSnAndPidByPinterId?printerId=" + vm.$store.state.printerId).then((data) => {
        vm.$store.commit('log', JSON.stringify(data.body.log))
        let Am = data.body
        vm.$store.state.printerName = Am.model
        vm.$store.state.printerImg = Am.printerLogoUrl
        vm.$store.state.Din = Am.token.din;
        vm.$store.state.Sn = Am.snInfo.sn;
        vm.$store.state.Pid = Am.snInfo.pid;
        vm.$store.state.newBing = Am.newBinding;
        vm.$store.state.isWarning = !Am.newBinding
        console.log(vm.$store.state.sn)
      }, (err) => {
        vm.$store.commit('log', JSON.stringify(err))
      })

    }
  }
}
</script>

