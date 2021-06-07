import Vue from 'vue'
import Router from 'vue-router'
const ErrorPage = () => import('@/pages/error-page')

Vue.use(Router)
import tempRouter from './temp.router.js' // 自动化路由 webpack启动后会自动生成
const routes = [
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/',
    redirect: '/home',
  },
  ...tempRouter,
  {
    path: '/404',
    alias: ['/401', '/500'],
    component: ErrorPage,
  },
  // {
	// 	path: '*',
	// 	redirect: '/404'
	// }
]


const router = new Router({
  routes,
  mode: 'history',
})

export default router