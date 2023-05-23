import React from 'react'
import s from './SetNewPassword.module.css'
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

export const SetNewPassword = () => {
	const [showPassword, setShowPassword] = React.useState(false)
	const handleClickShowPassword = () => setShowPassword(show => !show)
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}
	return (
		<div className={s.container}>
			<div className={s.header}>Create new password</div>
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
			<div className={s.text}>Create new password and we will send you further instructions to email</div>
			<button className={s.button}>Create new password</button>
		</div>
	)
}
