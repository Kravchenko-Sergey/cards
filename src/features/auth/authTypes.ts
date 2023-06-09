export type RegisterResType = {
	addedUser: Omit<UserProfileResType, 'token' | 'tokenDeathTime'>
}

export type UserProfileResType = {
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

export type ArgRegisterType = Omit<ArgLoginType, 'rememberMe'>

export type ArgLoginType = {
	email: string
	password: string
	rememberMe: boolean
}

export type UpdateProfileType = {
	updatedUser: UserProfileResType
	token: string
	tokenDeathTime: number
}

export type ForgotPasswordResType = {
	info: string
	success: boolean
	answer: boolean
	html: boolean
}

export type LogoutResType = {
	info: string
}

export type ArgForgotPasswordType = {
	email: string
	message: string
}

export type ArgSetNewPassword = {
	password: string
	resetPasswordToken?: string
}

export type SetNewPasswordResType = {
	info: string
	error: string
}

export type ArgsUpdateProfile = {
	name?: string
	avatar?: string
}
