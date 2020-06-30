import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
  const routes = [
		{
		  path: '/',
		  redirect: '/recommend'
		},
		{
		  path: '/recommend',
			name: 'Recommend',
		  component:() => import('../components/m-recommend/m-recommend'),
		  children: []
		},
]

const router = new VueRouter({
  routes
})

export default router