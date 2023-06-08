import React from 'react'
import style from './Packs.module.css'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { packsThunks } from 'features/pasks/packsSlice'
import { PacksList } from './PacksList/PacksList'
import { TopPanelTable } from './TopPanelTable/TopPanelTable'
import { BottomPanelTable } from './BottomPanelTable/BottomPanelTable'
import { AddModal } from 'modals/AddModal'

function DeleteModal() {
	return null
}

export const Packs = () => {
	const dispatch = useAppDispatch()

	const handleCreatePack = () => {
		dispatch(packsThunks.createPack({ cardsPack: { name: 'test deck', deckCover: 'url or base64', private: false } }))
		dispatch(packsThunks.getPacks({}))
	}

	const isLoggedIn = useAppSelector<any>(state => state.auth.isLoggedIn)

	if (!isLoggedIn) {
		return <Navigate to={'/login'} />
	}

	return (
		<div className={style.container}>
			<div className={style.head}>
				<div className={style.pageName}>Packs list</div>
				<button onClick={handleCreatePack} className={style.button}>
					Add new pack
				</button>
			</div>
			<TopPanelTable />
			<PacksList />
			<BottomPanelTable />
		</div>
	)
}
