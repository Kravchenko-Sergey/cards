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
	cardPacksTotalCount: number
	maxCardsCount: number
	minCardsCount: number
	page: number
	pageCount: number
	token: string
	tokenDeathTime: number
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

export type ArgsCreatePacksType = {
	cardsPack: {
		name: string
		deckCover: string
		private: boolean
	}
}

export type ArgsUpdatePacksType = {
	cardsPack: {
		_id: string
		name: string
	}
}

export type ArgsDeletePacksType = {
	_id: string
}
