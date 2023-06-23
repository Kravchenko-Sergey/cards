import React, { ChangeEvent, useState } from 'react'
import { BasicModal } from './BasicModal'
import style from './AddModal.module.css'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { appSelectors } from 'app/AppSelectors'
import TextField from '@mui/material/TextField'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useForm } from 'react-hook-form'
import Box from '@mui/material/Box'
import { cardsThunks } from 'features/cards/cardsSlice'
import { cardsSelectors } from 'features/cards/cardsSelectors'

type AddCardModalPropsType = {
	callback?: any
	setOpen?: any
	onClose?: any
}

export const AddCardModal = (props: AddCardModalPropsType) => {
	const isLoading = useAppSelector(appSelectors.selectIsLoading)
	const cardsPackId = useAppSelector(cardsSelectors.selectCardsPackId)
	const dispatch = useAppDispatch()

	const { register, handleSubmit, reset } = useForm()
	const onSubmit = (data: any) => {
		if (age === 'Text') {
			dispatch(
				cardsThunks.createCard({
					card: { cardsPack_id: cardsPackId, question: data.question, answer: data.answer }
				})
			)
			dispatch(cardsThunks.getCards({ cardsPack_id: cardsPackId }))
			reset()
		}
		dispatch(
			cardsThunks.createCard({
				card: { cardsPack_id: cardsPackId, questionImg: question, answerImg: answer }
			})
		)
		dispatch(cardsThunks.getCards({ cardsPack_id: cardsPackId }))
	}
	//select
	const [age, setAge] = React.useState('')
	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value as string)
	}
	//
	const [question, setQuestion] = useState('')
	const [answer, setAnswer] = useState('')
	const handleUpload = (e: ChangeEvent<HTMLInputElement>, setState: any) => {
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0]
			if (file.size < 4000000) {
				const reader = new FileReader()
				reader.onloadend = () => {
					const file64 = reader.result as string
					setState(file64)
				}
				reader.readAsDataURL(file)
			} else {
				console.error('Error: ', 'Файл слишком большого размера')
			}
		}
	}

	return (
		<BasicModal type='btn' text='Add new card' className={style.addBtn}>
			<div className={style.container}>
				<h1 className={style.title}>Add New Card</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box sx={{ minWidth: 120 }}>
						<FormControl fullWidth>
							<InputLabel id='demo-simple-select-label'></InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={age}
								onChange={handleChange}
								size={'small'}
							>
								<MenuItem value={'Text'}>Text</MenuItem>
								<MenuItem value={'Image'}>Image</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<div className={style.namePack}>Question</div>
					{age === 'Text' ? (
						<TextField
							id='outlined-basic'
							label='Question'
							variant='outlined'
							size='small'
							sx={{ width: 332, mt: 1 }}
							{...register('question')}
						/>
					) : (
						<>
							<label>
								<input type='file' onChange={e => handleUpload(e, setQuestion)} style={{ display: 'none' }} />
								<div className={style.downloadBtn}>
									{question === '' ? 'upload question image' : 'change question image'}
								</div>
							</label>
							{question === '' ? <div></div> : <img className={style.deckCover} src={question} alt='deckCover' />}
						</>
					)}
					<div className={style.namePack}>Answer</div>
					{age === 'Text' ? (
						<TextField
							id='outlined-basic'
							label='Answer'
							variant='outlined'
							size='small'
							sx={{ width: 332, mt: 1 }}
							{...register('answer')}
						/>
					) : (
						<>
							<label>
								<input type='file' onChange={e => handleUpload(e, setAnswer)} style={{ display: 'none' }} />
								<div className={style.downloadBtn}>{answer === '' ? 'upload answer image' : 'change answer image'}</div>
							</label>
							{answer === '' ? <div></div> : <img className={style.deckCover} src={answer} alt='deckCover' />}
						</>
					)}
					<div className={style.btnBlock}>
						<button type={'button'} className={style.cancelBtn}>
							Cancel
						</button>
						<button type={'submit'} className={style.addBtn} disabled={isLoading}>
							Add New Card
						</button>
					</div>
				</form>
			</div>
		</BasicModal>
	)
}
