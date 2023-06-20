import { useAppDispatch, useAppSelector, useDebounce } from 'common/hooks'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { FormControl, InputLabel, MenuItem, Popover, Select, SelectChangeEvent, Typography } from '@mui/material'
import style from 'features/cards/Cards.module.css'
import TextField from '@mui/material/TextField'
import Pagination from '@mui/material/Pagination'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import leftArrow from 'assets/img/leftArrow.svg'
import settings from 'assets/img/settings.svg'
import { CardsList } from 'features/cards/CardsList/CardsList'
import { cardsThunks } from 'features/cards/cardsSlice'
import teacherBtn from 'assets/img/teacher.svg'
import editBtn from 'assets/img/edit.svg'
import deleteBtn from 'assets/img/delete.svg'
import { packsSelectors } from 'features/pasks/packsSelectors'
import { cardsSelectors } from 'features/cards/cardsSelectors'
import { authSelectors } from 'features/auth/authSelectors'
import { packsThunks } from 'features/pasks/packsSlice'
import { DeleteModal } from 'modals/DeleteModal'
import { appSelectors } from 'app/AppSelectors'

export const Cards = () => {
	const isLoading = useAppSelector(appSelectors.selectIsLoading)
	const params = useAppSelector(state => state.cards.searchParamsCard)
	const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
	const myId = useAppSelector(packsSelectors.selectMyId)
	const packName = useAppSelector(cardsSelectors.selectPackName)
	const cardsPackId = useAppSelector(cardsSelectors.selectCardsPackId)
	const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
	const pageCount = useAppSelector(state => state.cards.pageCount)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	//popover
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	const open = Boolean(anchorEl)
	const id = open ? 'simple-popover' : undefined

	const handleTeacherBtn = () => {
		dispatch(cardsThunks.getCards({ cardsPack_id: cardsPackId, pageCount: 100 }))
			.unwrap()
			.then(() => {
				navigate('/learn')
			})
	}
	const handleUpdateBtn = () => {
		dispatch(packsThunks.updatePack({ cardsPack: { _id: cardsPackId, name: 'updated deck' } }))
		setTimeout(() => {
			dispatch(cardsThunks.getCards({ cardsPack_id: cardsPackId }))
				.unwrap()
				.then(() => {
					navigate('/cards')
				})
		}, 1000)
	}
	const handleDeleteBtn = () => {
		dispatch(packsThunks.deletePack({ _id: cardsPackId }))
			.unwrap()
			.then(() => {
				navigate('/packs')
			})
	}
	//search
	const [searchValue, setSearchValue] = useState('')
	const debouncedValue = useDebounce(searchValue, 500)
	const handleSearchValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setSearchValue(e.currentTarget.value)
	}

	useEffect(() => {
		dispatch(cardsThunks.getCards({ ...params, cardQuestion: debouncedValue }))
	}, [debouncedValue])

	//table
	function createData(name: string, cards: number, lastUpdated: number, createdBy: number, actions: number) {
		return { name, cards, lastUpdated, createdBy, actions }
	}
	const [page, setPage] = useState(1)
	const [totalPagesNumber, setTotalPagesNumber] = useState(1)
	//select
	const [age, setAge] = React.useState('4')
	const handleChange2 = (event: SelectChangeEvent) => {
		setAge(event.target.value)
		dispatch(cardsThunks.getCards({ ...params, pageCount: Number(event.target.value) }))
			.unwrap()
			.then(res => {
				setTotalPagesNumber(Math.ceil(res.cardsTotalCount / res.pageCount))
			})
		console.log(params)
	}

	useEffect(() => {
		setTimeout(() => {
			dispatch(cardsThunks.getCards({ ...params, page: 1, pageCount: 4 }))
			setTotalPagesNumber(Math.ceil(cardsTotalCount / pageCount))
		}, 1000)
	}, [])

	//
	const handleCreateCard = () => {
		dispatch(
			cardsThunks.createCard({
				card: { cardsPack_id: cardsPackId, question: 'test question', answer: 'test answer' }
			})
		)
		dispatch(cardsThunks.getCards({ cardsPack_id: cardsPackId }))
	}

	if (!isLoggedIn) {
		return <Navigate to={'/login'} />
	}

	return (
		<div className={style.container}>
			<Link to='/packs' className={style.backBtnBlock}>
				<img src={leftArrow} alt='leftArrow' />
				<span className={style.backBtnText}>Back to Packs List</span>
			</Link>
			<div className={style.head}>
				<div className={style.myPackBlock}>
					<div className={style.pageName}>{packName}</div>
					{(cardsTotalCount !== 0 || myId !== '') && (
						<>
							<img src={settings} alt='settings' onClick={handleClick} />
							<Popover
								id={id}
								open={open}
								anchorEl={anchorEl}
								onClose={handleClose}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left'
								}}
							>
								<Typography className={style.popover}>
									{cardsTotalCount !== 0 && myId !== '' && (
										<>
											<img src={teacherBtn} alt='teacherBtn' onClick={handleTeacherBtn} />
											<img src={editBtn} alt='editBtn' onClick={handleUpdateBtn} />
											<DeleteModal callback={handleDeleteBtn} />
										</>
									)}
									{cardsTotalCount === 0 && myId !== '' && (
										<>
											<img src={editBtn} alt='editBtn' onClick={handleUpdateBtn} />
											<DeleteModal callback={handleDeleteBtn} />
										</>
									)}
									{cardsTotalCount !== 0 && myId === '' && (
										<img src={teacherBtn} alt='teacherBtn' onClick={handleTeacherBtn} />
									)}
								</Typography>
							</Popover>
						</>
					)}
				</div>
				{myId !== '' && (
					<button onClick={handleCreateCard} className={style.button}>
						Add new card
					</button>
				)}
			</div>
			<div className={style.headersTable}>
				<div className={`${style.labelBlock} ${style.search}`}>
					<div className={style.label}>Search</div>
					<TextField
						id='outlined-basic'
						value={searchValue}
						onChange={handleSearchValue}
						placeholder={'🔍 Provide your text'}
						variant='outlined'
						size='small'
						sx={{ width: '100%' }}
						className={style.input}
					/>
				</div>
			</div>
			<CardsList />
			<div className={style.footer}>
				<div className={style.pagination}>
					<Pagination
						count={Math.ceil(cardsTotalCount / pageCount)}
						page={page}
						onChange={(e: any) => {
							setPage(Number(e.target.innerText))
							dispatch(
								cardsThunks.getCards({ ...params, page: Number(e.currentTarget.innerText), pageCount: Number(age) })
							)
							setTotalPagesNumber(Math.ceil(cardsTotalCount / pageCount))
						}}
						shape='rounded'
						color={'primary'}
						size={'small'}
						disabled={isLoading}
					/>
				</div>
				<div>Show</div>
				<div className={style.select}>
					<FormControl sx={{ minWidth: 60 }} size='small'>
						<InputLabel id='demo-select-small-label'></InputLabel>
						<Select
							labelId='demo-select-small-label'
							id='demo-select-small'
							value={age}
							onChange={handleChange2}
							sx={{ minWidth: 64, height: 24 }}
						>
							<MenuItem value={4}>4</MenuItem>
							<MenuItem value={8}>8</MenuItem>
							<MenuItem value={16}>16</MenuItem>
						</Select>
					</FormControl>
				</div>
				<div>Cards per Page</div>
			</div>
		</div>
	)
}
