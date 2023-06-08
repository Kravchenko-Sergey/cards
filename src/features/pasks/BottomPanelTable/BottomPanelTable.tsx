import React, { useEffect, useState } from 'react'
import style from '../BottomPanelTable/BottomPanelTable.module.css'
import Pagination from '@mui/material/Pagination'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { packsThunks } from 'features/pasks/packsSlice'
import { useAppDispatch } from 'common/hooks'

export const BottomPanelTable = () => {
	const dispatch = useAppDispatch()

	const [page, setPage] = useState(1)
	const [lastPage, setLastPage] = useState(0)
	//select
	const [age, setAge] = React.useState('')
	const handleChangeEvent = (event: SelectChangeEvent) => {
		setAge(event.target.value)
	}

	/*useEffect(() => {
		dispatch(packsThunks.getPacks({ page: page, pageCount: Number(age) }))
			.unwrap()
			.then(res => {
				setLastPage(res!.cardsPackTotalCount)
				//setSliderValue([res!.minCardsCount, res!.maxCardsCount])
			})
	}, [page, age])*/

	return (
		<div className={style.footer}>
			<div className={style.pagination}>
				<Pagination
					count={lastPage}
					page={page}
					onChange={(e: any) => {
						setPage(Number(e.target.innerText))
					}}
					shape='rounded'
					color={'primary'}
					size={'small'}
				/>
			</div>
			<div>Show</div>
			<div className={style.select}>
				<FormControl sx={{ minWidth: 60 }} size='small'>
					<InputLabel id='demo-select-small-label'></InputLabel>
					<Select
						labelId='demo-select-small-label'
						id='demo-select-small'
						onChange={handleChangeEvent}
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
	)
}
