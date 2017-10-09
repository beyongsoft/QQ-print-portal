<template>
  <fieldset style="position:relative;">
    <h3>Binding</h3>
    <div class="form-group">
      <label  class="col-sm-4 col-xs-4 col-md-4 text-left control-label">
        <span class="icon-shebeixinghao iconfont"></span>Printer Model Name</label>
      <div class="col-sm-6 col-xs-6 col-md-6">{{printerName}}</div>
    </div>
    <div class="form-group">
      <label  class="col-sm-4 col-xs-4 col-md-4 text-left control-label">
        <span class="icon-tupian iconfont"></span>Printer Image
      </label>
      <div class="col-sm-6 col-xs-6 col-md-6">
        <img class="img-responsive img-center" alt="printer image" :src="printerImg">
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 text-left control-label" >
        <span class="icon-xuliehaoshangpin iconfont"></span>Sn</label>
      <div class="col-sm-6 col-xs-6 col-md-6">
        <input class="form-control" :value="Sn" type="text" placeholder="Readonly input here…" readonly/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-xs-4 col-md-4 text-left control-label">
        <span class="icon-biaozhunhualiucheng1 iconfont"></span>Pid</label>
      <div class="col-sm-6 col-xs-6 col-md-6">
        <input class="form-control" :value="Pid" type="text" placeholder="Readonly input here… " readonly/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-xs-4 col-md-4 text-left control-label" >
        <span class="icon-youxiang iconfont"></span>Din</label>
      <div class="col-sm-4 col-xs-6 col-md-6">
        <input class="form-control" :value="Din" type="text" placeholder="Readonly input here… " readonly/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-xs-4 col-md-4 text-left control-label" ></label>
      <div class="col-sm-6  col-xs-6 col-md-6 bth-style">
        <button class="btn btn-default btn-primary" :class="{'disabled':btnState||newBing}" @click="step3">Binding</button>
      </div>
    </div>

  </fieldset>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'binding',
  data() {
    return {
      btnState: false
    }
  },
  computed: mapState({
    isWarning() {
      return this.$store.state.isWarning
    },
    newBing() {
      return !this.$store.state.newBing
    },
    printerName() {
      return this.$store.state.printerName
    },
    printerImg() {
      return this.$store.state.printerImg
    },
    Pid() {
      return this.$store.state.Pid
    },
    Din() {
      return this.$store.state.Din
    },
    Sn() {
      return this.$store.state.Sn
    }
  }),
  methods: {
    step3: function() {//当是新绑定的时候，调用这个函数返回结果为0
      let vm = this;
      let str = "";
      vm.btnState = true;
      setTimeout(function() {//每次按下之后，将按钮禁用5秒
        vm.btnState = false
      }, 5 * 1000)
      if (vm.$store.state.newBing) {//判断是否需要绑定
        var json = JSON.stringify({
          "pid": vm.$store.state.Pid,
          "sn": vm.$store.state.Sn,
          "din": vm.$store.state.Din,
          "dtoken": vm.$store.state.dtoken,
          "drefreshtoken": vm.$store.state.drefreshToken
        });
        vm.$http.post(vm.$api.url("bindPrinter/bind"), json, { emulateJSON: true }).then((data) => {
          if (data.body == "") {
            str="The server did not return data"
            vm.showWarining(str)
          } else if (data.body.resultCode == -1) {
            str= "Binding failed"
            vm.showWarining(str)
          }
          vm.$store.state.resultCode = data.body.resultCode;
          vm.$store.state.logMessage = JSON.parse(JSON.stringify(data.body.log))
          str = "Successful binding!Jumping to the printer page for you...."
          vm.showSuccess(str)
          setTimeout(function(){
            vm.$router.push({name:"qRcode",params:{emailId:vm.$store.state.PrintEmailId}})
          },3*1000)
        }, (err) => {
          if (err.status == 500) {
            str= "Server error"
            vm.showWarining(str)
          } else if (err.status == 404) {
            str="No resource found"
            vm.showWarining(str)
          } else {
          str= "Server exception"
            vm.showWarining(str)
          }
            vm.$store.commit('log', JSON.parse(JSON.stringify(err)))
        })
      } else {
         str="This printEmailId is already bound"
        this.showWarining(str)
      }
    }
  },
    valid:function () {
        if(this.$store.state.printerImg==''){
            str= ""
            vm.showWarining(str)
        }
    }
}
</script>

