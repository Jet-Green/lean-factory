import { createRouter, createWebHistory } from 'vue-router'
// import Landing from '../views/Landing.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // {
        //     path: '/',
        //     name: 'Landing',
        //     component: Landing
        // },

    ],
    scrollBehavior(to, from, savedPosition) {
        // if ((to.name == 'RecipePage'))
        //     return { top: 0 }
        return savedPosition;
    }
})

export default router
