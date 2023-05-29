import React, { useEffect } from 'react'
import './App.css'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { CheckEmail } from 'features/Pages/CheckEmail/CheckEmail'
import { SetNewPassword } from 'features/Pages/SetNewPassword/SetNewPassword'
import { ForgotPassword } from 'features/Pages/ForgotPassword/ForgotPassword'
import { Profile } from 'features/Pages/Profile/Profile'
import { Learn } from 'features/Pages/Learn/Learn'
import { Register } from 'features/register/Register'
import { Login } from 'features/Login/Login'
import { Cards } from 'features/cards/Cards'
import { Packs } from 'features/pasks/Pasks'
import incubatorLogo from '../assets/img/incubatorLogo.svg'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'app/hooks'
import { appThunks } from 'app/app.slice'
import CircularProgress from '@mui/material/CircularProgress'
import { PageError } from '../features/Pages/PageError/PageError'

function App() {
	const dispatch = useAppDispatch()
	const isLoggedIn = useSelector<any>(state => state.auth.isLoggedIn)
	const isInitialized = useSelector<any>(state => state.app.isAppInitialized)
	const userName: any = useSelector<any>(state => state?.auth?.profile?.name)
	useEffect(() => {
		dispatch(appThunks.initializeApp())
	}, [])

	const handleLogin = (data: any) => {}

	if (!isInitialized) {
		return (
			<div className={'circularProgress'}>
				<CircularProgress />
			</div>
		)
	}

	return (
		<div className='App'>
			<div className='wrapper'>
				<header className='header'>
					<div className='container'>
						<img src={incubatorLogo} alt='incubatorLogo' />
						{!isLoggedIn ? (
							<button onClick={handleLogin} className='button'>
								Sign in
							</button>
						) : (
							<Link to={'/profile'}>
								<div>userName</div>
							</Link>
						)}
					</div>
				</header>
				<main className='main'>
					<Routes>
						<Route path='/' element={<Cards />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/check-email' element={<CheckEmail />} />
						<Route path='/set-new-password' element={<SetNewPassword />} />
						<Route path='/forgot-password' element={<ForgotPassword />} />
						<Route path='/profile' element={<Profile />} />
						<Route path='/packs' element={<Packs />} />
						<Route path='/cards' element={<Cards />} />
						<Route path='/learn' element={<Learn />} />
						<Route path='/404' element={<PageError />} />
						<Route path='*' element={<Navigate to='/404' />} />
					</Routes>
				</main>
			</div>
		</div>
	)
}

export default App
