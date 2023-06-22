import React from 'react'
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
		dispatch(cardsThunks.updateCard({ card: { _id: props.id, question: data.newQuestion, answer: data.newAnswer } }))
		dispatch(cardsThunks.getCards({ cardsPack_id: cardsPackId }))
		reset()
	}

	const packs = useAppSelector(state => state.packs.packs)
	const index = packs.findIndex((pack: any) => pack._id === props.id)

	//select
	const [age, setAge] = React.useState('')
	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value as string)
	}
	//

	return (
		<BasicModal img={editBtn} alt={'editBtn'}>
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
						{...register('newQuestion')}
					/>
					<div className={style.namePack}>Answer</div>
					<TextField
						id='outlined-basic'
						label='Answer'
						variant='outlined'
						size='small'
						sx={{ width: 332, mt: 1 }}
						{...register('newAnswer')}
					/>
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
