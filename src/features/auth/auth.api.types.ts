export type RegisterResponseType = {
	addedUser: Omit<UserProfileType, 'token' | 'tokenDeathTime'>
}

export type UserProfileType = {
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
	updatedUser: UserProfileType
	token: string
	tokenDeathTime: number
}

export type ForgotPasswordResponseType = {
	info: string
	success: boolean
	answer: boolean
	html: boolean
}

export type LogoutResponseType = {
	info: string
}

export type ArgsForgotPasswordType = {
	email: string
	message: string
}

export type ArgsSetNewPassword = {
	password: string
	resetPasswordToken?: string
}

export type SetNewPasswordResponseType = {
	info: string
	error: string
}

export type ArgsUpdateProfile = {
	name?: string
	avatar?: string
}
