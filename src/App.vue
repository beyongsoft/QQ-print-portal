<template>
  <div id="app">
     <div class="container-fluid">
    <HeaderDiv></HeaderDiv>
    <router-view></router-view>
  </div>
  </div>
</template>

<script>
import HeaderDiv from '@/components/header.vue'
export default {
  name: 'app',
  components:{
    HeaderDiv
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
