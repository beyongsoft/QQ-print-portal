import Vue from 'vue'
import Router from 'vue-router'
import AddPrinter from '@/components/AddPrinter'
import PrinterList from '@/components/PrinterList'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: PrinterList
        },{
            path: '/add',
            name: 'add',
            component: AddPrinter,
        }, {
            path: '/idList',
            name: 'idList',
            component: PrinterList
        }
    ]
})
