import { useAppDispatch, useAppSelector, useDebounce } from 'common/hooks'
import React, { ChangeEvent, useState } from 'react'
import { FormControl, InputLabel, MenuItem, Popover, Select, SelectChangeEvent, Typography } from '@mui/material'
import style from 'features/cards/Cards.module.css'
import TextField from '@mui/material/TextField'
import Pagination from '@mui/material/Pagination'
import { Link, Navigate } from 'react-router-dom'
import leftArrow from 'assets/img/leftArrow.svg'
import settings from 'assets/img/settings.svg'
import { CardsList } from 'features/cards/CardsList/CardsList'
import { cardsThunks } from 'features/cards/cardsSlice'
import teacherBtn from 'assets/img/teacher.svg'
import editBtn from 'assets/img/edit.svg'
import deleteBtn from 'assets/img/delete.svg'
import { selectMyId } from 'features/pasks/packsSelectors'
import { selectCardsPackId, selectPackName } from 'features/cards/cardsSelectors'
import { selectIsLoggedIn } from 'features/auth/authSelectors'

export const Cards = () => {
	const isLoggedIn = useAppSelector(selectIsLoggedIn)
	const myId = useAppSelector(selectMyId)
	const packName = useAppSelector(selectPackName)
	const cardsPackId = useAppSelector(selectCardsPackId)
	const dispatch = useAppDispatch()
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
	//search
	const [searchValue, setSearchValue] = useState('')
	const debouncedValue = useDebounce(searchValue, 500)
	const handleSearchValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setSearchValue(e.currentTarget.value)
	}

	//table
	function createData(name: string, cards: number, lastUpdated: number, createdBy: number, actions: number) {
		return { name, cards, lastUpdated, createdBy, actions }
	}
	//select
	const [age, setAge] = React.useState('')
	const handleChange2 = (event: SelectChangeEvent) => {
		setAge(event.target.value)
	}
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
								<img src={teacherBtn} alt='teacherBtn' />
								<img src={editBtn} alt='editBtn' />
								<img src={deleteBtn} alt='deleteBtn' />
							</Typography>
						</Popover>
					</>
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
					<div className={style.input}>
						<TextField
							id='outlined-basic'
							value={searchValue}
							onChange={handleSearchValue}
							placeholder={'Provide your text'}
							variant='outlined'
							size='small'
							sx={{ width: '100%' }}
						/>
					</div>
				</div>
			</div>
			<CardsList />
			<div className={style.footer}>
				<div className={style.pagination}>
					<Pagination count={10} shape='rounded' color={'primary'} size={'small'} />
				</div>
				<div>Show</div>
				<div className={style.select}>
					<FormControl sx={{ minWidth: 60 }} size='small'>
						<InputLabel id='demo-select-small-label'></InputLabel>
						<Select
							labelId='demo-select-small-label'
							id='demo-select-small'
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
