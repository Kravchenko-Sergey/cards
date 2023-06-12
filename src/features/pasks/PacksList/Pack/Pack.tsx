import React from 'react'
import { TableCell, TableRow } from '@mui/material'
import style from 'features/pasks/PacksList/Pack/Pack.module.css'
import teacherBtn from 'assets/img/teacher.svg'
import { packsThunks } from 'features/pasks/packsSlice'
import editBtn from 'assets/img/edit.svg'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { cardsThunks } from 'features/cards/cardsSlice'
import { DeleteModal } from 'modals/DeleteModal'
import { useNavigate } from 'react-router-dom'

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
	const params = useAppSelector(state => state.packs.searchParams)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const handleRowName = (id: string) => {
		dispatch(cardsThunks.getCards({ cardsPack_id: id }))
			.unwrap()
			.then(() => {
				navigate('/cards')
			})
	}

	const handleTeacherBtn = (id: string) => {
		dispatch(cardsThunks.getCards({ cardsPack_id: id, pageCount: 100 }))
			.unwrap()
			.then(() => {
				navigate('/learn')
			})
	}

	const handleUpdateBtn = () => {
		dispatch(packsThunks.updatePack({ cardsPack: { _id: props._id, name: 'updated deck' } }))
	}

	const handleDeleteBtn = () => {
		dispatch(packsThunks.deletePack({ _id: props._id }))
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
							<img onClick={() => handleTeacherBtn(props._id)} src={teacherBtn} alt='teacherBtn' />
							<img onClick={handleUpdateBtn} src={editBtn} alt='updateBtn' />
							<DeleteModal callback={handleDeleteBtn} />
						</>
					) : (
						<img onClick={() => handleTeacherBtn(props._id)} src={teacherBtn} alt='teacherBtn' />
					)}
				</div>
			</TableCell>
		</TableRow>
	)
}
