import { createWebHistory, createRouter } from "vue-router";
import store from '../store'
const routes = [
    {
        path: '/',
        name: 'Beranda',
        component: () => import('../view/beranda.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/statistics',
        name: 'Statistics',
        component: () => import('../view/statistics.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/warning',
        name: 'Warning',
        component: () => import('../view/warning.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/report',
        name: 'Report',
        component: () => import('../view/report.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/akun',
        name: 'Akun',
        component: () => import('../view/akun.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../view/login.vue')
    }
]

const router = createRouter({
    linkActiveClass: 'active',
    linkExactActiveClass: 'nav',
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const token = store.getters['auth/token']
    if(to.meta.auth && !token) next({name: 'Login'})
    else if(!to.meta.auth && token) next({name: 'Beranda'})
    else next()
})

export default router