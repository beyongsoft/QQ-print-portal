<template>
  <fieldset>
    <h3>Push Message Rules({{pushMessageList.length}})</h3>
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
        <input class="form-control" id="Color" type="text" placeholder="Color"  v-model="color"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>Selectability Num</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="SelectabilityNum" type="text" placeholder="Selectability Num"  v-model="selectAbilityNumber"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>Part#</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="Part" type="text" placeholder="Part#"  v-model="partSharp"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>JD Link</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="JDLink" type="text" placeholder="JD Link"  v-model="jdLink"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>Consumable Type</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="ConsumableType" type="text" placeholder="Consumable Type"  v-model="consumableType"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>Threshold Value</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="ThresholdValue" type="text" placeholder="Threshold Value"  v-model="thresholdValue"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>Alter Title</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="AlterTitle" type="text" placeholder="Alter Title"  v-model="alterTitle"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>HelpUrl Title</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="HelpUrlTitle" type="text" placeholder="HelpUrl Title"  v-model="helpUrlTitle"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >
        </span>Icon Url</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="IconUrl" type="text" placeholder="Icon Url"  v-model="iconUrl"/>
      </div>
    </div>
    <div class="form-group">
       <div class="btn btn-save" v-on:click="save()">save</div>
    </div>
    <div class="pushMessageListBreviary">
      <table class="table table-hover table-striped table-bordered" v-show="pushMessageList.length>0">
        <thead>
          <tr>
            <th>Color</th>
            <th>threshold_level</th>
            <th>Alter Title</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody id="pushMessageListContent">
          <tr v-for="(item,index) in pushMessageList">
            <td>{{item.color}}</td>
            <td>{{item.threshold_level}}</td>
            <td>{{item.alterTitle}}</td>
            <td><a href="javascript:void(0)" v-on:click="checkOrEdit(item,index)">check/edit</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </fieldset>
</template>
<script>

export default {
  data() {
    return {
      threshold_level:'threshold_level',
      color:'',
      selectAbilityNumber:'',
      partSharp:'',
      jdLink:'',
      consumableType:'',
      thresholdValue:'',
      alterTitle:'',
      helpUrlTitle:'',
      iconUrl:'',

      selected: 'F5S46B',
      options: [],
      btnState: false,
      PrintEmailId: '',
      deviceId: '',
      isclick: false,
      num:0,
      pushMessageList:[],
      isEdite:false,
      currentEditeNum:0,
      canBeSave:false,
      warningStr:''
    }
  },
  beforeCreate() {
    var self = this;
  }, 
  mounted() {
    if(localStorage.getItem('updataPrinterMessage')){
      var obj = JSON.parse(localStorage.getItem('updataPrinterMessage'));
      this.pushMessageList = obj.msg;
    }
  },
  methods: {
    save:function () {
      //判断input是否为空
      this.isInputsEmpty();
      if(!this.canBeSave){
        this.showWarining(this.warningStr);
        return;
      }

      this.canBeSave = false;
      //当前数据是点击编辑过来的，保存时去修改而不是直接添加
      if(this.isEdite){
        var editeObj = this.pushMessageList[this.currentEditeNum];
        editeObj.threshold_level = this.threshold_level;
        editeObj.color = this.color;
        editeObj.selectAbilityNumber = this.selectAbilityNumber;
        editeObj.partSharp = this.partSharp;
        editeObj.jdLink = this.jdLink;
        editeObj.consumableType = this.consumableType;
        editeObj.thresholdValue = this.thresholdValue;
        editeObj.alterTitle = this.alterTitle;
        editeObj.helpUrlTitle = this.helpUrlTitle;
        editeObj.iconUrl = this.iconUrl;

        //
        this.clearInputs();

        this.isEdite = false;

        return;
      }
      this.num++;
      var obj = {}
      obj.threshold_level = this.threshold_level;
      obj.color = this.color;
      obj.selectAbilityNumber = this.selectAbilityNumber;
      obj.partSharp = this.partSharp;
      obj.jdLink = this.jdLink;
      obj.consumableType = this.consumableType;
      obj.thresholdValue = this.thresholdValue;
      obj.alterTitle = this.alterTitle;
      obj.helpUrlTitle = this.helpUrlTitle;
      obj.iconUrl = this.iconUrl;
      this.pushMessageList.push(obj);

      this.clearInputs();
      //把数据存起来，提交的时候用，同时防止刷新数据消失
      localStorage.setItem('pushMessageArray22',JSON.stringify(this.pushMessageList));
    },
    clearInputs:function () {
      // 每次操作后清空input中内容
      this.threshold_level = 'threshold_level';
      this.color = '';
      this.selectAbilityNumber = '';
      this.partSharp = '';
      this.jdLink = '';
      this.consumableType = '';
      this.thresholdValue = '';
      this.alterTitle = '';
      this.helpUrlTitle = '';
      this.iconUrl = '';
    },
    checkOrEdit:function(item,index){
      //点击了查看，这时候save的时候就是修改而不是往数组中添加了
      this.isEdite = true;
      this.currentEditeNum = index;

      // 点击编辑和查看是把这条数据填充到对应的input中
      this.threshold_level = item.threshold_level;
      this.color = item.color;
      this.selectAbilityNumber = item.selectAbilityNumber;
      this.partSharp = item.partSharp;
      this.jdLink = item.jdLink;
      this.consumableType = item.consumableType;
      this.thresholdValue = item.thresholdValue;
      this.alterTitle = item.alterTitle;
      this.helpUrlTitle = item.helpUrlTitle;
      this.iconUrl = item.iconUrl;
    },
    isInputsEmpty:function(){
      if(this.threshold_level == 'threshold_level'){
        this.warningStr = '请选择threshold_level';
        return;
      }
      if (this.color == '') {
        this.warningStr = '请输入color';
        return;
      }
      if (this.selectAbilityNumber == '') {
        this.warningStr = '请输入selectAbilityNumber';
        return;
      }
      if (this.partSharp == '') {
        this.warningStr = '请输入partSharp';
        return;
      }
      if (this.jdLink == '') {
        this.warningStr = '请输入jdLink';
        return;
      }
      if (this.consumableType == '') {
        this.warningStr = '请输入consumableType';
        return;
      }
      if (this.thresholdValue == '') {
        this.warningStr = '请输入thresholdValue';
        return;
      }
      if (this.alterTitle == '') {
        this.warningStr = '请输入alterTitle';
        return;
      }
      if (this.helpUrlTitle == '') {
        this.warningStr = '请输入helpUrlTitle';
        return;
      }
      if (this.iconUrl == '') {
        this.warningStr = '请输入iconUrl';
        return;
      }
      //如果都不为空，则允许保存
      this.canBeSave = true;
    },
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
  td,th{text-align: center;}
</style>
