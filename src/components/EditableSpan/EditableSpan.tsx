import React, { ChangeEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import { useAppDispatch } from 'common/hooks'
import style from './EditableSpan.module.css'
import edit from 'assets/img/edit.svg'

type EditableSpanPropsType = {
	value: string | undefined
	onChange: any
	_id?: string
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
	const dispatch = useAppDispatch()

	let [editMode, setEditMode] = useState(false)
	let [title, setTitle] = useState(props.value)

	const activateEditMode = () => {
		setEditMode(true)
		setTitle(props.value)
	}
	const activateViewMode = () => {
		setEditMode(false)
		if (title?.length === 0) {
			setEditMode(true)
		} else {
			dispatch(props.onChange({ _id: props._id, name: title }))
		}
	}
	const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	return (
		<div className={style.editBlock}>
			{editMode ? (
				<>
					<div>
						<TextField value={title} onChange={changeTitle} size='small' variant='standard' autoFocus />
					</div>
					<button onClick={activateViewMode} className={style.button}>
						SAVE
					</button>
				</>
			) : (
				<>
					<span>{props.value}</span>
					<img onClick={activateEditMode} src={edit} alt='edit' />
				</>
			)}
		</div>
	)
})
