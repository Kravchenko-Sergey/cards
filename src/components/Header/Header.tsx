import React from 'react'
import incubatorLogo from 'assets/img/incubatorLogo.svg'
import { Link } from 'react-router-dom'
import style from './header.module.css'
import { useAppSelector } from '../../common/hooks/useAppSelector'

export const Header = () => {
	const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
	const handleLogin = (data: any) => {}

	return (
		<header className={style.header}>
			<div className={style.headerContainer}>
				<img src={incubatorLogo} alt='incubatorLogo' />
				{!isLoggedIn ? (
					<button onClick={handleLogin} className={style.button}>
						Sign in
					</button>
				) : (
					<Link to={'/profile'}>
						<div>userName</div>
					</Link>
				)}
			</div>
		</header>
	)
}
