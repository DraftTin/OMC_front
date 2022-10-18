import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: null,
        authenticated: false
    }),
    getters: {
        isAuthenticated(): boolean {
            return this.authenticated
        }
    },
    actions: {
        login() {
            this.authenticated = true
        },
        logout() {
            this.authenticated = false
        }
    }
})