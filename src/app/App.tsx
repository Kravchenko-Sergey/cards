import React, { useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { CheckEmail } from 'features/Pages/CheckEmail/CheckEmail'
import { SetNewPassword } from 'features/Pages/SetNewPassword/SetNewPassword'
import { ForgotPassword } from 'features/Pages/ForgotPassword/ForgotPassword'
import { Profile } from 'features/Pages/Profile/Profile'
import { Learn } from 'features/Pages/Learn/Learn'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { appActions } from 'app/app.slice'
import { Register } from 'features/register/Register'
import { Login } from 'features/Login/Login'
import { Cards } from 'features/cards/Cards'
import { Packs } from 'features/pasks/Pasks'

function App() {
	const isLoading = useAppSelector(state => state.app.isLoading)
	const dispatch = useAppDispatch()

	useEffect(() => {
		setTimeout(() => {
			dispatch(appActions.setIsLoading({ isLoading: false }))
		}, 3000)
	}, [])

	return (
		<div className='App'>
			<header className='App-header'>
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/check-email' element={<CheckEmail />} />
					<Route path='/set-new-password' element={<SetNewPassword />} />
					<Route path='/forgot-password' element={<ForgotPassword />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/packs' element={<Packs />} />
					<Route path='/cards' element={<Cards />} />
					<Route path='/learn' element={<Learn />} />
				</Routes>
			</header>
		</div>
	)
}

export default App
