import React from 'react'
import style from 'features/pasks/Packs.module.css'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { packsThunks } from 'features/pasks/packsSlice'
import { PacksList } from 'features/pasks/PacksList/PacksList'
import { TopPanelTable } from 'features/pasks/TopPanelTable/TopPanelTable'
import { BottomPanelTable } from 'features/pasks/BottomPanelTable/BottomPanelTable'

export const Packs = () => {
	const myId = useAppSelector(state => state.auth.profile?._id)
	//const packUserId = useAppSelector((state: any) => state.packs.packs[0].user_id)
	const dispatch = useAppDispatch()

	const handleCreatePack = () => {
		dispatch(packsThunks.createPack({ cardsPack: { name: 'test deck', deckCover: 'url or base64', private: false } }))
	}

	const isLoggedIn = useAppSelector<any>(state => state.auth.isLoggedIn)

	if (!isLoggedIn) {
		return <Navigate to={'/login'} />
	}

	return (
		<div className={style.container}>
			<div className={style.head}>
				{myId === '' ? (
					<>
						<div className={style.pageName}>All packs</div>
						<button onClick={handleCreatePack} className={style.button}>
							Add new pack
						</button>
					</>
				) : (
					<div className={style.pageName}>Friends packs</div>
				)}
			</div>

			<TopPanelTable />
			<PacksList />
			<BottomPanelTable />
		</div>
	)
}
