import React from 'react'
import editBtn from 'assets/img/edit.svg'
import style from 'modals/UpdateModal.module.css'
import { BasicModal } from 'modals/BasicModal'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { appSelectors } from 'app/AppSelectors'
import TextField from '@mui/material/TextField'
import { Checkbox, FormControlLabel } from '@mui/material'
import { useForm } from 'react-hook-form'
import { packsThunks } from 'features/pasks/packsSlice'

type UpdateModalPropsType = {
	callback?: any
	setOpen?: any
	onClose?: any
	id?: string
}

export const UpdateModal = (props: UpdateModalPropsType) => {
	const isLoading = useAppSelector(appSelectors.selectIsLoading)
	const dispatch = useAppDispatch()

	const { register, handleSubmit, reset } = useForm()
	const onSubmit = (data: any) => {
		dispatch(packsThunks.updatePack({ cardsPack: { _id: props.id, name: data.newPackName, private: data.private } }))
		reset()
	}

	const packs = useAppSelector(state => state.packs.packs)
	const index = packs.findIndex((pack: any) => pack._id === props.id)

	return (
		<BasicModal img={editBtn} alt={'editBtn'}>
			<div className={style.container}>
				<h1 className={style.title}>Edit Pack</h1>
				<div className={style.namePack}>Name Pack</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<TextField
						id='outlined-basic'
						label='Name'
						variant='outlined'
						size='small'
						sx={{ width: 332, mt: 1 }}
						{...register('newPackName')}
					/>
					<FormControlLabel
						control={<Checkbox defaultChecked={packs[index].private} {...register('private')} />}
						label='Private pack'
						sx={{ mt: 2, mb: 4 }}
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
