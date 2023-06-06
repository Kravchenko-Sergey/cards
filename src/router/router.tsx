import { createBrowserRouter } from 'react-router-dom'
import { Layout } from 'Layout'
import { PageError } from 'features/Pages/PageError/PageError'
import { Profile } from 'features/Pages/Profile/Profile'
import { Login } from 'features/auth/Login/Login'
import { Register } from 'features/auth/register/Register'
import { CheckEmail } from 'features/auth/CheckEmail/CheckEmail'
import { SetNewPassword } from 'features/auth/SetNewPassword/SetNewPassword'
import { ForgotPassword } from 'features/auth/ForgotPassword/ForgotPassword'
import { Packs } from 'features/pasks/Pasks'
import { Cards } from 'features/cards/Cards'
import { Learn } from 'features/Pages/Learn/Learn'
import React from 'react'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <PageError />,
		children: [
			{
				index: true,
				element: <Profile />
			},
			{
				path: 'login',
				element: <Login />
			},
			{
				path: 'register',
				element: <Register />
			},
			{
				path: 'check-email',
				element: <CheckEmail />
			},
			{
				path: 'set-new-password',
				element: <SetNewPassword />
			},
			{
				path: 'forgot-password',
				element: <ForgotPassword />
			},
			{
				path: 'profile',
				element: <Profile />
			},
			{
				path: 'packs',
				element: <Packs />
			},
			{
				path: 'cards',
				element: <Cards />
			},
			{
				path: 'learn',
				element: <Learn />
			}
		]
	}
])
