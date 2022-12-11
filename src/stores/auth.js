import { defineStore } from 'pinia'
import UserService from '../service/UserService'
import axios from 'axios'

export const useAuth = defineStore('auth', {
    state: () => ({
        isAuth: false,
        user: {
            reports: [],
            reportsToFix: []
        }
    }),
    getters: {
        getUserStatus(state) {
            return state.userStatus
        },
        getAuthStatus(state) {
            return state.isAuth
        },

    },
    actions: {
        updateUser(user) {
            try {
                return UserService.updateUser(user)
            } catch (err) {
                return {
                    success: false,
                    message: err.response?.data?.message
                }
            }
        },
        setUserStatus(text) {
            this.userStatus = text
        },
        async registration(email, password) {
            try {
                const response = await UserService.registration(email, password);
                localStorage.setItem('token', response.data.accessToken);

                console.log(response);

                this.isAuth = true
                this.user = response.data.user
                return { success: true };
            } catch (err) {
                return {
                    success: false,
                    message: err.response?.data?.message
                }
            }
        },
        async login(email, password) {
            try {
                const response = await UserService.login(email, password);
                localStorage.setItem('token', response.data.accessToken);

                console.log(response);

                this.isAuth = true;
                this.user = response.data.user
                return { success: true };
            } catch (err) {
                return {
                    success: false,
                    message: err.response?.data?.message
                }
            }
        },
        async checkAuth() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/refresh`, { withCredentials: true })

                localStorage.setItem('token', response.data.accessToken);

                console.log(response);

                this.isAuth = true;
                this.user = response.data.user
            } catch (err) {
                console.log(err);
            }
        },
        async logout() {
            try {
                const response = await UserService.logout();
                localStorage.removeItem('token');

                console.log(response);

                this.isAuth = false;
                this.user = null
            } catch (err) {
                console.log(err);
            }
        },
    },
})