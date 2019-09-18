import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import routes from './router/index'
import store from './vuex/store'
Vue.use(ElementUI)
Vue.use(VueRouter)

Vue.config.productionTip = false
const router = new VueRouter({
	// mode: 'history',
	routes
})

router.beforeEach((to, from, next) => {
	//console.log("路由跳转");
	if (to.path == '/login') {
		sessionStorage.removeItem('user');
		sessionStorage.removeItem('userCon');
      }
      if(from.path !== '/order/EditingCommodities' && from.path !== '/order/DetailCommodities' && from.path !== '/order/commoditiesIns' && to.path == '/order/allCommodities'){
            localStorage.removeItem("currentPage");
      }
	let user = JSON.parse(sessionStorage.getItem('user'));
	if (!user && to.path != '/login') {
		next({
			path: '/login'
		})
	} else {
		next()
	}
})

/* eslint-disable no-new */
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
