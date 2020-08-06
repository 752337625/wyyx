import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible/index'
import './assets/less/index.less'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
Vue.use( VueLazyload, {
	attempt: 5,
	loading: require( '@/assets/images/default.png' ),
	error: require( '@/assets/images/default.png' )
} )
fastclick.attach(document.body)
Vue.config.productionTip = false
process.env.NODE_ENV == 'development' ? window.store = store : ''
process.env.NODE_ENV == 'development' ? window.router = router : '',
new Vue( {
	router,
	store,
	render: h => h( App )
} ).$mount( '#app' )
