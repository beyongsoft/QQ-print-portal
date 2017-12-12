<template>
  <fieldset>
    <h3>Basic</h3>
<!--     <div class="form-group" :class="{'has-error':isclick}">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" >PrinterEmailId</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="username" type="text" placeholder="PrinterEmailId" v-model="PrintEmailId" @blur="validator" required/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" ></span>CloudId</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="deviceId" type="text" placeholder="CloudId" v-model="deviceId" />
      </div>
    </div> -->
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" ></span>Product</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="Product" type="text" placeholder="Product"  name="product" v-on:input="oninput('product',product)" v-model="product"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" ></span>ProductName</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="ProductName" type="text" placeholder="ProductName" name="productName" v-on:input="oninput('productName',productName)" v-model="productName"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" ></span>ModelName</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="ModelName" type="text" placeholder="ModelName"  name="modelName" v-on:input="oninput('modelName',modelName)" v-model="modelName"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" ></span>SKU</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="SKU" type="text" placeholder="SKU" name="sku" v-on:input="oninput('sku',sku)" v-model="sku"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" ></span>Go-live date</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="goliveDate" type="date" placeholder="Go-live date"  name="goLiveDate" v-on:input="oninput('goLiveDate',goLiveDate)" v-model="goLiveDate"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" ></span>JD link (Home page)</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="JDLinks" type="text" placeholder="JD link (Home page)"  name="jdLinkHomePage" v-on:input="oninput('jdLinkHomePage',jdLinkHomePage)" v-model="jdLinkHomePage"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" ></span>FAQ link (Home page)</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="FAQ" type="text" placeholder="FAQ link (Home page)" name="faqLinHomePage" v-on:input="oninput('faqLinHomePage',faqLinHomePage)" v-model="faqLinHomePage"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" ></span>PC prompt A link</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="PCPromptALink" type="text" placeholder="PC prompt A link"  name="pcPromptALink" v-on:input="oninput('pcPromptALink',pcPromptALink)" v-model="pcPromptALink"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" ></span>PC prompt B link</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="PCPromptBLink" type="text" placeholder="PC prompt B link"  name="pcPromptBLink" v-on:input="oninput('pcPromptBLink',pcPromptBLink)" v-model="pcPromptBLink"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left"></span>Printer Icon</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="PrinterIcon" type="file" name="printerIconFile" v-on:change="fileChange()" />
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
      product:'',
      productName:'',
      modelName:'',
      sku:'',
      goLiveDate:'',
      jdLinkHomePage:'',
      faqLinHomePage:'',
      faqLinHomePage:'',
      pcPromptALink:'',
      pcPromptBLink:'',
      printerIconFile:"",
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
    oninput:function (key,value) {
      this.$store.state.addPrinterObj[key] = value;
      console.log(this.$store.state.addPrinterObj)
    },
    fileChange:function () {
      
    },
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
</style>
