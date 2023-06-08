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
} from 'features/pasks/packsTypes'

export const packsAPI = {
	getPacks(data: any) {
		console.log(data)
		return instance.get<GetPacksResponseType>('cards/pack', { params: { ...data } })
	},
	createPack(data: ArgsCreatePacksType) {
		return instance.post<CreatePackResponseType>('cards/pack', data)
	},
	updatePack(data: ArgsUpdatePacksType) {
		return instance.put<UpdatePackResponseType>('cards/pack', data)
	},
	deletePack(data: ArgsDeletePacksType) {
		return instance.delete<DeletePackResponseType>(`cards/pack/?id=${data._id}`)
	}
}
