import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import Recommend from './recommend'
Vue.use( Vuex )
export default new Vuex.Store( {
	state: {},
	mutations: {},
	actions: {},
	getters: {},
	modules: {
		Recommend
	}
} )
