import { createRouter, createWebHashHistory } from 'vue-router';
//加载组件
import Index from '../views/index/index.vue'
import Item from '../views/item/index.vue'
import Itemlist from '../views/item/list.vue'
import itemDetail from '../views/item/detail.vue'
import spellList from '../views/spell/spellList.vue'
import spellDetail from '../views/spell/spellDetail.vue'

//配置路由信息
const routes = [
    { path: '/',name:'Index', component: Index },
    { path: '/item', name: 'Item', component: Item },
    { path: '/itemList', name: 'ItemList', component: Itemlist },
    { path: '/itemDetail', name: 'ItemDetail', component: itemDetail },
    { path: '/spellList', name: 'SpellList', component: spellList },
    { path: '/spellDetail', name: 'SpellDetail', component: spellDetail },

    
]

//创建一个路由器，采用hash模式npm 
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router