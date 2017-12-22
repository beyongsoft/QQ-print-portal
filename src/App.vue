<template>
  <div id="app">
     <div class="container-fluid">
    <!-- <HeaderDiv></HeaderDiv> -->
    <router-view></router-view>
    <Warning></Warning>
    <Tip></Tip>
  </div>
  </div>
</template>

<script>
// import HeaderDiv from '@/components/header.vue'
import Warning from '@/components/com/warning.vue'
import Tip from '@/components/com/tipmessage.vue'

export default {
  name: 'app',
  components:{
    // HeaderDiv,
    Warning,
    Tip

  },mounted(){
    var self = this;
    $('input').on('focus',function(){
      self.$store.state.warningState = false
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
.container-fluid{
  width: 90%;
}
</style>
