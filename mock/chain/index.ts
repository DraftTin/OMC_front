import type { MockMethod } from 'vite-plugin-mock'

export default [
	{
		url: '/chain/chainstatus',
		method: 'get',
		statusCode: 200,
		response: () => {
			return [
				{
					id: 1,
					nodeName: 'node1',
					nodeType: 'Orderer',
					ip: '192.168.8.1',
					createTime: '2022-10-27T16:00:00.000+00:00',
					creator: 'user1'
				},
			]
		},
	},
] as MockMethod[]
