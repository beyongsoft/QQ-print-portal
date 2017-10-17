<template>
    <div class="row search">
    <div class="col-lg-4 col-md-4 col-xs-4">
        <div class="input-group">
            <div class="input-group-btn">
                <select v-model="selected" class="btn btn-default dropdown-toggle" style="height: 34px;">
                    <option v-for="(opt,index) in option" :value="opt" :key="index">
                        {{opt}}
                    </option>
                </select>
            </div>
            <input type="text" class="form-control" aria-label="..." v-model="message">
        </div>
    </div>
        <div class="col-md-8 col-xs-8">
            <button type="button" class="btn btn-primary" style="float:left;" @click="search">SEARCH</button>
            <Exporting :param="param"></Exporting>
        </div>
    </div>
</template>
<script>
    import Exporting from "./export"
    export default{
        name:"search",
        components:{
            Exporting
        },
        props:{
            param: { // 参数内容
                type: Object,
                default: function() {
                    return {}
                }
            }
        },
        data(){
            return{
                option:{
                    1:"emailId",
                    2:"sku",
                    3:"model",
                    4:"sn",
                    5:"pid"
                },
                selected: 'emailId',
                message:'',
            }
        },
        methods:{
            search:function () {//获取搜索参数并传向父组件
                var vm = this;
                var value = vm.message
                var key = vm.selected
                var str=""
                vm.param[key]=value
                vm.$emit("change-param",vm.param)

            }
        }
    }

</script>
<style>
.search{
    padding-top:10px;
    margin-left: 0px;
}
</style>
