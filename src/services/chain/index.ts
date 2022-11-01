import { http } from '@/services'
import sha256 from 'crypto-js/sha256'
import { NodeStatus } from '@/types'

export const chain_service = {
    get_chainstatus: () => {
        return http.get('/chain/chainstatus')
    }
}
