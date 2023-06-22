import { TableCell, TableRow } from '@mui/material'
import style from 'features/pasks/PacksList/Pack/Pack.module.css'
import teacherBtn from 'assets/img/teacher.svg'
import { packsThunks } from 'features/pasks/packsSlice'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { cardsThunks } from 'features/cards/cardsSlice'
import { DeleteModal } from 'modals/DeleteModal'
import { useNavigate } from 'react-router-dom'
import { UpdateModal } from 'modals/UpdateModal'

type PackPropsType = {
	_id: string
	user_id: string
	user_name: string
	name: string
	cardsCount: number
	updated: string
	deckCover: string
}

export const Pack = (props: PackPropsType) => {
	const isLoading = useAppSelector(state => state.app.isLoading)
	const myId = useAppSelector(state => state.auth.profile?._id)
	const params = useAppSelector(state => state.packs.searchParams)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

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

	const handleDeleteBtn = () => {
		dispatch(packsThunks.deletePack({ _id: props._id }))
	}

	return (
		<TableRow>
			<TableCell>{props.deckCover}</TableCell>
			<TableCell onClick={() => handleRowName(props._id)}>{props.name}</TableCell>
			<TableCell>{props.cardsCount}</TableCell>
			<TableCell>{props.updated}</TableCell>
			<TableCell>{props.user_name}</TableCell>
			<TableCell>
				<div className={style.actionButtons}>
					{props.cardsCount !== 0 && (
						<img onClick={() => handleTeacherBtn(props._id)} src={teacherBtn} alt='teacherBtn' />
					)}
					{props.user_id === myId && (
						<>
							<UpdateModal id={props._id} />
							{/*<img onClick={handleUpdateBtn} src={editBtn} alt='updateBtn' />*/}
							<DeleteModal callback={handleDeleteBtn} id={props._id} />
						</>
					)}
				</div>
			</TableCell>
		</TableRow>
	)
}
