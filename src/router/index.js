import Vue from 'vue'
import Router from 'vue-router'
import AddPrinter from '@/components/AddPrinter'
import AddPrinterSimplify from '@/components/AddPrinterSimplify'
import PrinterList from '@/components/PrinterList'
import Updata from '@/components/UpdataPrinter'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: PrinterList
        },{
            path: '/add',
            name: 'add',
            component: AddPrinter,
        },{
            path: '/addSimplify',
            name: 'addSimplify',
            component: AddPrinterSimplify,
        }, {
            path: '/idList',
            name: 'idList',
            component: PrinterList
        }, {
            path: '/updata',
            name: 'updata',
            component: Updata
        }
    ]
})
