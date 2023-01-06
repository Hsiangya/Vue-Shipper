import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/views/LoginView")
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import("@/views/RegisterView")
    },
    {
        path: '/front',
        name: 'Front',
        component: () => import("@/views/FrontView"),
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import("@/views/HomeView")
            },
            {
                path: '/basic',
                name: 'Basic',
                component: () => import("@/views/account/BasicView")
            },
            {
                path: '/auth',
                name: 'Auth',
                component: () => import("@/views/account/AuthView")
            },
            {
                path: '/ship/publish',
                name: 'ShipPublish',
                component: () => import("@/views/ship/PublishView")
            },
            {
                path: '/ship/admin',
                name: 'ShipAdmin',
                component: () => import("@/views/ship/Admin")
            },
        ]
    },
    {
        path: '',
        redirect:{name:"Home"},
    },
    //
    {
        path: '/:path(.*)',
        redirect:{name:"Home"},
        component: () => import("../views/NotFoundView")
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 导航守卫
router.beforeEach((to, form, next) => {
    let token = localStorage.getItem("token");
    // to: 即将访问的路由对象
    // from：当前正在离开的路由对象
    // next()：继续向后执行，跳转到to路由对象中
    // next(false) 不跳转，还在当前页面。
    // next("/xxx")  next({name:"xxx"})  next({path:"/xxx"})
    if (token) {
        // 已登录
        next();
        return;
    }
    if (to.name === "Login" || to.name === "Register") {
        // 注册或登录界面可以直接访问
        next();
        return;
    }
    // 未登录，访问Login路由
    next({name: "Login"})
})

export default router
