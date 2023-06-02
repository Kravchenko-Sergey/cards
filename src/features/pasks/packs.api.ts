import { instance } from 'common/api/common.api'

export const packsApi = {
	getPacks() {
		return instance.get('cards/pack')
	},
	createPack(data: any) {
		return instance.post('cards/pack', data)
	},
	deletePack(id: string) {
		return instance.delete(`cards/pack/?id=${id}`)
	},
	updatePackName(data: any) {
		return instance.put('cards/pack', data)
	}
}

export type GetPacksResType = {}
