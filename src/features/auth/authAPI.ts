import { instance } from 'common/api/common.api'
import axios from 'axios'
import {
	ArgLoginType,
	ArgRegisterType,
	ForgotPasswordResType,
	UserProfileResType,
	RegisterResType,
	UpdateProfileType,
	LogoutResType,
	ArgForgotPasswordType,
	ArgSetNewPassword,
	SetNewPasswordResType,
	ArgsUpdateProfile
} from 'features/auth/authTypes'

const settings = {
	withCredentials: true
}

export const authAPI = {
	register(arg: ArgRegisterType) {
		return instance.post<RegisterResType>('auth/register', arg)
	},
	login(arg: ArgLoginType) {
		return instance.post<UserProfileResType>('auth/login', arg)
	},
	logout() {
		return instance.delete<LogoutResType>('auth/me')
	},
	me() {
		return instance.post<UserProfileResType>('auth/me', {})
	},
	forgotPassword(arg: ArgForgotPasswordType) {
		return axios.post<ForgotPasswordResType>('https://neko-back.herokuapp.com/2.0/auth/forgot', arg, settings)
	},
	setNewPassword(arg: ArgSetNewPassword) {
		return axios.post<SetNewPasswordResType>('https://neko-back.herokuapp.com/2.0/auth/set-new-password', arg, settings)
	},
	updateProfile(arg: ArgsUpdateProfile) {
		return instance.put<UpdateProfileType>('auth/me', arg)
	}
}
