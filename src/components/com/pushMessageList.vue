<!--头部-->
<template>
    <div class="col-md-12 pushMessageList">
      <table class="table table-hover table-striped table-striped table-bordered" id="">
        <thead>
          <tr>
            <th class="text-center">商品名称</th>
            <th>商品毛重</th>
            <th>商品产地</th>
            <th>多功能</th>
            <th>网络打印</th>
            <th>类型</th>
            <th>幅面</th>
            <th>用途</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>惠普3630</td>
            <td>5.1kg</td>
            <td>中国大陆</td>
            <td>打印/复印/扫描</td>
            <td>无线网络打印，移动APP打印，无线直连，云打印</td>
            <td>喷墨</td>
            <td>A4</td>
            <td>家用照片，居家办公</td>
          </tr>
        </tbody>
      </table>
       <div><router-link to="/add" tag="li" class="addProduct">查看已添加推送信息</router-link></div>
    </div>
</template>
<script>
export default {
  name: 'pushMessageList'
}

</script>
<style lang="less" scoped>
.pushMessageList{margin: 50px auto;}
table{width: 100%;}
</style>
