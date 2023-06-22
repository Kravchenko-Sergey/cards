import React, { ChangeEvent, useState } from 'react'
import { BasicModal } from './BasicModal'
import style from './AddModal.module.css'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { appSelectors } from 'app/AppSelectors'
import TextField from '@mui/material/TextField'
import { Checkbox, FormControlLabel } from '@mui/material'
import { useForm } from 'react-hook-form'
import { packsThunks } from 'features/pasks/packsSlice'
import { cardsThunks } from 'features/cards/cardsSlice'

type AddModalPropsType = {
	callback?: any
	setOpen?: any
	onClose?: any
	id?: string
}

export const AddModal = (props: AddModalPropsType) => {
	const isLoading = useAppSelector(appSelectors.selectIsLoading)
	const dispatch = useAppDispatch()

	const [file, setFile] = useState('')
	const [fileDownload, setFileDownload] = useState(false)

	const { register, handleSubmit, reset } = useForm()
	const onSubmit = (data: any) => {
		dispatch(packsThunks.createPack({ cardsPack: { name: data.packName, deckCover: file, private: data.private } }))
		reset()
	}

	const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0]
			console.log('file ', file)

			if (file.size < 4000000) {
				// https://developer.mozilla.org/ru/docs/Web/API/FileReader/FileReader
				const reader = new FileReader()

				reader.onloadend = () => {
					const file64 = reader.result as string
					console.log('file64: ', file64)
					setFile(file64)
				}
				// https://developer.mozilla.org/ru/docs/Web/API/FileReader/readAsDataURL
				reader.readAsDataURL(file)
			} else {
				console.error('Error: ', 'Файл слишком большого размера')
			}
		}
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
					<label>
						<input type='file' onChange={handleUpload} style={{ display: 'none' }} />
						<div className={style.downloadBtn}>{file === '' ? 'download deck cover' : 'change deck cover'}</div>
					</label>
					{file === '' ? <div></div> : <img className={style.deckCover} src={file} alt='deckCover' />}
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
