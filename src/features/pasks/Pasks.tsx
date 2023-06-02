import Pagination from '@mui/material/Pagination'
import React, { useEffect } from 'react'
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
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { packsThunks } from './packs.slice'

export const Packs = () => {
	const dispatch = useAppDispatch()
	const packs = useAppSelector(state => state.packs.packs)
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
	const [value, setValue] = React.useState<number[]>([20, 37])
	const handleChange = (event: Event, newValue: number | number[]) => {
		setValue(newValue as number[])
	}
	//table
	function createData(name: string, cards: number, lastUpdated: number, createdBy: number, actions: number) {
		return { name, cards, lastUpdated, createdBy, actions }
	}

	//const rows = packs.map((pack: any) => createData (`${pack.name}`, pack.cardsCount, pack.updated, pack.created, 4.0))

	//select
	const [age, setAge] = React.useState('')
	const handleChange2 = (event: SelectChangeEvent) => {
		setAge(event.target.value)
	}
	//
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
						<TextField id='outlined-basic' placeholder={'Provide your text'} variant='outlined' />
					</div>
				</div>
				<div className={`${style.labelBlock} ${style.showButtons}`}>
					<div className={style.label}>Show packs cards</div>
					<div>
						<ButtonGroup disableElevation variant='contained' aria-label='Disabled elevation buttons'>
							<Button>My</Button>
							<Button>All</Button>
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
				<div className={style.icons}></div>
			</div>
			<div className={style.table}>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650, fontWeight: 400 }} aria-label='simple table'>
						<TableHead sx={{ backgroundColor: '#efefef', fontWeight: 600 }}>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell align='right'>Cards</TableCell>
								<TableCell align='right'>Last Updated</TableCell>
								<TableCell align='right'>Created by</TableCell>
								<TableCell align='right'>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{packs.map((row: any) => (
								<TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component='th' scope='row'>
										{row.name}
									</TableCell>
									<TableCell align='right'>{row.cardsCount}</TableCell>
									<TableCell align='right'>{row.updated}</TableCell>
									<TableCell align='right'>{row._id}</TableCell>
									<TableCell align='right'>
										<div className={style.qw}>
											<span
												onClick={() => {
													dispatch(packsThunks.deletePack({ id: row._id }))
													dispatch(packsThunks.getPacks())
												}}
											>
												{'D '}
											</span>
											<span>{'U '}</span>
											<span>T</span>
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
