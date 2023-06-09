import React from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import style from '../Cards.module.css'
import { CardType } from '../cardsSlice'
import { useAppSelector } from '../../../common/hooks'
import { Card } from './Card/Card'

export const CardsList = () => {
	const cards = useAppSelector(state => state.cards.cards)

	return (
		<TableContainer component={Paper} className={style.table}>
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
							question={card.question}
							answer={card.answer}
							updated={card.updated}
							grade={card.grade}
						/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
