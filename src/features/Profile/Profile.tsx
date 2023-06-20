import { Link } from 'react-router-dom'
import s from 'features/Profile/Profile.module.css'
import { authThunks, logout } from 'features/auth/authSlice'
import { EditableSpan } from 'components/EditableSpan/EditableSpan'
import { useAppDispatch } from 'common/hooks'
import { useAppSelector } from 'common/hooks'
import changePhoto from 'assets/img/changePhoto.svg'
import logoutIcon from 'assets/img/logout.svg'
import leftArrow from 'assets/img/leftArrow.svg'
import { authSelectors } from 'features/auth/authSelectors'
import { IconButton } from '@mui/material'

export const Profile = () => {
	const userName = useAppSelector(authSelectors.selectUserName)
	const userEmail = useAppSelector(authSelectors.selectUserEmail)
	const userAvatar: any = useAppSelector(state => state.auth.profile?.avatar)
	const dispatch = useAppDispatch()

	const handleChangeAvatar = (event: any) => {
		const file = event.target.files && event.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				dispatch(
					authThunks.changeUser({
						avatar: reader.result as string
					})
				)
			}
			reader.readAsDataURL(file)
		}
	}

	const handleLogout = () => {
		dispatch(logout({}))
	}

	return (
		<div className={s.s}>
			<Link to='/packs' className={s.backPackList}>
				<img src={leftArrow} alt='leftArrow' />
				<span className={s.backPackListText}>Back to Packs List</span>
			</Link>
			<div className={s.container}>
				<div className={s.header}>Personal Information</div>
				<div className={s.avatarBlock}>
					<img src={userAvatar} alt='avatar' className={s.avatar} />
					<IconButton component='label'>
						<img className={s.changeAvatar} src={changePhoto} alt='changePhoto' />
						<input type='file' accept='image/*' onChange={handleChangeAvatar} style={{ display: 'none' }} />
					</IconButton>
				</div>
				<div className={s.name}>
					<EditableSpan value={userName} onChange={authThunks.changeUser} />
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
