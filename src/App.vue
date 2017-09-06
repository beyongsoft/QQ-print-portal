<template>
  <div id="app">
     <div class="container-fluid">
    <HeaderDiv></HeaderDiv>
    <router-view></router-view>
    <Warning></Warning>
  </div>
  </div>
</template>

<script>
import HeaderDiv from '@/components/header.vue'
import Warning from '@/components/com/warning.vue'
export default {
  name: 'app',
  components:{
    HeaderDiv,
    Warning

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
  margin-top: 60px;
}
</style>
