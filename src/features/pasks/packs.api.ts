import { instance } from 'common/api/common.api'

export const packsApi = {
	getPacks(params: any) {
		return instance.get<GetPacksResponseType>('cards/pack', {
			params
		})
	},
	createPack(data: any) {
		return instance.post<CreatePackResponseType>('cards/pack', data)
	},
	deletePack(id: string) {
		return instance.delete<DeletePackResponseType>(`cards/pack/?id=${id}`)
	},
	updatePackName(data: any) {
		return instance.put<UpdatePackResponseType>('cards/pack', data)
	}
}

export type PackType = {
	_id: string
	user_id: string
	user_name: string
	private: boolean
	name: string
	path: string
	grade: number
	shots: number
	cardsCount: number
	type: string
	rating: number
	created: string
	updated: string
	more_id: string
	__v: number
}

export type GetPacksResponseType = {
	cardPacks: PackType[]
}

export type CreatePackResponseType = {
	newCardsPack: PackType
	token: string
	tokenDeathTime: number
}

export type DeletePackResponseType = {
	deletedCardsPack: PackType
	token: string
	tokenDeathTime: number
}

export type UpdatePackResponseType = {
	updatedCardsPack: PackType
	token: string
	tokenDeathTime: number
}
