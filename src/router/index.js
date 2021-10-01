import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Beginning from '@/components/Beginning'
import FormBeginning from '@/components/FormBeginning'
import GameBowling from '@/components/GameBowling'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Beginning',
      name: 'Beginning',
      component: Beginning
    },
    {
      path: '/FormBeginning',
      name: 'FormBeginning',
      component: FormBeginning
    },
    {
      path: '/GameBowling',
      name: 'GameBowling',
      component: GameBowling
    }
  ]
})
