import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user',
	state: () => ({
		user: null,
		collapse: false,
	}),
	getters: {
		getCollapse(): boolean {
			return this.collapse
		},
    getUser(): any {
      return this.user
    }
	},
	actions: {
		setCollapse(collapse: boolean) {
			this.collapse = collapse
		},
		setUser(user: any) {
			this.user = user
		},
	},
})