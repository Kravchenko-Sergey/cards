import React, { ChangeEvent, useState } from 'react'
import editBtn from 'assets/img/edit.svg'
import style from 'modals/UpdateModal.module.css'
import { BasicModal } from 'modals/BasicModal'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { appSelectors } from 'app/AppSelectors'
import TextField from '@mui/material/TextField'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useForm } from 'react-hook-form'
import { cardsThunks } from 'features/cards/cardsSlice'
import Box from '@mui/material/Box'
import { cardsSelectors } from 'features/cards/cardsSelectors'

type UpdateCardModalPropsType = {
	callback?: any
	setOpen?: any
	onClose?: any
	id: string
}

export const UpdateCardModal = (props: UpdateCardModalPropsType) => {
	const isLoading = useAppSelector(appSelectors.selectIsLoading)
	const cardsPackId = useAppSelector(cardsSelectors.selectCardsPackId)
	const dispatch = useAppDispatch()

	const { register, handleSubmit, reset } = useForm()
	const onSubmit = (data: any) => {
		if (age === 'Text') {
			dispatch(
				cardsThunks.updateCard({
					card: { _id: props.id, question: data.question, answer: data.answer }
				})
			)
			dispatch(cardsThunks.getCards({ cardsPack_id: cardsPackId }))
			reset()
		}
		dispatch(
			cardsThunks.updateCard({
				card: { _id: props.id, questionImg: newQuestion, answerImg: newAnswer }
			})
		)
		dispatch(cardsThunks.getCards({ cardsPack_id: cardsPackId }))
	}

	const packs = useAppSelector(state => state.packs.packs)
	const index = packs.findIndex((pack: any) => pack._id === props.id)

	//select
	const [age, setAge] = React.useState('')
	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value as string)
	}
	//
	const [newQuestion, setNewQuestion] = useState('')
	const [newAnswer, setNewAnswer] = useState('')
	const handleUpload = (e: ChangeEvent<HTMLInputElement>, setState: any) => {
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0]
			console.log('file ', file)

			if (file.size < 4000000) {
				// https://developer.mozilla.org/ru/docs/Web/API/FileReader/FileReader
				const reader = new FileReader()

				reader.onloadend = () => {
					const file64 = reader.result as string
					console.log('file64: ', file64)
					setState(file64)
				}
				// https://developer.mozilla.org/ru/docs/Web/API/FileReader/readAsDataURL
				reader.readAsDataURL(file)
			} else {
				console.error('Error: ', 'Файл слишком большого размера')
			}
		}
	}
	console.log(age)

	return (
		<BasicModal img={editBtn} alt={'editBtn'} className={style.updateBtn}>
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
								<input type='file' onChange={e => handleUpload(e, setNewQuestion)} style={{ display: 'none' }} />
								<div className={style.downloadBtn}>
									{newQuestion === '' ? 'upload question image' : 'change question image'}
								</div>
							</label>
							{newQuestion === '' ? <div></div> : <img className={style.deckCover} src={newQuestion} alt='deckCover' />}
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
								<input type='file' onChange={e => handleUpload(e, setNewAnswer)} style={{ display: 'none' }} />
								<div className={style.downloadBtn}>
									{newAnswer === '' ? 'upload answer image' : 'change answer image'}
								</div>
							</label>
							{newAnswer === '' ? <div></div> : <img className={style.deckCover} src={newAnswer} alt='deckCover' />}
						</>
					)}
					<div className={style.btnBlock}>
						<button type={'button'} className={style.cancelBtn}>
							Cancel
						</button>
						<button type={'submit'} className={style.updateBtn} disabled={isLoading}>
							Save changes
						</button>
					</div>
				</form>
			</div>
		</BasicModal>
	)
}
