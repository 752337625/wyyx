import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use( VueRouter )
const routes = [ {
	path: '/',
	redirect: '/recommend'
}, {
	path: '/recommend',
	name: 'Recommend',
	component: ( ) => import( '../components/m-recommend/m-recommend' ),
	children: [ {
		path: ':id',
		component: ( ) => import( '../components/music-list/music-list' )
	} ]
}, {
	path: '/user',
	component: ( ) => import( '../components/user-center/user-center' )
} ]
const router = new VueRouter( {
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
} )
export default router
