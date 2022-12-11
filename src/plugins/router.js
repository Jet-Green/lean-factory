import { createRouter, createWebHistory } from 'vue-router'
import Instruction from '../views/Instruction.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Instruction',
            component: Instruction
            // () => import('../views/Camera.vue'),
        },
        {
            path: '/problem',
            name: 'Problem',
            component: () => import('../views/Problem.vue'),
        },
        {
            path: '/cabinet',
            name: 'Cabinet',
            component: () => import('../views/Cabinet.vue'),
        },
        {
            path: '/admin',
            name: 'Admin',
            component: () => import('../views/Admin.vue'),
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            }
        }
    }
})

export default router
