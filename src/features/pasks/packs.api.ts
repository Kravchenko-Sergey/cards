import { instance } from 'common/api/common.api'
import {
	ArgsCreatePacksType,
	ArgsDeletePacksType,
	ArgsGetPacksType,
	ArgsUpdatePacksType,
	CreatePackResponseType,
	DeletePackResponseType,
	GetPacksResponseType,
	UpdatePackResponseType
} from './packs.api.types'

export const packsApi = {
	getPacks(data: ArgsGetPacksType) {
		return instance.get<GetPacksResponseType>('cards/pack', {
			data
		})
	},
	createPack(data: ArgsCreatePacksType) {
		return instance.post<CreatePackResponseType>('cards/pack', data)
	},
	updatePackName(data: ArgsUpdatePacksType) {
		return instance.put<UpdatePackResponseType>('cards/pack', data)
	},
	deletePack(data: ArgsDeletePacksType) {
		return instance.delete<DeletePackResponseType>(`cards/pack/?id=${data._id}`)
	}
}
