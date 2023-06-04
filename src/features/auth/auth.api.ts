import { instance } from 'common/api/common.api'
import axios from 'axios'
import {
	ArgsLoginType,
	ArgsRegisterType,
	ForgotPasswordType,
	ProfileType,
	RegisterResponseType,
	UpdateProfileType
} from './auth.api.types'

const settings = {
	withCredentials: true
}

export const authApi = {
	register(arg: ArgsRegisterType) {
		return instance.post<RegisterResponseType>('auth/register', arg)
	},
	login(arg: ArgsLoginType) {
		return instance.post<ProfileType>('auth/login', arg)
	},
	me() {
		return instance.post<ProfileType>('auth/me', {})
	},
	logout() {
		return instance.delete<{ info: string }>('auth/me')
	},
	updateProfile(arg: { name: string }) {
		return instance.put<UpdateProfileType>('auth/me', arg)
	},
	forgotPassword(arg: { email: string; message: string }) {
		console.log(arg)
		return axios.post<ForgotPasswordType>('https://neko-back.herokuapp.com/2.0/auth/forgot', arg, settings)
	},
	setNewPassword(arg: any) {
		return axios.post<any>('https://neko-back.herokuapp.com/2.0/auth/set-new-password', arg, settings)
	}
}
