import { createMemoryHistory, createRouter } from 'vue-router'

import Head from './App.vue'
import SignIn from './components/SignIn.vue'

const routes = [
  { path: '/SignIn', component: SignIn },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router