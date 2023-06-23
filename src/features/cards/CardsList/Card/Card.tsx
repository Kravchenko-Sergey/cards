import React, { useState } from 'react'
import { Rating, TableCell, TableRow } from '@mui/material'
import style from 'features/cards/CardsList/Card/Card.module.css'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { cardsThunks } from 'features/cards/cardsSlice'
import { UpdateCardModal } from 'modals/UpadateCardModal'
import { DeleteCardModal } from 'modals/DeleteCardModal'

export type CardPropsType = {
	_id: string
	cardsPackId: string
	question: string
	questionImg: string
	answer: string
	answerImg: string
	updated: string
	grade: number
}

export const Card = (props: CardPropsType) => {
	const myId = useAppSelector(state => state.packs.searchParams.user_id)
	const dispatch = useAppDispatch()
	//rating
	const [value, setValue] = useState<any>(4)
	//
	const handleUpdateBtn = () => {
		dispatch(cardsThunks.updateCard({ card: { _id: props._id, question: 'update question' } }))
		dispatch(cardsThunks.getCards({ cardsPack_id: props.cardsPackId }))
	}
	return (
		<TableRow key={props._id}>
			<TableCell align='left'>
				{!props.questionImg ? (
					props.question
				) : (
					<img className={style.cardQuestionImg} src={props.questionImg} alt='dsaf' />
				)}
			</TableCell>
			<TableCell align='left'>
				{!props.answerImg ? props.answer : <img className={style.cardQuestionImg} src={props.answerImg} alt='dsaf' />}
			</TableCell>
			<TableCell align='left'>{props.updated}</TableCell>
			<TableCell align='left'>
				<Rating
					name='simple-controlled'
					value={Math.round(props.grade)}
					onChange={newValue => {
						setValue(newValue)
					}}
				/>
			</TableCell>
			{myId !== '' && (
				<TableCell align='left'>
					<div className={style.actionButtons}>
						<UpdateCardModal id={props._id} />
						<DeleteCardModal
							callback={() => {
								dispatch(cardsThunks.deleteCard({ id: props._id }))
								dispatch(cardsThunks.getCards({ cardsPack_id: props.cardsPackId }))
							}}
							question={props.question}
						/>
					</div>
				</TableCell>
			)}
		</TableRow>
	)
}
