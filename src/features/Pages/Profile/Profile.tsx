import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import s from './Profile.module.css'
import { authThunks, logout } from 'features/auth/auth.slice'
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'

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
				<div>
					<img
						className={s.avatar}
						src='https://w7.pngwing.com/pngs/1009/704/png-transparent-avatar-child-computer-icons-user-profile-smiling-boy-child-face-heroes-thumbnail.png'
						alt='avatar'
					/>
				</div>
				<div className={s.name}>
					<EditableSpan value={userName} onChange={authThunks.changeName} />
				</div>
				<div className={s.email}>{userEmail}</div>
				<button onClick={handleLogout} className={s.button}>
					Log out
				</button>
			</div>
		</div>
	)
}
