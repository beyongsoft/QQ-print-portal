<template>
  <fieldset>
    <h3>Push Message Rules({{num}})</h3>
    <!-- <div><router-link to="/pushMessageList" tag="li" class="addProduct">查看已添加推送信息</router-link></div> -->
    <div class="dropdown">
      <a href="#" class="dropdown-toggle" data-toggle="dropdown" name="thresholdLevel">{{threshold_level}}<b class="caret"></b></a>
      <ul class="dropdown-menu dd">
        <li><a v-on:click="threshold_level = 'Low' ">Low</a></li>
        <li><a v-on:click="threshold_level = 'VeryLow' ">VeryLow</a></li>
        <li><a v-on:click="threshold_level = 'Missing' ">Missing</a></li>
      </ul>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>Color</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="Color" type="text" placeholder="Color" name="color" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>Selectability Num</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="SelectabilityNum" type="text" placeholder="Selectability Num" name="selectAbilityNumber" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>Part#</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="Part" type="text" placeholder="Part#" name="partSharp" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>JD Link</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="JDLink" type="text" placeholder="JD Link" name="jdLink" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>Consumable Type</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="ConsumableType" type="text" placeholder="Consumable Type" name="consumableType" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>Threshold Value</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="ThresholdValue" type="text" placeholder="Threshold Value" name="thresholdValue" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>Alter Title</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="AlterTitle" type="text" placeholder="Alter Title" name="alterTitle" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>HelpUrl Title</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="HelpUrlTitle" type="text" placeholder="HelpUrl Title" name="helpUrlTitle" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>Icon Url</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="IconUrl" type="text" placeholder="Icon Url" name="iconUrl" />
      </div>
    </div>
<!--     <div class="form-group">
       <button class="btn btn-save" v-on:click="num++">save</button>
    </div> -->
  </fieldset>
</template>
<script>
export default {
  data() {
    return {
      threshold_level:'threshold_level',
      selected: 'F5S46B',
      options: [],
      btnState: false,
      PrintEmailId: '',
      deviceId: '',
      isclick: false,
      num:0
    }
  },
  beforeCreate() {
  },
  methods: {
    validator: function() { //验证printeremailid是否存在
      var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      var flag = reg.test($.trim(this.PrintEmailId)) //验证邮箱的正则表达式
      this.isclick = !flag
      this.btnState = !flag
      this.$store.state.newBing = flag //判断是否需要绑定
      if (!flag) {
        var str = "Please enter the correct PrintEmailId"
        this.showWarining(str)

      }
      return flag
    }
  }
}

</script>
<style type="text/css" scoped="">
  .dd{margin-left: 35%;}
  .btn-save{margin-left: 70%;background: #2e6daF;color:white;}
</style>
