import Pagination from '@mui/material/Pagination'
import React from 'react'
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
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const Packs = () => {
	//slider
	function valuetext(value: number) {
		return `${value}°C`
	}
	const [value, setValue] = React.useState<number[]>([20, 37])
	const handleChange = (event: Event, newValue: number | number[]) => {
		setValue(newValue as number[])
	}
	//table
	function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
		return { name, calories, fat, carbs, protein }
	}
	const rows = [
		createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
		createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
		createData('Eclair', 262, 16.0, 24, 6.0),
		createData('Cupcake', 305, 3.7, 67, 4.3),
		createData('Gingerbread', 356, 16.0, 49, 3.9)
	]
	//select
	const [age, setAge] = React.useState('')
	const handleChange2 = (event: SelectChangeEvent) => {
		setAge(event.target.value)
	}
	//
	const isLoggedIn = useSelector<any>(state => state.auth.isLoggedIn)
	if (!isLoggedIn) {
		return <Navigate to={'/login'} />
	}

	return (
		<div className={style.container}>
			<div className={style.head}>
				<div className={style.pageName}>Packs list</div>
				<button className={style.button}>Add new pack</button>
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
							{rows.map(row => (
								<TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component='th' scope='row'>
										{row.name}
									</TableCell>
									<TableCell align='right'>{row.calories}</TableCell>
									<TableCell align='right'>{row.fat}</TableCell>
									<TableCell align='right'>{row.carbs}</TableCell>
									<TableCell align='right'>{row.protein}</TableCell>
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
