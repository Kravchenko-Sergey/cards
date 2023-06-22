import React, { useEffect, useState } from 'react'
import style from 'features/pasks/BottomPanelTable/BottomPanelTable.module.css'
import Pagination from '@mui/material/Pagination'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { packsThunks } from 'features/pasks/packsSlice'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { appSelectors } from 'app/AppSelectors'
import { packsSelectors } from 'features/pasks/packsSelectors'

export const BottomPanelTable = () => {
	const isLoading = useAppSelector(appSelectors.selectIsLoading)
	const params = useAppSelector(packsSelectors.selectParams)
	const cardPacksTotalCount = useAppSelector(packsSelectors.selectCardPacksTotalCount)
	const pageCount = useAppSelector(packsSelectors.selectPageCount)
	const dispatch = useAppDispatch()

	const [page, setPage] = useState(1)
	const [totalPagesNumber, setTotalPagesNumber] = useState(1)
	//select
	const [age, setAge] = React.useState('4')
	const handleChangeEvent = (event: SelectChangeEvent) => {
		setAge(event.target.value)
		dispatch(packsThunks.getPacks({ ...params, pageCount: Number(event.target.value) }))
			.unwrap()
			.then(res => {
				setTotalPagesNumber(Math.ceil(res.cardPacksTotalCount / res.pageCount))
			})
	}

	const myId = useAppSelector(state => state.packs.searchParams.user_id)

	useEffect(() => {
		setTimeout(() => {
			dispatch(packsThunks.getPacks({ ...params, page: 1, pageCount: 4 }))
			setTotalPagesNumber(Math.ceil(cardPacksTotalCount / pageCount))
		}, 2000)
	}, [])

	return (
		<div className={style.footer}>
			<div className={style.pagination}>
				<Pagination
					count={Math.ceil(cardPacksTotalCount / pageCount)}
					page={page}
					onChange={(e: any) => {
						setPage(Number(e.target.innerText))
						dispatch(
							packsThunks.getPacks({ ...params, page: Number(e.currentTarget.innerText), pageCount: Number(age) })
						)
						setTotalPagesNumber(Math.ceil(cardPacksTotalCount / pageCount))
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
