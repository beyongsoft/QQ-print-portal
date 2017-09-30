<template>
  <fieldset>
    <h3>Scan QR Code</h3>
    <div class="form-group">
      <label  class="col-sm-4 col-xs-4 col-md-4 control-label text-left">
        <span class="icon-shengchengerweimaxuanzhong iconfont"></span>OR code
      </label>
      <div class="col-sm-6 col-xs-6 col-md-6">
        <img id="qRCode" :src="codeSrc" class="img-responsive img-center" alt="qRcode">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left"></label>
      <div class="col-sm-6 col-xs-6 col-md-6 bth-style">
        <button class="btn btn-default btn-primary" @click="step2" :class="{'disabled':btnState||!newBing}">Scan</button>
      </div>
    </div>
  </fieldset>
</template>
<script>
export default {
  name: 'scan',
  data() {
    return {
      btnState: false
    }
  },
  computed: {
    codeSrc() {
      return this.$store.state.codeSrc
    },
      newBing(){
          return this.$store.state.newBing
      }
  },
  methods: {
    step2: function() {//根据生成二维码获得的id去调用获取该printerid的相关信息
      var vm = this;
      let str = ""
      vm.btnState = true;
      setTimeout(function() {
        vm.btnState = false
      }, 5 * 1000)
      vm.$http.get(vm.$api.url("scanQRCode/getSnAndPidByPinterId?printerId=" + vm.$store.state.printerId)).then((data) => {
        if (data.body == "") {
          str = "The server did not return data"
          vm.showWarining(str)
        }
        vm.$store.commit('log', JSON.parse(JSON.stringify(data.body.log)))
        let Am = data.body
        vm.$store.state.printerName = Am.model
        vm.$store.state.printerImg = Am.printerLogoUrl
        vm.$store.state.Din = Am.token.din;
        vm.$store.state.Sn = Am.snInfo.sn;
        vm.$store.state.Pid = Am.snInfo.pid;
        vm.$store.state.dtoken = Am.token.token;
        vm.$store.state.drefreshToken = Am.token.refreshToken;
        vm.$store.state.newBing = Am.newBinding;
        vm.$store.state.isWarning = !Am.newBinding;
        if(!Am.newBinding){
           str="This printEmailId is already bound"
           this.showWarining(str)
        }else{
          str = "Scan Successful"
          vm.showSuccess(str)
        }

      }, (err) => {
          this.$store.state.newBing = true
        if (err.status == 500) {
          str = "Server error"
          vm.showWarining(str)
        } else if (err.status == 404) {
          str = "No resource found"
          vm.showWarining(str)
        } else {
          str = "Server exception"
          vm.showWarining(str)
        }
        vm.$store.commit('log', JSON.parse(JSON.stringify(err)))
      })

    }
  }
}
</script>

