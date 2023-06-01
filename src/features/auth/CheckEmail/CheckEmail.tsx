import React from 'react'
import s from 'features/auth/CheckEmail/CheckEmail.module.css'

export const CheckEmail = () => {
	return (
		<div className={s.container}>
			<div className={s.header}>Check Email</div>
			<div>
				<img
					className={s.avatar}
					src='https://w7.pngwing.com/pngs/1009/704/png-transparent-avatar-child-computer-icons-user-profile-smiling-boy-child-face-heroes-thumbnail.png'
					alt='avatar'
				/>
			</div>
			<div className={s.text}>We’ve sent an Email with instructions to example@mail.com</div>
			<button className={s.button}>Back to login</button>
		</div>
	)
}
