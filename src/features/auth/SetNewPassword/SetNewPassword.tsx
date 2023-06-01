import React from 'react'
import s from 'features/auth/SetNewPassword/SetNewPassword.module.css'
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { authThunks } from 'features/auth/auth.slice'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'

type FormType = { password: string }

export const SetNewPassword = () => {
	const dispatch = useAppDispatch()

	const [showPassword, setShowPassword] = React.useState(false)
	const handleClickShowPassword = () => setShowPassword(show => !show)
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<FormType>({ mode: 'onSubmit' })
	const handleNewPassword = (data: FormType) => {
		dispatch(authThunks.setNewPassword({ password: data.password }))
	}
	//считывание токена из URL
	const { resetPasswordToken } = useParams()
	console.log(resetPasswordToken)

	return (
		<div className={s.container}>
			<div className={s.header}>Create new password</div>
			<form onSubmit={handleSubmit(handleNewPassword)}>
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
					{errors.password && <div className={s.inputError}>{errors.password.message}</div>}
				</div>
				<div className={s.text}>Create new password and we will send you further instructions to email</div>
				<button type={'submit'} className={s.button}>
					Create new password
				</button>
			</form>
		</div>
	)
}
