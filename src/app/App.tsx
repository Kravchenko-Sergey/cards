import React, { useEffect } from 'react'
import { appThunks } from 'app/app.slice'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Login } from 'features/auth/Login/Login'
import { Cards } from 'features/cards/Cards'
import { Register } from 'features/auth/register/Register'
import { CheckEmail } from 'features/auth/CheckEmail/CheckEmail'
import { SetNewPassword } from 'features/auth/SetNewPassword/SetNewPassword'
import { ForgotPassword } from 'features/auth/ForgotPassword/ForgotPassword'
import { Profile } from 'features/Pages/Profile/Profile'
import { Packs } from 'features/pasks/Pasks'
import { Learn } from 'features/Pages/Learn/Learn'
import { PageError } from 'features/Pages/PageError/PageError'
import { CircularProgress, LinearProgress } from '@mui/material'
import '../app/App.css'
import { Header } from 'components/Header/Header'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const App = () => {
	const router = [
		{
			path: '/',
			element: <Profile />
		},
		{
			path: '/login',
			element: <Login />
		},
		{
			path: '/register',
			element: <Register />
		},
		{
			path: '/check-email',
			element: <CheckEmail />
		},
		{
			path: '/set-new-password',
			element: <SetNewPassword />
		},
		{
			path: '/forgot-password',
			element: <ForgotPassword />
		},
		{
			path: '/profile',
			element: <Profile />
		},
		{
			path: '/packs',
			element: <Packs />
		},
		{
			path: '/cards',
			element: <Cards />
		},
		{
			path: '/learn',
			element: <Learn />
		},
		{
			path: '/404',
			element: <PageError />
		},
		{
			path: '*',
			element: <Navigate to='/404' />
		}
	]

	const dispatch = useAppDispatch()
	const isInitialized = useAppSelector(state => state.app.isAppInitialized)
	const isLoading = useAppSelector(state => state.app.isLoading)

	useEffect(() => {
		dispatch(appThunks.initializeApp())
	}, [])

	return !isInitialized ? (
		<div className={'circularProgress'}>
			<CircularProgress />
		</div>
	) : (
		<BrowserRouter>
			<ToastContainer
				position='top-center'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
			<div className='wrapper'>
				<div className={'linearProgress'}>{isLoading && <LinearProgress />}</div>
				<Header />
				<main className='main'>
					<div className={'mainContainer'}>
						<Routes>
							{router.map((rout, index) => (
								<Route key={index} path={rout.path} element={rout.element} />
							))}
						</Routes>
					</div>
				</main>
			</div>
		</BrowserRouter>
	)
}
