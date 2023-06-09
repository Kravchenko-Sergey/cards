import React from 'react'
import incubatorLogo from 'assets/img/incubatorLogo.svg'
import { Link } from 'react-router-dom'
import style from './header.module.css'
import { useAppSelector } from 'common/hooks'
import { Avatar } from '@mui/material'

export const Header = () => {
	const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
	const userName = useAppSelector(state => state.auth.profile?.name)
	const userAvatar: any = useAppSelector(state => state.auth.profile?.avatar)

	return (
		<div className={style.headerContainer}>
			<img src={incubatorLogo} alt='incubatorLogo' />
			{!isLoggedIn ? (
				<button className={style.button}>Sign in</button>
			) : (
				<Link to={'/profile'} className={style.avatarBlock}>
					<div className={style.userName}>{userName}</div>
					<Avatar src={userAvatar} alt={userAvatar} />
				</Link>
			)}
		</div>
	)
}
