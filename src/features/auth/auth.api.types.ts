export type RegisterResponseType = {
	addedUser: Omit<ProfileType, 'token' | 'tokenDeathTime'>
}

export type ProfileType = {
	_id: string
	email: string
	rememberMe: boolean
	isAdmin: boolean
	name: string
	verified: boolean
	publicCardPacksCount: number
	created: string
	updated: string
	__v: number
	token: string
	tokenDeathTime: number
	avatar: null | string
}

export type ArgsRegisterType = Omit<ArgsLoginType, 'rememberMe'>

export type ArgsLoginType = {
	email: string
	password: string
	rememberMe: boolean
}

export type UpdateProfileType = {
	updatedUser: ProfileType
	token: string
	tokenDeathTime: number
}

export type ForgotPasswordType = {
	info: string
	success: boolean
	answer: boolean
	html: boolean
}
