import { instance } from 'common/api/common.api'

export const authApi = {
	register(arg: ArgRegisterType) {
		return instance.post<RegisterResponseType>('auth/register', arg)
	},
	login(arg: ArgLoginType) {
		return instance.post<any>('auth/login', arg)
	},
	me() {
		return instance.post<any>('auth/me', {})
	},
	logout() {
		return instance.delete<{ info: string; error?: string }>('auth/me')
	},
	changeName(arg: any) {
		return instance.put<any>('auth/me', arg)
	}
}

export type RegisterResponseType = Omit<ProfileType, 'token' | 'tokenDeathTime'>

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
}

export type ArgRegisterType = Omit<ArgLoginType, 'rememberMe'>

export type ArgLoginType = {
	email: string
	password: string
	rememberMe: boolean
}
