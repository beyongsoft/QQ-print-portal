<template>
  <fieldset>
    <h3>Keys</h3>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" ></span>PID</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="PID" type="text" placeholder="PID" name="pId" v-model="pId"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left"></span>Public Key</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="public" type="file" name="publicKeyFile" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left"></span>Private Key</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="private" type="file" name="privateKeyFile" />
      </div>
    </div>
<!--     <div class="form-group">
       <button class="btn btn-save">save</button>
    </div> -->
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
      isclick:false,

      pId:''
    }
  },
  beforeCreate() {
  },
  mounted() {
    if(localStorage.getItem('updataPrinterMessage')){
      var obj = JSON.parse(localStorage.getItem('updataPrinterMessage'));
      this.pId = obj.pId;
    }
  },
  methods: {
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
<style type="text/css">
  input[type="file"]{font-size: 10px;}
</style>
<style type="text/css" scoped="">
    .form-group label{width: 25%;}
    .form-group div{width: 75%;}
</style>