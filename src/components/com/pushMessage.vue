<template>
  <fieldset>
    <h3>Push Message Rules({{pushMessageList.length}})</h3>


    <div class="selectBox">
      <label class="col-sm-3 col-md-3 col-xs-3 control-label text-right" >
        </span>Threshold Level</label>
      <div class="dropdown">
          <a href="#" class="dropdown-toggle selectA" data-toggle="dropdown" v-model="thresholdLevel">{{thresholdLevel}}<b class="caret"></b></a>
          <ul class="dropdown-menu selectMenu">
            <li><a v-on:click="thresholdLevel = 'Low' ">Low</a></li>
            <li><a v-on:click="thresholdLevel = 'VeryLow' ">VeryLow</a></li>
            <li><a v-on:click="thresholdLevel = 'Missing' ">Missing</a></li>
          </ul>
      </div>
    </div>
    <div class="selectBox">
      <label class="col-sm-3 col-md-3 col-xs-3 control-label text-right" >
        </span>Color</label>
      <div class="dropdown">
          <a href="#" class="dropdown-toggle selectA" data-toggle="dropdown" v-model="color">{{color}}<b class="caret"></b></a>
          <ul class="dropdown-menu selectMenu">
            <li><a v-on:click="color = 'Black' ">Black</a></li>
            <li><a v-on:click="color = 'Cyan' ">Cyan</a></li>
            <li><a v-on:click="color = 'Magenta' ">Magenta</a></li>
            <li><a v-on:click="color = 'Yellow' ">Yellow</a></li>
            <li><a v-on:click="color = 'Color' ">Color</a></li>
            <li><a v-on:click="color = 'Drum CRG' ">Drum CRG</a></li>
          </ul>
      </div>
    </div>
    <div class="selectBox">
      <label class="col-sm-3 col-md-3 col-xs-3 control-label text-right" >
        </span>Selectability Num</label>
      <div class="dropdown">
          <a href="#" class="dropdown-toggle selectA" data-toggle="dropdown" v-model="selectAbilityNumber">{{selectAbilityNumber}}<b class="caret"></b></a>
          <ul class="dropdown-menu selectMenu">
            <li><a v-on:click="selectAbilityNumber = '905' ">905</a></li>
            <li><a v-on:click="selectAbilityNumber = '905XL' ">905XL</a></li>
            <li><a v-on:click="selectAbilityNumber = '909XL' ">909XL</a></li>
            <li><a v-on:click="selectAbilityNumber = '955' ">955</a></li>
            <li><a v-on:click="selectAbilityNumber = '955XL' ">955XL</a></li>
            <li><a v-on:click="selectAbilityNumber = '680' ">680</a></li>
            <li><a v-on:click="selectAbilityNumber = '88A' ">88A</a></li>
            <li><a v-on:click="selectAbilityNumber = '88X' ">88X</a></li>
            <li><a v-on:click="selectAbilityNumber = '30A' ">30A</a></li>
            <li><a v-on:click="selectAbilityNumber = '30X' ">30X</a></li>
            <li><a v-on:click="selectAbilityNumber = '32A' ">32A</a></li>
          </ul>
      </div>
    </div>
<!--     <div class="form-group">
      <label class="col-sm-3 col-md-3 col-xs-3 control-label text-right" >
        </span>Selectability Num</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="SelectabilityNum" type="text" placeholder="Selectability Num"  v-model="selectAbilityNumber"/>
      </div>
    </div> -->
    <div class="form-group">
      <label class="col-sm-3 col-md-3 col-xs-3 control-label text-right" >
        </span>Part#</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="Part" type="text" placeholder="Part#"  v-model="partSharp"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 col-md-3 col-xs-3 control-label text-right" >
        </span>JD Link</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <div style="border:1px solid #ccc;border-radius: 4px;">
          <div class="jdLinkBox">
            <input class="form-control" id="JDLink" type="text" placeholder="JD Link"  v-model="jdLink"/><span class="addJDLink" v-on:click="addJDLink()">+</span>
            <div class="jdLinkList">
              <table class="table table-hover table-striped table-bordered" v-show="pushMessageJDLinkList.length>0">
                <thead>
                  <tr>
                    <th>JDLink</th>
                    <th style="width: 20%;">Default JDLink</th>
                    <th style="width: 20%;">Edite</th>
                  </tr>
                </thead>
                <tbody id="jdLinkListContent">
                  <tr v-for="(item,index) in pushMessageJDLinkList">
                    <td>{{item}}</td>
                    <td><input type="radio" class="pushMessageJDLink" name="pushMessageJDLink"></td>
                    <td><div class="btn btn-danger" v-on:click="deleteJDLink(index)">delete</div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 col-md-3 col-xs-3 control-label text-right" >
        </span>Consumable Type</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="ConsumableType" type="text" placeholder="Consumable Type"  v-model="consumableType"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 col-md-3 col-xs-3 control-label text-right" >
        </span>Threshold Value</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="ThresholdValue" type="text" placeholder="Threshold Value"  v-model="thresholdValue"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 col-md-3 col-xs-3 control-label text-right" >
        </span>Alter Title</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="AlterTitle" type="text" placeholder="Alter Title"  v-model="alterTitle"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 col-md-3 col-xs-3 control-label text-right" >
        </span>HelpUrl Title</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="HelpUrlTitle" type="text" placeholder="HelpUrl Title"  v-model="helpUrlTitle"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 col-md-3 col-xs-3 control-label text-right" >
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
            <th>thresholdLevel</th>
            <th>Alter Title</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody id="pushMessageListContent">
          <tr v-for="(item,index) in pushMessageList">
            <td>{{item.color}}</td>
            <td>{{item.thresholdLevel}}</td>
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
      thresholdLevel:'thresholdLevel',
      color:'Colors',
      selectAbilityNumber:'selectAbilityNumber',
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
      pushMessageJDLinkList:[],
      pushMessageJDLinkDefault:'',
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

      //JDLink默认值
      var JDLinks = $('.pushMessageJDLink');
      for(var i = 0;i<JDLinks.length;i++){
        if(JDLinks[i].checked){
            this.pushMessageJDLinkDefault = this.pushMessageJDLinkList[i];
        }
      }
      if (this.pushMessageJDLinkDefault == "") {
        this.warningStr = 'Please Select the default jdLink';
        return;
      }

      console.log('save defaultLink')
      console.log(this.pushMessageJDLinkDefault);


      //当前数据是点击编辑过来的，保存时去修改而不是直接添加
      if(this.isEdite){
        var editeObj = this.pushMessageList[this.currentEditeNum];
        editeObj.thresholdLevel = this.thresholdLevel;
        editeObj.color = this.color;
        editeObj.selectAbilityNumber = this.selectAbilityNumber;
        editeObj.partSharp = this.partSharp;
        editeObj.jdLink = this.pushMessageJDLinkList;
        editeObj.defaultLink = this.pushMessageJDLinkDefault;
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
      obj.thresholdLevel = this.thresholdLevel;
      obj.color = this.color;
      obj.selectAbilityNumber = this.selectAbilityNumber;
      obj.partSharp = this.partSharp;
      obj.jdLink = this.pushMessageJDLinkList;
      obj.defaultLink = this.pushMessageJDLinkDefault;
      obj.consumableType = this.consumableType;
      obj.thresholdValue = this.thresholdValue;
      obj.alterTitle = this.alterTitle;
      obj.helpUrlTitle = this.helpUrlTitle;
      obj.iconUrl = this.iconUrl;
      this.pushMessageList.push(obj);

      this.clearInputs();
      //把数据存起来，提交的时候用，同时防止刷新数据消失
      localStorage.setItem('pushMessageArray',JSON.stringify(this.pushMessageList));


      console.log(this.pushMessageList);

    },
    clearInputs:function () {
      // 每次操作后清空input中内容
      this.thresholdLevel = 'thresholdLevel';
      this.color = 'B';
      this.selectAbilityNumber = '';
      this.partSharp = '';
      this.pushMessageJDLinkList = [];
      this.jdLink = '';
      this.pushMessageJDLinkDefault = '';
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
      this.thresholdLevel = item.thresholdLevel;
      this.color = item.color;
      this.selectAbilityNumber = item.selectAbilityNumber;
      this.partSharp = item.partSharp;
      this.pushMessageJDLinkList = item.jdLink;
      this.pushMessageJDLinkDefault = item.defaultLink;
      this.consumableType = item.consumableType;
      this.thresholdValue = item.thresholdValue;
      this.alterTitle = item.alterTitle;
      this.helpUrlTitle = item.helpUrlTitle;
      this.iconUrl = item.iconUrl;
    },
    isInputsEmpty:function(){
      if(this.thresholdLevel == 'thresholdLevel'){
        this.warningStr = 'Please select the thresholdLevel';
        return;
      }
      if (this.color == 'Colors') {
        this.warningStr = 'Please enter the color';
        return;
      }
      if (this.selectAbilityNumber == 'selectAbilityNumber') {
        this.warningStr = 'Please enter the selectAbilityNumber';
        return;
      }
      if (this.partSharp == '') {
        this.warningStr = 'Please enter the partSharp';
        return;
      }
      if (this.pushMessageJDLinkList.length<=0) {
        this.warningStr = 'Please enter the jdLink';
        return;
      }
      // if (this.pushMessageJDLinkDefault == "") {
      //   this.warningStr = '请选择默认jdLink';
      //   return;
      // }
      if (this.consumableType == '') {
        this.warningStr = 'Please enter the consumableType';
        return;
      }
      if (this.thresholdValue == '') {
        this.warningStr = 'Please enter the thresholdValue';
        return;
      }
      if (this.alterTitle == '') {
        this.warningStr = 'Please enter the alterTitle';
        return;
      }
      if (this.helpUrlTitle == '') {
        this.warningStr = 'Please enter the helpUrlTitle';
        return;
      }
      if (this.iconUrl == '') {
        this.warningStr = 'Please enter the iconUrl';
        return;
      }
      //如果都不为空，则允许保存
      this.canBeSave = true;
    },
    addJDLink:function(){
      if(this.jdLink == ''){
        this.showWarining('Please enter JDLink!');
        return;
      }else if(this.pushMessageJDLinkList.indexOf(this.jdLink)<=-1){
        this.pushMessageJDLinkList.push(this.jdLink);
        this.jdLink = '';
      }else if(this.pushMessageJDLinkList.indexOf(this.jdLink)>-1){
        this.showWarining('This JDLink has been added!');
      }

      console.log('defaultLink')
      console.log(this.pushMessageJDLinkDefault);
    },
    deleteJDLink:function(index){
      this.pushMessageJDLinkList.splice(index,1);
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
  .selectA{display: inline-block;width: 30%;height: 34px;border: 1px solid #ccc;border-radius:4px;margin-left: -42%;color: black;line-height: 34px;}
  .selectMenu{margin-left: 35%;}
  .btn-save{margin-left: 70%;background: #2e6daF;color:white;}
  td,th{text-align: center;}
  .selectBox{margin-bottom: 10px;}
  .pushMessageListBreviary{width: 80%;margin-left: 10%;}
  .addJDLink{display: inline-block;width: 20px;height: 20px;background: #2dd;border-radius: 50%;line-height: 20px;text-align: center;color: white;position: absolute;right: -20px;top: 12px;}
  .jdLinkBox{padding: 5px;width:90%;position: relative;}
  .jdLinkList{margin-top: 10px;}
</style>
