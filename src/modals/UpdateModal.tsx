import React from 'react'
import editBtn from 'assets/img/edit.svg'
import style from 'modals/UpdateModal.module.css'
import { BasicModal } from 'modals/BasicModal'
import { useAppSelector } from 'common/hooks'
import { appSelectors } from 'app/AppSelectors'
import TextField from '@mui/material/TextField'
import { Checkbox, FormControlLabel } from '@mui/material'

type UpdateModalPropsType = {
	callback?: any
	setOpen?: any
	onClose?: any
}

export const UpdateModal = (props: UpdateModalPropsType) => {
	const isLoading = useAppSelector(appSelectors.selectIsLoading)
	return (
		<BasicModal img={editBtn} alt={'editBtn'}>
			<div className={style.container}>
				<h1 className={style.title}>Edit Pack</h1>
				<div className={style.namePack}>Name Pack</div>
				<TextField id='outlined-basic' label='Name' variant='outlined' size='small' sx={{ width: 332, mt: 1 }} />
				<FormControlLabel control={<Checkbox defaultChecked={false} />} label='Private pack' sx={{ mt: 2, mb: 4 }} />
				<div className={style.btnBlock}>
					<button className={style.cancelBtn}>Cancel</button>
					<button onClick={props.callback} className={style.updateBtn} disabled={isLoading}>
						Save changes
					</button>
				</div>
			</div>
		</BasicModal>
	)
}
