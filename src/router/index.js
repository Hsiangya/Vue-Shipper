import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import("../views/LoginView")
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import("../views/RegisterView")
    },
    {
        path: '/front',
        name: 'Front',
        component: () => import("../views/FrontView"),
        children:[
            {
                path: '/basic',
                name: 'Basic',
                component: () => import("../views/BasicView")
            },
            {
                path: '/auth',
                name: 'Auth',
                component: () => import("../views/AuthView")
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
