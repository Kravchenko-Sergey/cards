import React from 'react'
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
		dispatch(
			cardsThunks.createCard({
				card: { cardsPack_id: cardsPackId, question: data.question, answer: data.answer }
			})
		)
		dispatch(cardsThunks.getCards({ cardsPack_id: cardsPackId }))
		reset()
	}
	//select
	const [age, setAge] = React.useState('')
	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value as string)
	}
	//
	return (
		<BasicModal type='btn' text='Add new card' className={style.addBtn}>
			<div className={style.container}>
				<h1 className={style.title}>Add New Card</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box sx={{ minWidth: 120 }}>
						<FormControl fullWidth>
							<InputLabel id='demo-simple-select-label'>Age</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={age}
								label='Age'
								onChange={handleChange}
								size={'small'}
							>
								<MenuItem value={'Text'}>Text</MenuItem>
								<MenuItem value={'Image'}>Image</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<div className={style.namePack}>Question</div>
					<TextField
						id='outlined-basic'
						label='Question'
						variant='outlined'
						size='small'
						sx={{ width: 332, mt: 1 }}
						{...register('question')}
					/>
					<div className={style.namePack}>Answer</div>
					<TextField
						id='outlined-basic'
						label='Answer'
						variant='outlined'
						size='small'
						sx={{ width: 332, mt: 1 }}
						{...register('answer')}
					/>
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
