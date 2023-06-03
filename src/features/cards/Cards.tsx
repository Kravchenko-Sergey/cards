/*import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const Cards = () => {
	const isLoggedIn = useSelector<any>(state => state.auth.isLoggedIn)
	if (!isLoggedIn) {
		return <Navigate to={'/login'} />
	}
	return <div>Cards</div>
}*/

import { useAppDispatch, useAppSelector } from '../../common/hooks'
import React, { useEffect, useState } from 'react'
import { packsThunks } from '../pasks/packs.slice'
import {
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Rating,
	Select,
	SelectChangeEvent,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@mui/material'
import style from './Cards.module.css'
import TextField from '@mui/material/TextField'
import Pagination from '@mui/material/Pagination'
import { Link, Navigate } from 'react-router-dom'
import teacherBtn from '../../assets/img/teacher.svg'
import editBtn from '../../assets/img/edit.svg'
import deleteBtn from '../../assets/img/delete.svg'
import leftArrow from '../../assets/img/leftArrow.svg'
import settings from '../../assets/img/settings.svg'

export const Cards = () => {
	//rating
	const [value, setValue] = useState<any>(4)
	//
	const dispatch = useAppDispatch()
	const packs = useAppSelector(state => state.packs.packs)
	useEffect(() => {
		dispatch(packsThunks.getPacks())
	}, [])
	const handleCreatePack = () => {
		dispatch(packsThunks.createPack({ cardsPack: { name: 'test deck', deckCover: 'url or base64', private: false } }))
		dispatch(packsThunks.getPacks())
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
	const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
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
					<div className={style.pageName}>My Pack</div>
					<img src={settings} alt='settings' />
				</div>
				<button onClick={handleCreatePack} className={style.button}>
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
			<div className={style.table}>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650, fontWeight: 400 }} aria-label='simple table'>
						<TableHead sx={{ backgroundColor: '#efefef', fontWeight: 600 }}>
							<TableRow>
								<TableCell align='left' width='25%'>
									Question
								</TableCell>
								<TableCell align='left' width='25%'>
									Answer
								</TableCell>
								<TableCell align='left' width='20%'>
									Last Updated
								</TableCell>
								<TableCell align='left' width='20%'>
									Grade
								</TableCell>
								<TableCell align='left' width='10%'>
									Actions
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{packs.map((row: any) => (
								<TableRow key={row._id}>
									<TableCell align='left'>{`How "This" works in JavaScript?`}</TableCell>
									<TableCell align='left'>{'This is how "This" works in JavaScript'}</TableCell>
									<TableCell align='left'>{'18.03.2021'}</TableCell>
									<TableCell align='left'>
										<Rating
											name='simple-controlled'
											value={4}
											onChange={(event, newValue) => {
												setValue(newValue)
											}}
										/>
									</TableCell>
									<TableCell align='left'>
										<div className={style.actionButtons}>
											<img src={teacherBtn} alt='teacherBtn' />
											<img onClick={packsThunks.updatePackName} src={editBtn} alt='changeBtn' />
											<img
												onClick={() => {
													dispatch(packsThunks.deletePack({ id: row._id }))
													dispatch(packsThunks.getPacks())
												}}
												src={deleteBtn}
												alt='deleteBtn'
											/>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
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
