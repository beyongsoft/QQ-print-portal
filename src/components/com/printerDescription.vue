<template>
  <fieldset>
    <h3>Printer Description</h3>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" ></span>商品名称</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="ds_PrinterName" type="text" placeholder="商品名称" name="printerDescName" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" ></span>商品毛重</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="ds_PrinterWeight" type="text" placeholder="商品毛重" name="grossWeight" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" ></span>商品产地</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="ds_PrinterPlace" type="text" placeholder="商品产地"  name="placeOfOrigin" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" ></span>多功能</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="ds_Multifunctional" type="text" placeholder="多功能"  name="multifunction" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" ></span>网络打印</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="ds_FAQ" type="text" placeholder="网络打印"  name="networkPrint" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" ></span>类型</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="ds_printerType" type="text" placeholder="类型"  name="printerDescType" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" ></span>幅面</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="ds_PrinterBreadth" type="text" placeholder="幅面"  name="pageSize" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" ></span>用途</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="ds_PrinterPurpose" type="text" placeholder="用途"  name="useDesc" />
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
      isclick:false
    }
  },
  beforeCreate() {
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
  .btn-save{margin-left: 70%;background: #2e6daF;color:white;}
</style>
<style type="text/css" scoped="">
    .form-group label{width: 25%;}
    .form-group div{width: 75%;}
</style>