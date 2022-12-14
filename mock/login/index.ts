import type { MockMethod } from 'vite-plugin-mock'

export default [
	{
		url: '/user/login',
		method: 'post',
		statusCode: 200,
		response: () => {
			return {
				username: '宁玉恒',
				imageURL: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
			}
		},
	},
] as MockMethod[]
