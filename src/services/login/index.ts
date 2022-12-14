import { http } from '@/services'
import sha256 from 'crypto-js/sha256'

export const service = {
	login: (form: any) => {
		return http.post('/user/login', {
			username: form.username,
			password: sha256(form.password).toString(),
		})
	},
	logout: () => {
		return http.get('/user/logout')
	},
}
