import { createRouter, createWebHistory } from 'vue-router'
import Camera from '../views/Camera.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Camera',
            component: Camera
            // () => import('../views/Camera.vue'),
        },

    ],
    scrollBehavior(to, from, savedPosition) {
        // if ((to.name == 'RecipePage'))
        //     return { top: 0 }
        return savedPosition;
    }
})

export default router
