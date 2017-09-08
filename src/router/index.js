import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Setting from '@/pages/Setting'
import Search from '@/pages/Search'
import SearchResult from '@/pages/SearchResult'
import Player from '@/pages/Player'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/About',
      name: 'About',
      component: About
    },
    {
      path: '/Setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    },
    {
      path: '/SearchResult',
      name: 'SearchResult',
      component: SearchResult
    },
    {
      path: '/Player',
      name: 'Player',
      component: Player
    }
  ]
})
