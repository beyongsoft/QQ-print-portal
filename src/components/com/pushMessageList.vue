<!--头部-->
<template>
  <div class="col-md-12 pushMessageList">
    <table class="table table-hover table-striped table-bordered">
      <thead>
        <tr>
          <th>color</th>
          <th>selectability number</th>
          <th>threshold level</th>
          <th>part#</th>
          <th>JD link</th>
          <th>consumable type</th>
          <th>threshold value</th>
          <th>alter title</th>
          <th>help_url title</th>
          <th>icon URL</th>
        </tr>
      </thead>
      <tbody id="pushMessageListContent">
        <tr>
          <td>惠普3630</td>
          <td>5.1kg</td>
          <td>中国大陆</td>
          <td>打印/复印/扫描</td>
          <td>http://www.baidu.com</td>
          <td>喷墨</td>
          <td>A4</td>
          <td>家用照片，居家办公</td>
          <td>哈哈哈</td>
          <td>http://www.baidu.com</td>
        </tr>
      </tbody>
    </table>
    <div>
      <router-link to="/add" tag="li" class="addProduct"><button class="btn btn-save">继续添加</button></router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'pushMessageList'
}

</script>
<style lang="less" scoped>
.pushMessageList {
  margin: 50px auto;
}

table {
  width: 100%;
}
th{text-align: center;font-size: 12px;}
.btn-save{float: right;background: #2e6daF;color:white;}

</style>
