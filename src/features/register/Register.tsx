import { useAppDispatch, useAppSelector } from 'app/hooks'
import { authThunks } from 'features/auth/auth.slice'
import s from './Register.module.css'
import TextField from '@mui/material/TextField'
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link, Navigate } from 'react-router-dom'
import React from 'react'
import { useForm } from 'react-hook-form'

type RegType = {
	email: string
	password: string
	confirmPassword: string
}

export const Register = () => {
	const dispatch = useAppDispatch()

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<RegType>({ mode: 'onSubmit' })
	const handleRegister = (data: any) => {
		dispatch(authThunks.register(data))
	}

	const [showPassword, setShowPassword] = React.useState(false)
	const handleClickShowPassword = () => setShowPassword(show => !show)
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	const isRegisteredIn = useAppSelector(state => state.auth.isRegisteredIn)
	if (isRegisteredIn) {
		return <Navigate to={'/login'} />
	}

	return (
		<div className={s.container}>
			<h1 className={s.header}>Sign Up</h1>
			<form onSubmit={handleSubmit(handleRegister)} className={s.form}>
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
				<div className={s.input}>
					<FormControl sx={{ m: 1, width: '100%' }} variant='standard'>
						<InputLabel htmlFor='standard-adornment-password'>Confirm password</InputLabel>
						<Input
							id='standard-adornment-password'
							type={showPassword ? 'text' : 'password'}
							{...register('confirmPassword', {
								required: 'Type your password again'
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
				{errors.confirmPassword && <div className={s.inputError}>{errors.confirmPassword.message}</div>}
				<button type='submit' onClick={handleRegister} className={s.button}>
					Sign Up
				</button>
			</form>
			<div className={s.dontAcc}>Already have an account?</div>
			<Link to='/login' className={s.signUp}>
				Sign In
			</Link>
		</div>
	)
}
