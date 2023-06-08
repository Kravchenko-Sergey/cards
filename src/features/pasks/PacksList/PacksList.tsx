import React from 'react'
import style from './PacksList.module.css'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useAppSelector } from 'common/hooks'
import { Pack } from './Pack/Pack'
import { PackType } from 'features/pasks/packsTypes'
/*import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'*/

export const PacksList = () => {
	const packs = useAppSelector(state => state.packs.packs)

	return (
		<TableContainer component={Paper} className={style.table}>
			<Table sx={{ minWidth: 650, fontWeight: 400 }} aria-label='simple table'>
				<TableHead sx={{ backgroundColor: '#efefef' }}>
					<TableRow>
						<TableCell sx={{ fontWeight: 700 }} width='28%'>
							Name
						</TableCell>
						<TableCell sx={{ fontWeight: 700 }} width='22%'>
							Cards
						</TableCell>
						<TableCell sx={{ fontWeight: 700 }} width='20%'>
							Last Updated
						</TableCell>
						<TableCell sx={{ fontWeight: 700 }} width='18%'>
							Created by
						</TableCell>
						<TableCell sx={{ fontWeight: 700 }} width='12%'>
							Actions
						</TableCell>
					</TableRow>
				</TableHead>
				{packs.length !== 0 ? (
					<TableBody sx={{ width: 1008 }}>
						{packs.map((pack: PackType) => (
							<Pack
								key={pack._id}
								_id={pack._id}
								user_id={pack.user_id}
								name={pack.name}
								cardsCount={pack.cardsCount}
								updated={pack.updated}
								user_name={pack.user_name}
							/>
						))}
					</TableBody>
				) : (
					<div className={style.emptyArrayText}>
						No decks with the entered name were found. Change request parameters
					</div>
				)}
			</Table>
		</TableContainer>
	)
}
