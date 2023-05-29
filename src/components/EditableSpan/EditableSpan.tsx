import React, { ChangeEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import { authThunks } from '../../features/auth/auth.slice'
import { useAppDispatch } from '../../app/hooks'

type EditableSpanPropsType = {
	value: string | undefined
	onChange: any
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
	const dispatch = useAppDispatch()
	console.log(props)
	let [editMode, setEditMode] = useState(false)
	let [title, setTitle] = useState(props.value)

	const activateEditMode = () => {
		setEditMode(true)
		setTitle(props.value)
	}
	const activateViewMode = () => {
		setEditMode(false)
		dispatch(props.onChange({ name: title }))
	}
	const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	return editMode ? (
		<>
			<TextField value={title} onChange={changeTitle} autoFocus />
			<button onClick={activateViewMode}>SAVE</button>
		</>
	) : (
		<>
			<span>{props.value}</span>
			<button onClick={activateEditMode}>изменить имя</button>
		</>
	)
})
