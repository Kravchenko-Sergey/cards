import { useAppDispatch } from 'app/hooks'
import { authThunks } from 'features/auth/auth.slice'
import s from './Register.module.css'
import TextField from '@mui/material/TextField'
import { Checkbox, FormControl, FormControlLabel, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import React from 'react'

export const Register = () => {
	const dispatch = useAppDispatch()

	const handleRegister = () => {
		dispatch(authThunks.register({ email: 'sergeyCardsDev@gmail.com', password: '1qazxcvBG' }))
	}

	const [showPassword, setShowPassword] = React.useState(false)
	const handleClickShowPassword = () => setShowPassword(show => !show)
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	return (
		<div className={s.container}>
			<h1 className={s.header}>Sign Up</h1>
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
			<div className={s.input}>
				<FormControl sx={{ m: 1, width: '100%' }} variant='standard'>
					<InputLabel htmlFor='standard-adornment-password'>Confirm password</InputLabel>
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
			<button onClick={handleRegister} className={s.button}>
				Sign Up
			</button>
			<div className={s.dontAcc}>Already have an account?</div>
			<Link to='/login' className={s.signUp}>
				Sign In
			</Link>
		</div>
	)
}
