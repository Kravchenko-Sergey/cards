import React, { ChangeEvent, useEffect, useState } from 'react'
import style from '../TopPanelTable/TopPanelTable.module.css'
import TextField from '@mui/material/TextField'
import { Button, ButtonGroup, Slider } from '@mui/material'
import resetFilters from '../../../assets/img/resetFilters.svg'
import { useAppDispatch, useAppSelector, useDebounce } from 'common/hooks'
import { packsThunks } from 'features/pasks/packsSlice'

export const TopPanelTable = () => {
	const myId = useAppSelector(state => state.auth.profile?._id)
	console.log(myId)
	const params = useAppSelector(state => state.packs.searchParams)
	const dispatch = useAppDispatch()
	//search
	const [searchValue, setSearchValue] = useState('')
	const debouncedValue = useDebounce(searchValue, 500)
	const handleSearchValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setSearchValue(e.currentTarget.value)
	}
	//my all
	const handleMyPacksButton = () => {
		dispatch(packsThunks.getMyPacks({ ...params, user_id: myId }))
	}
	const handleAllPacksButton = () => {
		dispatch(packsThunks.getAllPacks({ ...params, user_id: '' }))
	}
	//slider
	const [sliderValue, setSliderValue] = React.useState<number[]>([0, 0])
	const handleChange = (event: Event, newValue: number | number[]) => {
		setSliderValue(newValue as number[])
	}
	const handleSliderValueCommitted: any = () => {
		dispatch(packsThunks.sliderFilter({ ...params, min: sliderValue[0], max: sliderValue[1] }))
	}
	//reset filter
	const handleResetFilter = () => {
		dispatch(packsThunks.resetFilter({}))
		setSearchValue('')
		sliderValue[0] = 0
		sliderValue[1] = 100
		//setPage(1)
	}

	useEffect(() => {
		dispatch(packsThunks.searchPack({ ...params, packName: debouncedValue }))
	}, [debouncedValue, dispatch])

	/*useEffect(() => {
		dispatch(packsThunks.sliderFilter({ min: sliderValue[0], max: sliderValue[1] }))
	}, [])*/

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
					<Button onClick={handleMyPacksButton} className={style.muAllBtn}>
						My
					</Button>
					<Button onClick={handleAllPacksButton} className={style.muAllBtn}>
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
			<div className={style.icons}>
				<img onClick={handleResetFilter} src={resetFilters} alt='resetFilters' />
			</div>
		</div>
	)
}
