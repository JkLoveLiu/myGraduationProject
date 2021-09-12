import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import homeIndex from '../views/childViews/homeIndex'
import goods from '../views/childViews/goods'
import manager from '../views/childViews/manager'
import order from "@/views/childViews/order";
import user from "@/views/childViews/user";
import updatepwd from "@/views/childViews/updatepwd";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        children: [
            {
                path: 'homeIndex',
                name: 'homeIndex',
                component: homeIndex
            },{
                path: 'goods',
                name: 'goods',
                component: goods
            },{
                path: 'manager',
                name: 'manager',
                component: manager
            },{
                path: 'order',
                name: 'order',
                component: order
            },{
                path: 'user',
                name: 'user',
                component: user
            },{
                path: 'updatepwd',
                name: 'updatepwd',
                component: updatepwd
            }

        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
