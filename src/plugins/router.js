import { createRouter, createWebHistory } from 'vue-router'
import Instruction from '../views/Instruction.vue'
import { useAuth } from "../stores/auth"
import { useCompany } from '../stores/company'

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
            beforeEnter: async (to, from) => {
                const userStore = useAuth()
                const companyStore = useCompany()
                await userStore.checkAuth()
                await companyStore.getCompany(userStore.user.company)

                if (!companyStore.company) {
                    return { name: 'Instruction' }
                }
            }
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

router.beforeEach(async function () {
    const companyStore = useCompany()
    const userStore = useAuth()
    if (userStore.user.company)
        companyStore.getCompany(userStore.user.company)
})

export default router
