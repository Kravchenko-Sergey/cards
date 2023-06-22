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
	deckCover: string
}

export type GetPacksResType = {
	cardPacks: PackType[]
	cardPacksTotalCount: number
	maxCardsCount: number
	minCardsCount: number
	page: number
	pageCount: number
	token: string
	tokenDeathTime: number
}

export type CreatePackResType = {
	newCardsPack: PackType
	token: string
	tokenDeathTime: number
}

export type DeletePackResType = {
	deletedCardsPack: PackType
	token: string
	tokenDeathTime: number
}

export type UpdatePackResType = {
	updatedCardsPack: PackType
	token: string
	tokenDeathTime: number
}

export type ArgsGetPacksType = {
	packName?: string
	min?: number
	max?: number
	sortPacks?: string
	page?: number
	pageCount?: number
	user_id?: string
	block?: boolean
}

export type ArgCreatePacksType = {
	cardsPack: {
		name: string
		deckCover: string
		private: boolean
	}
}

export type ArgUpdatePacksType = {
	cardsPack: {
		_id: string
		name: string
	}
}

export type ArgDeletePacksType = {
	_id: string
}
