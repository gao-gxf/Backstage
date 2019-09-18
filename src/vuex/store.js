import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
	collapsed: false, //左侧导航折叠状态
	defaultActiveIndex: '/', //当前激活的菜单
	topNavState: 'home',
      leftNavState: '首页',
      leftNavLevel:[],
	role: {
		admin: '超级管理员',
		ceshi: '普通会员'
	},
	userInfo: {}
}

export default new Vuex.Store({
	state
})
