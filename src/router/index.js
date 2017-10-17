import Vue from 'vue'
import Router from 'vue-router'
import qRcode from '@/components/qRcode'
import Binding from '@/components/Binding'
import EmailIdList from '@/components/EmailIdList'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: Binding
        },
        {
            path: '/qRcode/',
            name: 'qRcode',
            component: qRcode,
        }, {
            path: '/bind',
            name: 'bind',
            component: Binding,
        }, {
            path: '/idList',
            name: 'idList',
            component: EmailIdList
        }
    ]
})
