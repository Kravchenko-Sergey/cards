import React from 'react'
import { Link } from 'react-router-dom'
import s from './Profile.module.css'

export const Profile = () => {
	return (
		<div className={s.s}>
			<Link to='/packs' className={s.backPackList}>
				Back to Packs List
			</Link>
			<div className={s.container}>
				<div className={s.header}>Personal Information</div>
				<div>
					<img
						className={s.avatar}
						src='https://w7.pngwing.com/pngs/1009/704/png-transparent-avatar-child-computer-icons-user-profile-smiling-boy-child-face-heroes-thumbnail.png'
						alt='avatar'
					/>
				</div>
				<div className={s.name}>Sergey</div>
				<div className={s.email}>sergey.ose.pyatigorsk@gmail.com</div>
				<button className={s.button}>Log out</button>
			</div>
		</div>
	)
}
