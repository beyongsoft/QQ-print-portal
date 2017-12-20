<!--头部-->
<template>
  <div class="header row">
     <ul class="header-nav col-md-offset-3 col-xs-offset-2 col-sm-offset-2 col-md-5 col-xs-7 col-sm-7">
       <router-link to="/add" tag="li" class="addProduct">add printer</router-link>
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
.header-nav{
  margin-top:2%;
}
   li{
      list-style: none;
      font-size: 1rem;
       float: right;
       text-align: center;
    }
    li:hover{
      cursor: pointer;
      color: red;
    }
}

.addProduct{width: 100px;height: 35px;background: #2e6da4;border-radius: 4px;line-height: 35px;text-align: center;color: white;}
</style>


