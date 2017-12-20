<template>
  <fieldset>
    <h3>Basic</h3>
    <div class="form-group">
      <label class="col-sm-3 col-md-3 col-xs-3 control-label text-right" ></span>Product</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="Product" type="text" placeholder="Product"  name="product" v-model="product"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 col-md-3 col-xs-3 control-label text-right" ></span>ProductName</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="ProductName" type="text" placeholder="ProductName" name="productName" v-model="productName"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 col-md-3 col-xs-3 control-label text-right" ></span>ModelName</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="ModelName" type="text" placeholder="ModelName"  name="modelName" v-model="modelName"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 col-md-3 col-xs-3 control-label text-right" ></span>SKU</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="SKU" type="text" placeholder="SKU" name="sku" v-model="sku"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 col-md-3 col-xs-3 control-label text-right" ></span>Go-live date</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="goliveDate" type="date" placeholder="Go-live date"  name="goLiveDate" v-model="goLiveDate"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 col-md-3 col-xs-3 control-label text-right" ></span>JD link (Home page)</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="JDLinks" type="text" placeholder="JD link (Home page)"  name="jdLinkHomePage" v-model="jdLinkHomePage"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 col-md-3 col-xs-3 control-label text-right" ></span>FAQ link (Home page)</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="FAQ" type="text" placeholder="FAQ link (Home page)" name="faqLinHomePage" v-model="faqLinHomePage"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 col-md-3 col-xs-3 control-label text-right" ></span>PC prompt A link</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="PCPromptALink" type="text" placeholder="PC prompt A link"  name="pcPromptALink" v-model="pcPromptALink"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 col-md-3 col-xs-3 control-label text-right" ></span>PC prompt B link</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="PCPromptBLink" type="text" placeholder="PC prompt B link"  name="pcPromptBLink" v-model="pcPromptBLink"/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 col-md-3 col-xs-3 control-label text-right"></span>Printer Icon</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <input class="form-control" id="PrinterIcon" type="file" name="printerIconFile" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 col-md-3 col-xs-3 control-label text-right"></span>Printer Description</label>
      <div class="col-sm-8 col-xs-8 col-md-8">
        <textarea class="form-control" rows="4" style="resize: none" id="PrinterDescription" placeholder="Printer Description"  name="printerDescription" v-model="printerDescription"></textarea>
      </div>
    </div>
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
      pcPromptALink:'',
      pcPromptBLink:'',
      printerIconFile:"",
      printerDescription:"",

      selected: 'F5S46B',
      options: [],
      btnState: false,
      PrintEmailId: '',
      deviceId:'',
      isclick:false
    }
  },
  props: ['msg'],
  beforeCreate() {
  },
  mounted() {
    if(localStorage.getItem('updataPrinterMessage')){
      var obj = JSON.parse(localStorage.getItem('updataPrinterMessage'));
      this.product = obj.product;
      this.productName = obj.productName;
      this.modelName = obj.modelName;
      this.sku = obj.sku;
      this.goLiveDate = obj.goLiveDate;
      this.jdLinkHomePage = obj.jdLinkHomePage;
      this.faqLinHomePage = obj.faqLinHomePage;
      this.pcPromptALink = obj.pcPromptALink;
      this.pcPromptBLink = obj.pcPromptBLink;
      this.printerIconFile = obj.printerIcon;
    }
  },
  methods: {
    oninput:function (key,value) {
      var obj = {};
      if(localStorage.getItem('addPrinterObj')){
        obj = JSON.parse(localStorage.getItem('addPrinterObj'));
      }else{
      }
      obj[key] = value;
      localStorage.setItem('addPrinterObj',JSON.stringify(obj));

      console.log('localStorage*****'+localStorage.getItem('addPrinterObj'));
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
