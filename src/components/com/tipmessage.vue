<template>
  <div class="alert alert-success tip-message" v-if="tipState">
    <strong>{{tipContent}}</strong>
</div>
</template>
<script>
export default {
  name:'tipMess',
  data(){
    return{
    }
  },
  computed:{
    tipContent(){
      return this.$store.state.tipContent
    },
    tipState(){
      return this.$store.state.tipState
    }
  },
  updated(){
        const vm = this
        setTimeout(function() {//每次按下之后，将按钮禁用5秒
        vm.$store.state.tipState = false
        },3*1000)
  }
}
</script>
<style lang="less" scoped>
  .tip-message{
    position: absolute;
    right: 50%;
    bottom: 50%;
    width: 30%;
    margin-right: -15%;
    margin-bottom: -15%;
  }
</style>
