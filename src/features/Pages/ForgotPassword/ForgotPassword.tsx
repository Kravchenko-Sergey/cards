import React from 'react'
import s from './ForgotPassword.module.css'
import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom'

export const ForgotPassword = () => {
	return (
		<div className={s.container}>
			<h1 className={s.header}>Forgot your password?</h1>
			<div className={s.input}>
				<TextField id='standard-basic' label='Email' sx={{ m: 1, width: '100%' }} variant='standard' />
			</div>
			<div className={s.text}>Enter your email address and we will send you further instructions</div>
			<button className={s.button}>Send Instructions</button>
			<div className={s.didYourPassword}>Did you remember your password?</div>
			<Link to='/login' className={s.signIn}>
				Try logging in
			</Link>
		</div>
	)
}
