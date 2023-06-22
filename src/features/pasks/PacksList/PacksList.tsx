import style from './PacksList.module.css'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { Pack } from './Pack/Pack'
import { PackType } from 'features/pasks/packsTypes'
import { packsSelectors } from 'features/pasks/packsSelectors'
import { packsThunks } from 'features/pasks/packsSlice'
import noCover from 'assets/img/noCover.png'

export const PacksList = () => {
	const packs = useAppSelector(packsSelectors.selectPacks)
	const params = useAppSelector(packsSelectors.selectParams)
	const sortPacks = useAppSelector(state => state.packs.searchParams.sortPacks)
	const dispatch = useAppDispatch()

	const sortDecks = (property: string) => {
		dispatch(
			packsThunks.getPacks({
				...params,
				sortPacks: sortPacks === '' ? `0${property}` : sortPacks[0] === '0' ? `1${property}` : ''
			})
		)
	}

	return (
		<TableContainer component={Paper} className={style.table}>
			{packs.length !== 0 ? (
				<Table sx={{ minWidth: 650, fontWeight: 400 }} aria-label='simple table'>
					<TableHead sx={{ backgroundColor: '#efefef' }}>
						<TableRow>
							<TableCell sx={{ fontWeight: 700 }} width='10%'>
								Cover
							</TableCell>
							<TableCell
								onClick={() => {
									sortDecks('name')
								}}
								sx={{ fontWeight: 700 }}
								width='26%'
							>
								Name
							</TableCell>
							<TableCell onClick={() => sortDecks('cardsCount')} sx={{ fontWeight: 700 }} width='20%'>
								Cards
							</TableCell>
							<TableCell
								onClick={() => {
									sortDecks('updated')
								}}
								sx={{ fontWeight: 700 }}
								width='18%'
							>
								Last Updated
							</TableCell>
							<TableCell sx={{ fontWeight: 700 }} width='16%'>
								Created by
							</TableCell>
							<TableCell sx={{ fontWeight: 700 }} width='10%'>
								Actions
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody sx={{ width: 1008 }}>
						{packs.map((pack: PackType) => (
							<Pack
								key={pack._id}
								_id={pack._id}
								user_id={pack.user_id}
								deckCover={pack.deckCover ? pack.deckCover : noCover}
								name={pack.name}
								cardsCount={pack.cardsCount}
								updated={pack.updated}
								user_name={pack.user_name}
							/>
						))}
					</TableBody>
				</Table>
			) : (
				<div className={style.emptyArrayText}>
					No decks with the entered name were found 😔. Change request parameters
				</div>
			)}
		</TableContainer>
	)
}
