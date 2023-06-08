import React from 'react'
import { TableCell, TableRow } from '@mui/material'
import style from '../Pack/Pack.module.css'
import teacherBtn from '../../../../assets/img/teacher.svg'
import { packsThunks } from 'features/pasks/packsSlice'
import editBtn from '../../../../assets/img/edit.svg'
import deleteBtn from '../../../../assets/img/delete.svg'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { cardsThunks } from 'features/cards/cardsSlice'

type PackPropsType = {
	_id: string
	user_id: string
	user_name: string
	name: string
	cardsCount: number
	updated: string
}

export const Pack = (props: PackPropsType) => {
	const myId = useAppSelector(state => state.auth.profile?._id)
	const dispatch = useAppDispatch()

	const handleRowName = (id: string) => {
		dispatch(cardsThunks.getCards({ cardsPack_id: id }))
	}

	const handleTeacherBtn = () => {}

	const handleUpdateBtn = () => {
		//dispatch(packsThunks.updatePackName(props.name))
		dispatch(packsThunks.getMyPacks({}))
	}

	const handleDeleteBtn = (id: string) => {
		dispatch(packsThunks.deletePack({ _id: id }))
		dispatch(packsThunks.getAllPacks({}))
	}

	return (
		<TableRow>
			<TableCell onClick={() => handleRowName(props._id)}>{props.name}</TableCell>
			<TableCell>{props.cardsCount}</TableCell>
			<TableCell>{props.updated}</TableCell>
			<TableCell>{props.user_name}</TableCell>
			<TableCell>
				<div className={style.actionButtons}>
					{props.user_id === myId ? (
						<>
							<img onClick={handleTeacherBtn} src={teacherBtn} alt='teacherBtn' />
							<img onClick={handleUpdateBtn} src={editBtn} alt='updateBtn' />
							<img
								onClick={() => {
									handleDeleteBtn(props._id)
								}}
								src={deleteBtn}
								alt='deleteBtn'
							/>
						</>
					) : (
						<img onClick={handleTeacherBtn} src={teacherBtn} alt='teacherBtn' />
					)}
				</div>
			</TableCell>
		</TableRow>
	)
}
