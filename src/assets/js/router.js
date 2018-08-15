import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import Util from 'assets/js/util';
import main from "components/admin/main/main"; // 主页
Vue.use(VueRouter);

// 登录页面路由
export const loginRouter = {
    path: '/login',
    name: "login",
    component: () => import('components/admin/login/login')
}

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: main,
    children: [
        { path: 'home', title: "首页", name: 'home_index', component: () => import('components/admin/home/home') },
        { path: 'personal', title: '个人中心', name: 'personal_index', component: () => import('components/admin/personal/personal') },
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
const appRouter = [
    {
        path: '/home',
        icon: 'md-home',
        name: 'home',
        title: '首页',
        component: main,
        children: [
            { path: '/', title: '首页', name: 'home_index', component: () => import('components/admin/home/home') },
        ]
    },
    {
        path: '/user',
        icon: 'md-person',
        name: 'user',
        title: '用户管理',
        component: main,
        children: [
            { path: 'list', title: '用户管理', name: 'user_list', component: () => import('components/admin/user/user_list') },
        ]
    },
    {
        path: '/api',
        icon: 'logo-buffer',
        name: 'api',
        title: '接口管理',
        component: main,
        children: [
            { path: 'list', title: '接口管理', name: 'api_list', component: () => import('components/admin/api/api_list') },
        ]
    },
    {
        path: '/system',
        icon: 'md-settings',
        name: 'system',
        title: '系统管理',
        component: main,
        children: [
            { path: 'menu', icon: 'md-menu', title: '菜单管理', name: 'system_menu', component: () => import('components/admin/system/system_menu') },
            { path: 'role', icon: 'logo-octocat', title: '角色管理', name: 'system_role', component: () => import('components/admin/system/system_role') },
            { path: 'user', icon: 'md-person', title: '用户管理', name: 'system_user', component: () => import('components/admin/system/system_user') },
        ]
    },
];

// 实例化路由
const router = new VueRouter({
    routes: [loginRouter, otherRouter, ...appRouter]
});

export default {
    router,
    otherRouter,
    appRouter,
};

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();

    if (!Cookies.get('api_username') && to.name !== 'login') {
        next({
            name: 'login'
        });
    } else if (Cookies.get('api_username') && to.name === 'login') {
        next({
            name: 'home_index'
        });
    } else {
        Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next);
    }
});

router.afterEach((to) => {
    Util.openNewPage(router.app, to.name, to.params, to.query);
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});