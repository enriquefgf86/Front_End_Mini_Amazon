import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LogIn from '../views/LogIn.vue'
import SignUp from '../views/SignUp.vue'
import UserBoard from  '../views/UserBoard.vue'
import UserFinalView from '../views/UserFinalView.vue'
import PurchView from '../views/PurchView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/logIn',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: SignUp
  },
  ,
  {
    path: '/myboard',
    name: 'UserBoard',
    component:UserBoard,
  },
  {
    path: '/myboard/buyerView',
    name: 'UserFinalView',
    component:UserFinalView,
  },
  {
    path:'/myboard/buyerView/purchase/:purchaseSelected',
    name: 'PurchView',
    component:PurchView,
    props:true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
