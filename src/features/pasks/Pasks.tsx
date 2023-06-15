import React from 'react'
import style from 'features/pasks/Packs.module.css'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { packsThunks } from 'features/pasks/packsSlice'
import { PacksList } from 'features/pasks/PacksList/PacksList'
import { TopPanelTable } from 'features/pasks/TopPanelTable/TopPanelTable'
import { BottomPanelTable } from 'features/pasks/BottomPanelTable/BottomPanelTable'
import { AddModal } from '../../modals/AddModal'

export const Packs = () => {
	const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
	const isLoading = useAppSelector(state => state.app.isLoading)
	const myId = useAppSelector(state => state.packs.searchParams.user_id)
	const dispatch = useAppDispatch()

	const handleCreatePack = () => {
		dispatch(packsThunks.createPack({ cardsPack: { name: 'test deck', deckCover: 'url or base64', private: false } }))
	}

	if (!isLoggedIn) {
		return <Navigate to={'/login'} />
	}

	return (
		<div className={style.container}>
			<div className={style.head}>
				<div className={style.pageName}>{myId === '' ? 'All packs' : 'My packs'}</div>
				{/*<button onClick={handleCreatePack} className={style.button} disabled={isLoading}>
					Add new pack
				</button>*/}
				<AddModal callback={handleCreatePack} />
			</div>
			<TopPanelTable />
			<PacksList />
			<BottomPanelTable />
		</div>
	)
}
