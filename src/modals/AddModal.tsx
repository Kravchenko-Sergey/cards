import React from 'react'
import { BasicModal } from './BasicModal'
import style from './AddModal.module.css'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { appSelectors } from 'app/AppSelectors'
import TextField from '@mui/material/TextField'
import { Checkbox, FormControlLabel } from '@mui/material'
import { useForm } from 'react-hook-form'
import { packsThunks } from 'features/pasks/packsSlice'

type AddModalPropsType = {
	callback?: any
	setOpen?: any
	onClose?: any
}

export const AddModal = (props: AddModalPropsType) => {
	const isLoading = useAppSelector(appSelectors.selectIsLoading)
	const dispatch = useAppDispatch()

	const { register, handleSubmit, reset } = useForm()
	const onSubmit = (data: any) => {
		dispatch(
			packsThunks.createPack({ cardsPack: { name: data.packName, deckCover: 'url or base64', private: data.private } })
		)
		reset()
	}

	return (
		<BasicModal type='btn' text='Add new pack' className={style.addBtn}>
			<div className={style.container}>
				<h1 className={style.title}>Add New Pack</h1>
				<div className={style.namePack}>Name Pack</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<TextField
						id='outlined-basic'
						label='Name'
						variant='outlined'
						size='small'
						sx={{ width: 332, mt: 1 }}
						{...register('packName')}
					/>
					<FormControlLabel
						control={<Checkbox defaultChecked={false} {...register('private')} />}
						label='Private pack'
						sx={{ mt: 2, mb: 4 }}
					/>
					<div className={style.btnBlock}>
						<button type={'button'} className={style.cancelBtn}>
							Cancel
						</button>
						<button type={'submit'} className={style.addBtn} disabled={isLoading}>
							Add New Pack
						</button>
					</div>
				</form>
			</div>
		</BasicModal>
	)
}
