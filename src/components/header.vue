<!--头部-->
<template>
  <div class="header row">
     <div class="logo col-md-3 col-xs-3 col-sm-3"><img src="../assets/images/logo.png" style="width:100%;height:100%;"/></div>
     <ul class="header-nav col-md-offset-4 col-offset-xs-4 col-sm-offset-4 col-md-4 col-xs-4 col-sm-4">
       <router-link to="/bind" tag="li">Binding</router-link>
       <router-link to="/idList" tag="li">printerEmailId List</router-link>
       <router-link to="/qRcode" tag="li">Print</router-link>
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
      float: left;
      padding: 4%;
      font-size: 18px;

    }
    li:hover{
      cursor: pointer;
      color: #fff;
    }
}


</style>


