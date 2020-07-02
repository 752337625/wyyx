import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible/index'
import './assets/less/index.less'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
Vue.use( VueLazyload, {
	loading: require( '@/assets/images/default.png' ),
	error: require( '@/assets/images/default.png' )
} )
fastclick.attach(document.body)
Vue.config.productionTip = false
new Vue( {
	router,
	store,
	render: h => h( App )
} ).$mount( '#app' )
