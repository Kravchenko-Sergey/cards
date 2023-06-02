import React, { ChangeEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import { useAppDispatch } from 'common/hooks'
import style from './EditableSpan.module.css'

type EditableSpanPropsType = {
	value: string | undefined
	onChange: any
	error: string
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
			dispatch(props.onChange({ name: title }))
		}
	}
	const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	return editMode ? (
		<>
			<TextField value={title} onChange={changeTitle} autoFocus />
			{title?.length === 0 && <div className={style.inputError}>{props.error}</div>}
			<button onClick={activateViewMode}>SAVE</button>
		</>
	) : (
		<>
			<span>{props.value}</span>
			<button onClick={activateEditMode}>изменить имя</button>
		</>
	)
})
