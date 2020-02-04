import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/pages/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/:type/:Mid',
        name: 'detail',
        component: () => import('../views/pages/Detail.vue')
    },
    {
        path: '/genre/:Gname',
        name: 'movielist',
        component: () => import('../views/pages/MovieList.vue')
    },
    {
        path: '/actor/:Aid',
        name: 'actordetail',
        component: () => import('../views/pages/ActorDetail.vue')
    },
    {
        path: '/user',
        name: 'user',
        component: () => import('../views/pages/User.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
