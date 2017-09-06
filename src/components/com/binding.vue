<template>
     <fieldset style="position:relative;">
          <h3>Binding</h3>
          <div class="form-group">
            <label for="disabledSelect" class="col-sm-4 col-xs-4 col-md-4 text-left control-label">
              <span class="icon-shebeixinghao iconfont"></span>Printer Model Name</label>
            <div class="col-sm-6 col-xs-6 col-md-6">{{printerName}}</div>
          </div>
          <div class="form-group">
            <label for="disabledSelect" class="col-sm-4 col-xs-4 col-md-4 text-left control-label">
              <span class="icon-tupian iconfont"></span>Printer Image
            </label>
            <div class="col-sm-6 col-xs-6 col-md-6">
              <img class="img-responsive img-center" alt="printer image" :src="printerImg">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-4 col-md-4 col-xs-4 text-left control-label" for="ds_username">
              <span class="icon-xuliehaoshangpin iconfont"></span>Sn</label>
            <div class="col-sm-6 col-xs-6 col-md-6">
              <input class="form-control" :value="Sn" type="text" placeholder="Readonly input here…" readonly/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-4 col-xs-4 col-md-4 text-left control-label" for="ds_username">
              <span class="icon-biaozhunhualiucheng1 iconfont"></span>Pid</label>
            <div class="col-sm-6 col-xs-6 col-md-6">
              <input class="form-control" :value="Pid" type="text" placeholder="Readonly input here… " readonly/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-4 col-xs-4 col-md-4 text-left control-label" for="ds_username">
              <span class="icon-youxiang iconfont"></span>Din</label>
            <div class="col-sm-4 col-xs-6 col-md-6">
              <input class="form-control" :value="Din" type="text" placeholder="Readonly input here… " readonly/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-4 col-xs-4 col-md-4 text-left control-label" for="ds_password"></label>
            <div class="col-sm-6  col-xs-6 col-md-6 bth-style">
              <button class="btn btn-default btn-primary" :class="{'disabled':btnState}" :disabled='newBing' @click="step3">Binding</button>
            </div>
            <div class="alert alert-warning warning" v-show="isWarning">
              <a href="#" class="close" data-dismiss="alert">&times;</a>
              <strong>warning！</strong>This printer has been bound.
            </div>
          </div>
        </fieldset>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name:'binding',
  data(){
    return{
      btnState:false
    }
  },
    computed:mapState({
    isWarning(){
      return this.$store.state.isWarning
    },
      newBing(){
      return !this.$store.state.newBing
    },
     printerName(){
      return this.$store.state.printerName
    },
      printerImg(){
      return this.$store.state.printerImg
    },
      Pid(){
      return this.$store.state.Pid
    },
     Din(){
      return this.$store.state.Din
    },
    Sn(){
      return this.$store.state.Sn
    }
  }),
  methods : {
      step3: function() {//当是新绑定的时候，调用这个函数返回结果为0
       let vm = this;
         vm.btnState = true;
      setTimeout(function() {//每次按下之后，将按钮禁用5秒
        vm.btnState = false
      }, 5 * 1000)
      if (vm.$store.state.newBing) {//判断是否需要绑定
        var json = JSON.stringify({
          "pid": vm.$store.state.Pid,
          "sn": vm.$store.state.Sn,
          "din": vm.$store.state.Din
        });
        vm.$http.post(vm.$store.state.url + "/bindPrinter/bind", json, { emulateJSON: true }).then((data) => {
         if(data.body==""){
            vm.$store.state.warningState = true;
            vm.$store.state.warningContent = "The server did not return data"
         }
          vm.$store.state.resultCode = data.body.resultCode;
          vm.$store.state.logMessage = JSON.stringify(data.body.log)
        } ,(err)=>{
        if(err.state==500){
           vm.$store.state.warningState = true;
            vm.$store.state.warningContent = "Server error"
        }else if(err.state==404){
          vm.$store.state.warningState = true;
            vm.$store.state.warningContent = "No resource found"
        }else{
           vm.$store.state.warningState = true;
            vm.$store.state.warningContent = "Server exception"
        }
          vm.$store.state.logMessage = JSON.stringify(err)
        })
      }
    },
  }
}
</script>

