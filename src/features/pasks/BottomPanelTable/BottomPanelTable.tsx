import React, { useEffect, useState } from 'react'
import style from 'features/pasks/BottomPanelTable/BottomPanelTable.module.css'
import Pagination from '@mui/material/Pagination'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { packsThunks } from 'features/pasks/packsSlice'
import { useAppDispatch, useAppSelector } from 'common/hooks'

export const BottomPanelTable = () => {
	const params = useAppSelector(state => state.packs.searchParams)
	const dispatch = useAppDispatch()

	const [page, setPage] = useState(1)
	const [totalPagesNumber, setTotalPagesNumber] = useState(1)
	//select
	const [age, setAge] = React.useState('')
	const handleChangeEvent = (event: SelectChangeEvent) => {
		setAge(event.target.value)
	}

	const myId = useAppSelector(state => state.auth.profile?._id)
	const packs = useAppSelector(state => state.packs.packs)
	const pageCount = useAppSelector(state => state.packs.searchParams.pageCount)

	useEffect(() => {
		dispatch(packsThunks.getPacks({ ...params, page: page, pageCount: Number(age), user_id: '' }))
			.unwrap()
			.then(res => {
				setTotalPagesNumber(Math.ceil(res!.cardsPackTotalCount / res!.pageCount))
			})
	}, [page, age])

	return (
		<div className={style.footer}>
			<div className={style.pagination}>
				<Pagination
					count={totalPagesNumber}
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
