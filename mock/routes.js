module.exports={
    "/api":"/",
    "/qrcode/getSku": "/getSku",//获取sku的接口
    "/qrcode/generate":"/generate",//获取二维码
    "/scanQRCode/getSnAndPidByPinterId:printerId":"/scanQRCode",//通过扫描二维码获取相关信息
    "/bindPrinter/bind":"/bind",//进行绑定
    "/bindPrinter/bindInfo":"/bindInfo",//list页面显示所有绑定过的列表
    "/printerJob/submitPrintJob":"/submitPrintJob",//上传文件的接口
    "/printerJob/getPrintJobConfig":"/getPrintJobConfig"//打印设置的接口
}

