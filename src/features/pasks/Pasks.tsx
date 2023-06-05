import Pagination from '@mui/material/Pagination'
import React, { ChangeEvent, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import {
	Button,
	ButtonGroup,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	Slider,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@mui/material'
import style from './Packs.module.css'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector, useDebounce } from 'common/hooks'
import { packsThunks } from './packs.slice'
import { EditableSpan } from 'components/EditableSpan/EditableSpan'
import teacherBtn from '../../assets/img/teacher.svg'
import editBtn from '../../assets/img/edit.svg'
import deleteBtn from '../../assets/img/delete.svg'
import resetFilters from '../../assets/img/resetFilters.svg'

export const Packs = () => {
	const dispatch = useAppDispatch()
	const packs = useAppSelector(state => state.packs.packs)
	const myId = useAppSelector(state => state.auth.profile?._id)
	useEffect(() => {
		dispatch(packsThunks.getPacks())
	}, [])
	const handleCreatePack = () => {
		dispatch(packsThunks.createPack({ cardsPack: { name: 'test deck', deckCover: 'url or base64', private: false } }))
		dispatch(packsThunks.getPacks())
	}
	//slider
	function valuetext(value: number) {
		return `${value}°C`
	}
	//
	const [value, setValue] = React.useState<number[]>([20, 37])
	const handleChange = (event: Event, newValue: number | number[]) => {
		setValue(newValue as number[])
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
	//search
	const [searchValue, setSearchValue] = useState('')
	const debouncedValue = useDebounce(searchValue, 500)
	const handleSearchValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setSearchValue(e.currentTarget.value)
	}
	//my all
	const handleMyPacksButton = () => {
		dispatch(packsThunks.getMyPacks({ user_id: myId }))
	}
	const handleAllPacksButton = () => {
		dispatch(packsThunks.getPacks())
	}
	//reset filter
	const handleResetFilter = () => {
		dispatch(packsThunks.resetFilter({}))
		setSearchValue('')
	}

	useEffect(() => {
		dispatch(packsThunks.searchPack({ packName: debouncedValue }))
	}, [debouncedValue])

	const isLoggedIn = useAppSelector<any>(state => state.auth.isLoggedIn)
	if (!isLoggedIn) {
		return <Navigate to={'/login'} />
	}

	return (
		<div className={style.container}>
			<div className={style.head}>
				<div className={style.pageName}>Packs list</div>
				<button onClick={handleCreatePack} className={style.button}>
					Add new pack
				</button>
			</div>
			<div className={style.headersTable}>
				<div className={`${style.labelBlock} ${style.search}`}>
					<div className={style.label}>Search</div>
					<div className={style.input}>
						<TextField
							id='outlined-basic'
							value={searchValue}
							onChange={handleSearchValue}
							placeholder={'🔍 Provide your text'}
							variant='outlined'
							size='small'
							sx={{ width: '100%' }}
						/>
					</div>
				</div>
				<div className={`${style.labelBlock} ${style.showButtons}`}>
					<div className={style.label}>Show packs cards</div>
					<div className={style.muAllBtnBlock}>
						<ButtonGroup disableElevation variant='contained' aria-label='Disabled elevation buttons'>
							<Button onClick={handleMyPacksButton} className={style.muAllBtn}>
								My
							</Button>
							<Button onClick={handleAllPacksButton} className={style.muAllBtn}>
								All
							</Button>
						</ButtonGroup>
					</div>
				</div>
				<div className={`${style.labelBlock} ${style.slider}`}>
					<div className={style.label}>Number of cards</div>
					<div className={style.sliderBlock}>
						<div className={style.sliderValue}>{value[0]}</div>
						<Slider
							getAriaLabel={() => 'Temperature range'}
							value={value}
							onChange={handleChange}
							valueLabelDisplay='auto'
							getAriaValueText={valuetext}
						/>
						<div className={style.sliderValue}>{value[1]}</div>
					</div>
				</div>
				<div className={style.icons}>
					<img onClick={handleResetFilter} src={resetFilters} alt='resetFilters' />
				</div>
			</div>
			<div className={style.table}>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650, fontWeight: 400 }} aria-label='simple table'>
						<TableHead sx={{ backgroundColor: '#efefef', fontWeight: 600 }}>
							<TableRow>
								<TableCell sx={{ fontWeight: 700 }} align='left' width='28%'>
									Name
								</TableCell>
								<TableCell sx={{ fontWeight: 700 }} align='left' width='22%'>
									Cards
								</TableCell>
								<TableCell sx={{ fontWeight: 700 }} align='left' width='20%'>
									Last Updated
								</TableCell>
								<TableCell sx={{ fontWeight: 700 }} align='left' width='18%'>
									Created by
								</TableCell>
								<TableCell sx={{ fontWeight: 700 }} align='left' width='12%'>
									Actions
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{packs.map((row: any) => (
								<TableRow key={row._id}>
									<TableCell align='left'>{row.name}</TableCell>
									<TableCell align='left'>{row.cardsCount}</TableCell>
									<TableCell align='left'>{row.updated}</TableCell>
									<TableCell align='left'>{row.user_name}</TableCell>
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
						<Select
							labelId='demo-select-small-label'
							id='demo-select-small'
							onChange={handleChange2}
							sx={{ minWidth: 64, height: 24 }}
						>
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
