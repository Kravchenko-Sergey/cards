import React from 'react'
import { useAppDispatch } from 'app/hooks'
import { authThunks } from 'features/auth/auth.slice'
import s from './Login.module.css'
import TextField from '@mui/material/TextField'
import { Checkbox, FormControl, FormControlLabel, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ArgLoginType } from 'features/auth/auth.api'
import { useSelector } from 'react-redux'

export const Login = () => {
	const dispatch = useAppDispatch()
	/*const handleLogin = () => {
		dispatch(authThunks.login({ email: 'sergeyCardsDev@gmail.com', password: '1qazxcvBG', rememberMe: true }))
	}*/

	const {
		register,
		formState: { errors, isValid },
		handleSubmit
	} = useForm<ArgLoginType>({ mode: 'onSubmit' })
	const handleLogin = (data: any) => {
		dispatch(authThunks.login(data))
	}

	const [showPassword, setShowPassword] = React.useState(false)
	const handleClickShowPassword = () => setShowPassword(show => !show)
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	const isLoggedIn = useSelector<any>(state => state.auth.isLoggedIn)
	if (isLoggedIn) {
		return <Navigate to={'/cards'} />
	}

	return (
		<div className={s.container}>
			<h1 className={s.header}>Sign in</h1>
			<form onSubmit={handleSubmit(handleLogin)} className={s.form}>
				<div className={s.input}>
					<TextField
						id='standard-basic'
						label='Email'
						sx={{ m: 1, width: '100%' }}
						variant='standard'
						{...register('email', {
							required: 'Enter your email!',
							pattern: {
								value: /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
								message: 'Wrong or Invalid email address. Please correct and try again'
							}
						})}
					/>
				</div>
				{errors.email && <div className={s.inputError}>{errors.email.message}</div>}
				<div className={s.input}>
					<FormControl sx={{ m: 1, width: '100%' }} variant='standard'>
						<InputLabel htmlFor='standard-adornment-password'>Password</InputLabel>
						<Input
							id='standard-adornment-password'
							type={showPassword ? 'text' : 'password'}
							{...register('password', {
								required: 'Enter your password',
								minLength: { value: 7, message: 'Minimum 7 characters required' },
								pattern: {
									value: /(?=.*[0-9])/,
									message: 'password must contain at least one number'
								}
							})}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
				</div>
				{errors.password && <div className={s.inputError}>{errors.password.message}</div>}
				<div className={s.checkbox}>
					<FormControlLabel control={<Checkbox defaultChecked {...register('rememberMe')} />} label='Remember me' />
				</div>
				<Link to='/forgot-password' className={s.forgotPassword}>
					Forgot Password?
				</Link>
				<button type='submit' onClick={handleLogin} className={s.button}>
					Sign in
				</button>
			</form>
			<div className={s.dontAcc}>Dont have an account?</div>
			<Link to='/register' className={s.signUp}>
				Sign Up
			</Link>
		</div>
	)
}
