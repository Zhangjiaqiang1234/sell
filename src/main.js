// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Goods from './components/goods/goods';
import Ratings from './components/ratings/ratings';
import Seller from './components/seller/seller';
import PublicJs from './common/js/public.js';

Vue.config.productionTip = false;

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);
// 使用 vue-resource
Vue.use(VueResource);
// 导入全局方法
Vue.use(PublicJs);

// 定义路由关系
const routes = [
    {
        path: '/goods',
        component: Goods
    },
    {
        path: '/ratings',
        component: Ratings
    },
    {
        path: '/seller',
        component: Seller
    },
    // 重定向
    {
        path: '/',
        redirect: 'goods'
    }
];

const router = new VueRouter({
    linkActiveClass: 'active',
    routes // routes: routes 的简写
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App}
});
