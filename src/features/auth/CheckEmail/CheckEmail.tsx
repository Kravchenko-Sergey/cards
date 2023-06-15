import React from 'react'
import s from 'features/auth/CheckEmail/CheckEmail.module.css'
import checkEmail from 'assets/img/checkEmail.svg'
import { useAppSelector } from 'common/hooks'
import { Link } from 'react-router-dom'
import { selectUserEmail } from 'features/auth/authSelectors'

export const CheckEmail = () => {
	const userEmail = useAppSelector(selectUserEmail)

	return (
		<div className={s.container}>
			<div className={s.header}>Check Email</div>
			<div>
				<img className={s.avatar} src={checkEmail} alt='avatar' />
			</div>
			<div className={s.text}>{`We’ve sent an Email with instructions to ${userEmail}`}</div>
			<Link to={'/login'} className={s.button}>
				Back to login
			</Link>
		</div>
	)
}
