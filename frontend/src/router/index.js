import { createMemoryHistory, createRouter } from 'vue-router'

import BooksView from '../views/BooksView.vue'

const routes = [
    {
        path: '/',
        name: 'livros',
        component: BooksView,
    },
    {
        path: '/autores',
        name: 'autores',
        component: () => import('../views/AutoresView.vue'),
    },
    {
        path: '/categorias',
        name: 'categorias',
        component: () => import('../views/CategoriasView.vue'),
    },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router