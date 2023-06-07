import { instance } from 'common/api/common.api'
import axios from 'axios'
import {
	ArgsLoginType,
	ArgsRegisterType,
	ForgotPasswordResponseType,
	UserProfileType,
	RegisterResponseType,
	UpdateProfileType,
	LogoutResponseType,
	ArgsForgotPasswordType,
	ArgsSetNewPassword,
	SetNewPasswordResponseType,
	ArgsUpdateProfile
} from './auth.api.types'

const settings = {
	withCredentials: true
}

export const authApi = {
	register(data: ArgsRegisterType) {
		return instance.post<RegisterResponseType>('auth/register', data)
	},
	login(data: ArgsLoginType) {
		return instance.post<UserProfileType>('auth/login', data)
	},
	logout() {
		return instance.delete<LogoutResponseType>('auth/me')
	},
	me() {
		return instance.post<UserProfileType>('auth/me', {})
	},
	forgotPassword(data: ArgsForgotPasswordType) {
		return axios.post<ForgotPasswordResponseType>('https://neko-back.herokuapp.com/2.0/auth/forgot', data, settings)
	},
	setNewPassword(data: ArgsSetNewPassword) {
		return axios.post<SetNewPasswordResponseType>(
			'https://neko-back.herokuapp.com/2.0/auth/set-new-password',
			data,
			settings
		)
	},
	updateProfile(data: ArgsUpdateProfile) {
		return instance.put<UpdateProfileType>('auth/me', data)
	}
}
