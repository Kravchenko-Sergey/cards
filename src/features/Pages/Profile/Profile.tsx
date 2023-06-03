import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import s from './Profile.module.css'
import { authThunks, logout } from 'features/auth/auth.slice'
import { EditableSpan } from 'components/EditableSpan/EditableSpan'
import { useAppDispatch } from 'common/hooks'
import { useAppSelector } from 'common/hooks'
import avatar from '../../../assets/img/userPhoto.svg'
import changePhoto from 'assets/img/changePhoto.svg'
import logoutIcon from '../../../assets/img/logout.svg'

export const Profile = () => {
	const dispatch = useAppDispatch()
	const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
	const userName = useAppSelector(state => state.auth.profile?.name)
	const userEmail = useAppSelector(state => state.auth.profile?.email)
	const handleLogout = () => {
		dispatch(logout())
	}

	if (!isLoggedIn) {
		return <Navigate to={'/login'} />
	}
	return (
		<div className={s.s}>
			<Link to='/packs' className={s.backPackList}>
				Back to Packs List
			</Link>
			<div className={s.container}>
				<div className={s.header}>Personal Information</div>
				<div className={s.avatarBlock}>
					<img src={avatar} alt='avatar' />
					<img className={s.changeAvatar} src={changePhoto} alt='changePhoto' />
				</div>
				<div className={s.name}>
					<EditableSpan value={userName} onChange={authThunks.changeUserName} />
				</div>
				<div className={s.email}>{userEmail}</div>
				<button onClick={handleLogout} className={s.button}>
					<img src={logoutIcon} alt='logout' />
					<span className={s.buttonText}>Log out</span>
				</button>
			</div>
		</div>
	)
}
