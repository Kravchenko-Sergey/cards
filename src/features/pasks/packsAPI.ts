import { instance } from 'common/api/common.api'
import {
	ArgCreatePacksType,
	ArgDeletePacksType,
	ArgsGetPacksType,
	ArgUpdatePacksType,
	CreatePackResType,
	DeletePackResType,
	GetPacksResType,
	UpdatePackResType
} from 'features/pasks/packsTypes'

export const packsAPI = {
	getPacks(arg: ArgsGetPacksType) {
		return instance.get<GetPacksResType>('cards/pack', { params: { ...arg } })
	},
	createPack(arg: ArgCreatePacksType) {
		return instance.post<CreatePackResType>('cards/pack', arg)
	},
	updatePack(arg: ArgUpdatePacksType) {
		return instance.put<UpdatePackResType>('cards/pack', arg)
	},
	deletePack(arg: ArgDeletePacksType) {
		console.log(arg)
		return instance.delete<DeletePackResType>(`cards/pack/?id=${arg._id}`)
	}
}
