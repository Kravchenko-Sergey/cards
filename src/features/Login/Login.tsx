import React from 'react'
import { useAppDispatch } from 'app/hooks'
import { authThunks } from 'features/auth/auth.slice'
import s from './Login.module.css'
import TextField from '@mui/material/TextField'
import { Checkbox, FormControl, FormControlLabel, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link } from 'react-router-dom'

export const Login = () => {
	const dispatch = useAppDispatch()

	const handleLogin = () => {
		dispatch(authThunks.login({ email: 'sergeyCardsDev@gmail.com', password: '1qazxcvBG', rememberMe: true }))
	}

	const [showPassword, setShowPassword] = React.useState(false)
	const handleClickShowPassword = () => setShowPassword(show => !show)
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	return (
		<div className={s.container}>
			<h1 className={s.header}>Sign in</h1>
			<div className={s.input}>
				<TextField id='standard-basic' label='Email' sx={{ m: 1, width: '100%' }} variant='standard' />
			</div>
			<div className={s.input}>
				<FormControl sx={{ m: 1, width: '100%' }} variant='standard'>
					<InputLabel htmlFor='standard-adornment-password'>Password</InputLabel>
					<Input
						id='standard-adornment-password'
						type={showPassword ? 'text' : 'password'}
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
			<div className={s.checkbox}>
				<FormControlLabel control={<Checkbox defaultChecked />} label='Remember me' />
			</div>
			<Link to='/forgot-password' className={s.forgotPassword}>
				Forgot Password?
			</Link>
			<button onClick={handleLogin} className={s.button}>
				Sign in
			</button>
			<div className={s.dontAcc}>Dont have an account?</div>
			<Link to='/register' className={s.signUp}>
				Sign Up
			</Link>
		</div>
	)
}
