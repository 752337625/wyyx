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
		path: 'musiclist/:id',
		component: ( ) => import( '../components/music-list/music-list' )
	} ]
}, {
	path: '/user',
	component: ( ) => import( '../components/user-center/user-center' )
}, {
	path: '/singer',
	component: ( ) => import( '../components/singer/singer' )
}, {
	path: '/rank',
	component: ( ) => import( '../components/rank/rank' )
}, {
	path: '/seach',
	component: ( ) => import( '../components/m-seach/m-seach' )
} ]
const router = new VueRouter( {
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
} )
export default router
