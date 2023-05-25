import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
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

function App() {
	return (
		<div className='App'>
			<div className='wrapper'>
				<header className='header'>
					<div className='container'>
						<img src={incubatorLogo} alt='incubatorLogo' />
						<button className='button'>Sign in</button>
					</div>
				</header>
				<main className='main'>
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
				</main>
			</div>
		</div>
	)
}

export default App
