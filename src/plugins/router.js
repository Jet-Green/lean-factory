import { createRouter, createWebHistory } from 'vue-router'
import Instruction from '../views/Instruction.vue'
import Admin from '../views/Admin.vue'
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

                if (!companyStore.company) {
                    return { name: 'Instruction' }
                }
            }
        },
        {
            path: '/problem-page',
            name: 'ProblemPage',
            component: () => import('../views/ProblemPage.vue'),
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
            component: Admin,
            beforeEnter: async (to, from) => {
                const userStore = useAuth()
                const companyStore = useCompany()
                if (userStore.isAuth && userStore.user.email) {
                    await userStore.checkAuth()
                }

                await companyStore.fecthEmpls()

                if (
                    !companyStore.employee?.roles.includes('admin')
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

router.beforeResolve(async function (to, from, next) {
    const companyStore = useCompany()
    const userStore = useAuth()

    if (userStore.user.company > '-1') {
        await companyStore.getCompany(userStore.user.company)
        next()
    } else {
        next()
    }
})

export default router
