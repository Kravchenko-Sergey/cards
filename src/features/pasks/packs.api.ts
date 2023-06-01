import { instance } from '../../common/api/common.api'

export const packsApi = {
	getPacks() {
		return instance.get('cards/pack')
	}
}

export type GetPacksResType = {}
