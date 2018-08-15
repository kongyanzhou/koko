import Vue from 'vue';
import App from './App';
import iView from 'iview';
import router from 'assets/js/router.js';
import store from 'assets/js/store';
import 'iview/dist/styles/iview.css';

Vue.use(iView);

window.Vue = Vue;

new Vue({
  router: router.router,
  store:store,
  mounted () {
    // this.currentPageName = this.$route.name;
    // // 显示打开的页面的列表
    // this.$store.commit('setOpenedList');
    // this.$store.commit('initCachepage');
    // // 权限菜单过滤相关
    // this.$store.commit('updateMenulist');
  
},
  created () {
    let tagsList = [];
    router.appRouter.map((item) => {
        if (item.children.length <= 1) {
            tagsList.push(item.children[0]);
        } else {
            tagsList.push(...item.children);
        }
    });
    this.$store.commit('setTagsList', tagsList);
  },
  render: h => h(App)
}).$mount('#app')
