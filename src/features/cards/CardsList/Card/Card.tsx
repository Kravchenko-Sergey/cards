import React, { useState } from 'react'
import { Rating, TableCell, TableRow } from '@mui/material'
import style from 'features/cards/Cards.module.css'
import editBtn from '../../../../assets/img/edit.svg'
import deleteBtn from '../../../../assets/img/delete.svg'
import { useAppDispatch } from 'common/hooks'
import { cardsThunks } from '../../cardsSlice'
import { packsThunks } from '../../../pasks/packsSlice'

export type CardPropsType = {
	_id: string
	question: string
	answer: string
	updated: string
	grade: number
}

export const Card = (props: CardPropsType) => {
	const dispatch = useAppDispatch()
	//rating
	const [value, setValue] = useState<any>(4)
	//
	const handleUpdateBtn = () => {
		dispatch(cardsThunks.updateCard({ card: { _id: props._id, question: 'update question' } }))
		dispatch(cardsThunks.getCards({}))
	}
	return (
		<TableRow key={props._id}>
			<TableCell align='left'>{props.question}</TableCell>
			<TableCell align='left'>{props.answer}</TableCell>
			<TableCell align='left'>{props.updated}</TableCell>
			<TableCell align='left'>
				<Rating
					name='simple-controlled'
					value={Math.round(props.grade)}
					onChange={(event, newValue) => {
						setValue(newValue)
					}}
				/>
			</TableCell>
			<TableCell align='left'>
				<div className={style.actionButtons}>
					<img onClick={handleUpdateBtn} src={editBtn} alt='changeBtn' />
					<img
						onClick={() => {
							dispatch(cardsThunks.deleteCard({ _id: props._id }))
							dispatch(cardsThunks.getCards({}))
						}}
						src={deleteBtn}
						alt='deleteBtn'
					/>
				</div>
			</TableCell>
		</TableRow>
	)
}
