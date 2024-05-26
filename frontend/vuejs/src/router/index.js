import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditProfile from '../views/EditProfile.vue'
import Signin from '../views/signin.vue'
import Signup from '../views/signup.vue'
import MainPage from '../views/mainpage.vue' 
import History from '../views/history.vue'
import SetGoal from '../views/setgoal.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/editprofile',
      name: 'editprofile',
      component: EditProfile
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup', 
      name: 'signup',
      component: Signup
    },
    {
      path: '/mainpage',
      name: 'mainpage',
      component: MainPage
    },
    {
      path: '/history',
      name: 'history',
      component: History
    },
    {
      path: '/setgoal',
      name: 'setgoal',
      component: SetGoal
    },

    
  ]
})

export default router
