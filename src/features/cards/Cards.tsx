import { useAppDispatch, useAppSelector } from 'common/hooks'
import React, { useEffect } from 'react'
import { packsThunks } from 'features/pasks/packsSlice'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import style from './Cards.module.css'
import TextField from '@mui/material/TextField'
import Pagination from '@mui/material/Pagination'
import { Link } from 'react-router-dom'
import leftArrow from '../../assets/img/leftArrow.svg'
import settings from '../../assets/img/settings.svg'
import { CardsList } from './CardsList/CardsList'
import { cardsThunks } from './cardsSlice'

export const Cards = () => {
	const cards = useAppSelector(state => state.cards.cards)
	const myId = useAppSelector(state => state.auth.profile?._id)
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(packsThunks.getPacks({}))
	}, [])
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
	const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
	/*if (!isLoggedIn) {
		return <Navigate to={'/login'} />
	}*/
	const handleCreateCard = () => {
		dispatch(
			cardsThunks.createCard({
				card: { cardsPack_id: '648339f3b859820c1448eb46', question: 'test question', answer: 'test answer' }
			})
		)
		dispatch(cardsThunks.getCards({}))
	}

	return (
		<div className={style.container}>
			<Link to='/packs' className={style.backBtnBlock}>
				<img src={leftArrow} alt='leftArrow' />
				<span className={style.backBtnText}>Back to Packs List</span>
			</Link>
			<div className={style.head}>
				<div className={style.myPackBlock}>
					<div className={style.pageName}>My Pack</div>
					<img src={settings} alt='settings' />
				</div>
				<button onClick={handleCreateCard} className={style.button}>
					Add new card
				</button>
			</div>
			<div className={style.headersTable}>
				<div className={`${style.labelBlock} ${style.search}`}>
					<div className={style.label}>Search</div>
					<div className={style.input}>
						<TextField
							id='outlined-basic'
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
					<Pagination count={10} shape='rounded' color={'primary'} />
				</div>
				<div>Show</div>
				<div className={style.select}>
					<FormControl sx={{ minWidth: 60 }} size='small'>
						<InputLabel id='demo-select-small-label'></InputLabel>
						<Select labelId='demo-select-small-label' id='demo-select-small' onChange={handleChange2}>
							<MenuItem value={5}>5</MenuItem>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={20}>20</MenuItem>
						</Select>
					</FormControl>
				</div>
				<div>Cards per Page</div>
			</div>
		</div>
	)
}
