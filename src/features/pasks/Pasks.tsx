import style from 'features/pasks/Packs.module.css'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from 'common/hooks'

import { PacksList } from 'features/pasks/PacksList/PacksList'
import { TopPanelTable } from 'features/pasks/TopPanelTable/TopPanelTable'
import { BottomPanelTable } from 'features/pasks/BottomPanelTable/BottomPanelTable'
import { AddModal } from 'modals/AddModal'
import { authSelectors } from 'features/auth/authSelectors'
import { packsSelectors } from 'features/pasks/packsSelectors'

export const Packs = () => {
	const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
	const myId = useAppSelector(packsSelectors.selectMyId)

	if (!isLoggedIn) {
		return <Navigate to={'/login'} />
	}

	return (
		<div className={style.container}>
			<div className={style.head}>
				<div className={style.pageName}>{myId === '' ? 'All packs' : 'My packs'}</div>
				<AddModal />
			</div>
			<TopPanelTable />
			<PacksList />
			<BottomPanelTable />
		</div>
	)
}
