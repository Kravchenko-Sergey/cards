import { instance } from 'common/api/common.api'

export const authApi = {
	register(arg: ArgRegisterType) {
		return instance.post<RegisterResponseType>('auth/register', arg)
	},
	login(arg: ArgLoginType) {
		return instance.post('auth/login', arg)
	}
}

export type RegisterResponseType = Omit<ProfileType, 'token' | 'tokenDeathTime'>

export type ProfileType = {
	addedUser: {
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
	}
}

export type ArgRegisterType = Omit<ArgLoginType, 'rememberMe'>

export type ArgLoginType = {
	email: string
	password: string
	rememberMe: boolean
}
