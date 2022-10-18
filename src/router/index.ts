import { useUserStore } from '@/stores/user'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: '/dashboard',
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')   
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard/Dashboard.vue'),
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: 'platform',
                name: '平台管理',
                component: () => import('@/views/Dashboard/Platform/Platform.vue'),
                children: [
                    {
                        path: 'information',
                        name: '平台信息',
                        component: () => import('@/views/Dashboard/Platform/Information.vue'),
                    },
                    {
                        path: 'user',
                        name: '运营方管理',
                        component: () => import('@/views/Dashboard/Platform/User.vue'),
                    },
                ],
            },
            {
                path: 'chain',
                name: '区块链相关',
                component: () => import('@/views/Dashboard/Chain/Chain.vue'),
                children: [
                    {
                        path: 'information',
                        name: '区块链信息',
                        component: () => import('@/views/Dashboard/Chain/Information.vue'),
                    },
                    {
                        path: 'chainnode',
                        name: '管理节点',
                        component: () => import('@/views/Dashboard/Chain/ChainNode.vue'),
                    },
                ],
            },
        ],
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const auth = useAuthStore()
    if (!auth.isAuthenticated && to.name !== 'Login' && to.name != 'Register') {
        next({ name: 'Login' })
    }
    else {
        next()
    }
})

export default router