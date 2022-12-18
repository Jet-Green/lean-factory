import { createRouter, createWebHistory } from 'vue-router'
import Instruction from '../views/Instruction.vue'
import { useAuth } from "../stores/auth"

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
            beforeEnter: async (to, from) => {
                const userStore = useAuth()
                if (!userStore.isAuth)
                    await userStore.checkAuth()
                if (
                    !userStore.isAuth &&
                    to.name == 'Cabinet'
                ) {
                    return { name: 'Login' }
                }
            }
        },
        {
            path: '/admin',
            name: 'Admin',
            component: () => import('../views/Admin.vue'),
            beforeEnter: async (to, from) => {
                const userStore = useAuth()
                if (!userStore.isAuth)
                    await userStore.checkAuth()
                if (
                    !userStore.user.roles.includes('admin') &&
                    to.name == 'Admin'
                ) {
                    return { name: 'Instruction' }
                }
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/Login.vue'),
        },
        {
            path: '/registration',
            name: 'Registration',
            component: () => import('../views/Registration.vue'),
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            }
        }
    },

})

export default router
