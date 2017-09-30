<!--头部-->
<template>
  <div class="header row">
     <div class="logo col-md-3 col-xs-3 col-sm-3"><img src="../assets/images/logo.png" style="width:100%;height:100%;"/></div>
     <ul class="header-nav col-md-offset-3 col-xs-offset-2 col-sm-offset-2 col-md-5 col-xs-7 col-sm-7">
       <router-link to="/bind" class="col-md-3 col-xs-3 col-sm-3" tag="li">Binding</router-link>
       <router-link to="/idList" class="col-md-5 col-xs-5 col-sm-5" tag="li">printerEmailId List</router-link>
       <router-link to="/qRcode"  class="col-md-3 col-xs-3 col-sm-3" tag="li">Print</router-link>
     </ul>
  </div>
</template>
<script>
export default {
  name:'header'
}
</script>
<style lang="less" scoped>
.header{
  margin-top:-60px;
.header-nav{
  margin-top:2%;
}
   li{
      list-style: none;
      font-size: 1rem;
       padding-left:1rem;

    }
    li:hover{
      cursor: pointer;
      color: #fff;
    }
}


</style>


