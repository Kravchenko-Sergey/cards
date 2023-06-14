import React, { useEffect } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import style from 'features/cards/Cards.module.css'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { Card } from './Card/Card'
import { CardType } from 'features/cards/cardsAPI'
import { cardsThunks } from 'features/cards/cardsSlice'

export const CardsList = () => {
	const cards = useAppSelector(state => state.cards.cards)
	const searchParamsCard = useAppSelector(state => state.cards.searchParamsCard)
	const dispatch = useAppDispatch()

	return (
		<TableContainer component={Paper} className={style.table}>
			{cards.length > 0 ? (
				<Table sx={{ minWidth: 650, fontWeight: 400 }} aria-label='simple table'>
					<TableHead sx={{ backgroundColor: '#efefef', fontWeight: 600 }}>
						<TableRow>
							<TableCell align='left' width='25%'>
								Question
							</TableCell>
							<TableCell align='left' width='25%'>
								Answer
							</TableCell>
							<TableCell align='left' width='20%'>
								Last Updated
							</TableCell>
							<TableCell align='left' width='20%'>
								Grade
							</TableCell>
							<TableCell align='left' width='10%'>
								Actions
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{cards.map((card: CardType) => (
							<Card
								key={card._id}
								_id={card._id}
								cardsPackId={card.cardsPack_id}
								question={card.question}
								answer={card.answer}
								updated={card.updated}
								grade={card.grade}
							/>
						))}
					</TableBody>
				</Table>
			) : (
				<div className={style.emptyArrayText}>This pack is empty. Click add new card to fill this pack</div>
			)}
		</TableContainer>
	)
}
