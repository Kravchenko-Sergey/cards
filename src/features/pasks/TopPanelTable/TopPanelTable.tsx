import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import style from 'features/pasks/TopPanelTable/TopPanelTable.module.css'
import TextField from '@mui/material/TextField'
import { Button, ButtonGroup, Slider } from '@mui/material'
import resetFilters from 'assets/img/resetFilters.svg'
import { useAppDispatch, useAppSelector, useDebounce } from 'common/hooks'
import { packsThunks } from 'features/pasks/packsSlice'

type HandleSliderType = (event: Event | SyntheticEvent<Element, Event>, value: number | number[]) => void

export const TopPanelTable = () => {
	const isLoading = useAppSelector(state => state.app.isLoading)
	const myId = useAppSelector(state => state.auth.profile?._id)
	const params = useAppSelector(state => state.packs.searchParams)
	const dispatch = useAppDispatch()
	//search
	const [searchValue, setSearchValue] = useState('')
	const debouncedValue = useDebounce(searchValue, 500)
	const handleSearchValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setSearchValue(e.currentTarget.value)
	}
	//my all
	const [activeAll, setActiveAll] = useState(true)
	const handleMyPacksButton = () => {
		dispatch(packsThunks.getPacks({ ...params, user_id: myId }))
		setActiveAll(!activeAll)
	}
	const handleAllPacksButton = () => {
		dispatch(packsThunks.getPacks({ ...params, user_id: '' }))
		setActiveAll(!activeAll)
	}
	//slider
	const [sliderValue, setSliderValue] = React.useState<number[]>([0, 100])
	const handleChange = (event: Event, newValue: number | number[]) => {
		setSliderValue(newValue as number[])
	}
	const handleSliderValueCommitted: HandleSliderType = () => {
		console.log(params)
		dispatch(packsThunks.getPacks({ ...params, min: sliderValue[0], max: sliderValue[1] }))
	}
	//reset filter
	const handleResetFilter = () => {
		dispatch(
			packsThunks.getPacks({
				packName: '',
				min: 0,
				max: 0,
				sortPacks: '0updated',
				page: 1,
				pageCount: 4,
				user_id: '',
				block: false
			})
		)
		setSearchValue('')
		sliderValue[0] = 0
		sliderValue[1] = 100
		//setPage(1)
	}

	useEffect(() => {
		dispatch(packsThunks.getPacks({ ...params, packName: debouncedValue }))
	}, [debouncedValue])

	return (
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
			<div className={`${style.labelBlock} ${style.showButtons}`}>
				<div className={style.label}>Show packs cards</div>
				<ButtonGroup
					disableElevation
					variant='contained'
					aria-label='Disabled elevation buttons'
					className={style.muAllBtnBlock}
				>
					<Button
						onClick={handleMyPacksButton}
						className={!activeAll ? style.activeBtn : style.muAllBtn}
						disabled={isLoading}
					>
						My
					</Button>
					<Button
						onClick={handleAllPacksButton}
						className={activeAll ? style.activeBtn : style.muAllBtn}
						disabled={isLoading}
					>
						All
					</Button>
				</ButtonGroup>
			</div>
			<div className={`${style.labelBlock} ${style.slider}`}>
				<div className={style.label}>Number of cards</div>
				<div className={style.sliderBlock}>
					<div className={style.sliderValue}>{sliderValue[0]}</div>
					<Slider
						value={sliderValue}
						onChange={handleChange}
						onChangeCommitted={handleSliderValueCommitted}
						valueLabelDisplay='auto'
					/>
					<div className={style.sliderValue}>{sliderValue[1]}</div>
				</div>
			</div>
			<button onClick={handleResetFilter} className={style.icons} disabled={isLoading}>
				<img src={resetFilters} alt='resetFilters' />
			</button>
		</div>
	)
}
