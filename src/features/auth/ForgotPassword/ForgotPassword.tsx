import React from 'react'
import s from 'features/auth/ForgotPassword/ForgotPassword.module.css'
import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { authThunks } from 'features/auth/auth.slice'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'

type FormType = { email: string }

export const ForgotPassword = () => {
	const dispatch = useAppDispatch()

	const {
		register,
		formState: { errors, isValid },
		handleSubmit
	} = useForm<FormType>({ mode: 'onBlur' })
	const handleForgotPassword = (data: FormType) => {
		const message = `<div>Перейдите по ссылке, чтобы продолжить восстановление пароля: <a href="http://localhost:3000/#/set-new-password/$token$">link</a></div>>`
		dispatch(authThunks.forgotPassword({ email: data.email, message: message }))
	}

	return (
		<div className={s.container}>
			<h1 className={s.header}>Forgot your password?</h1>
			<form onSubmit={handleSubmit(handleForgotPassword)}>
				<div className={s.input}>
					<TextField
						id='standard-basic'
						label='Email'
						sx={{ m: 1, width: '100%' }}
						variant='standard'
						{...register('email', {
							required: 'Enter your email',
							pattern: {
								value: /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
								message: 'Wrong or Invalid email address. Please correct and try again'
							}
						})}
					/>
					{errors.email && <div className={s.inputError}>{errors.email.message}</div>}
				</div>
				<div className={s.text}>Enter your email address and we will send you further instructions</div>
				<button type={'submit'} disabled={!isValid} className={`${isValid} ? ${s.button} : ${s.buttonDisabled}`}>
					Send Instructions
				</button>
			</form>
			<div className={s.didYourPassword}>Did you remember your password?</div>
			<Link to='/login' className={s.signIn}>
				Try logging in
			</Link>
		</div>
	)
}
