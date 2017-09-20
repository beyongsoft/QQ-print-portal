<template>
    <button type="button" class="btn btn-info right" @click="downExcel">EXPORT</button>
</template>
<script>
    export default{
        name:"exporting",
        props:{
            param:{
                type:Object
            }

        },
        methods:{
            downExcel(){
               var url=this.$api.url("bindPrinter/excelExport?data="+new Date())
                for(var i in this.param){
                    if(this.param[key]!=""){
                        var key = i;
                        var para = this.param[key]
                        var list ="&"+i+"="+para
                        url+=list
                    }
                }
             this.postDownLoadFile({url:url,method:"post"})
            },
            postDownLoadFile:function (options) {
                var config = $.extend(true, { method: 'post' }, options);
                var $iframe = $('<iframe id="down-file-iframe" />');
                var $form = $('<form target="down-file-iframe" method="' + config.method + '" />');
                $form.attr('action', config.url);
                for (var key in config.data) {
                    $form.append('<input type="hidden" name="' + key + '" value="' + config.data[key] + '" />');
                }
                $iframe.append($form);
                $(document.body).append($iframe);
                $form[0].submit();
                $iframe.remove();
            }
        }
    }
</script>
<style>
    .right{
        position: absolute;
        right: 10%;
    }
</style>
