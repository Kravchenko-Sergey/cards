import React, { useState } from 'react'
import style from './Learn.module.css'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import leftArrow from 'assets/img/leftArrow.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { cardsThunks } from 'features/cards/cardsSlice'

export const Learn = () => {
	const cards = useAppSelector(state => state.cards.cards)
	const packName = useAppSelector(state => state.cards.packName)
	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const [showBtn, setShowBtn] = useState(false)
	const [indexShowCard, setIndexShowCard] = useState(0)
	const [radioValue, setRadioValue] = useState(0)

	const handleNextButton = () => {
		if (indexShowCard < cards.length - 1) {
			setIndexShowCard(indexShowCard + 1)
			setShowBtn(false)
			dispatch(cardsThunks.updateGradeCard({ grade: radioValue, card_id: cards[indexShowCard]._id }))
		}
	}

	const handleFinishLearnButton = () => {
		dispatch(cardsThunks.updateGradeCard({ grade: radioValue, card_id: cards[indexShowCard]._id }))
		navigate('/packs')
	}

	console.log(radioValue)

	return (
		<div className={style.container}>
			<Link to='/packs' className={style.backBtnBlock}>
				<img src={leftArrow} alt='leftArrow' />
				<span className={style.backBtnText}>Back to Packs List</span>
			</Link>
			<div className={style.card}>
				<div className={style.cardTitle}>Learn “{packName}”</div>
				<div className={style.cardBody}>
					<div className={style.cardQuestion}>
						<span>Question: </span>
						{cards[indexShowCard].question}
					</div>
					<div className={style.cardAttempts}>
						Number of attempts to answer the question: <span>{cards[indexShowCard].shots}</span>
					</div>
					{!showBtn ? (
						<button onClick={() => setShowBtn(true)} className={style.button}>
							Show answer
						</button>
					) : (
						<div className={style.answerBody}>
							<div className={style.cardAnswer}>
								<span>Answer: </span>
								{cards[indexShowCard].answer}
							</div>
							<FormControl className={style.formControl}>
								<FormLabel id='demo-radio-buttons-group-label' className={style.formLabel}>
									Rate yourself:
								</FormLabel>
								<RadioGroup
									aria-labelledby='demo-radio-buttons-group-label'
									defaultValue={1}
									name='radio-buttons-group'
								>
									<FormControlLabel
										onChange={() => setRadioValue(1)}
										value={1}
										control={<Radio />}
										label='Did not know'
									/>
									<FormControlLabel onChange={() => setRadioValue(2)} value={2} control={<Radio />} label='Forgot' />
									<FormControlLabel
										onChange={() => setRadioValue(3)}
										value={3}
										control={<Radio />}
										label='A lot of thought'
									/>
									<FormControlLabel onChange={() => setRadioValue(4)} value={4} control={<Radio />} label='Сonfused' />
									<FormControlLabel
										onChange={() => setRadioValue(5)}
										value={5}
										control={<Radio />}
										label='Knew the answer'
									/>
								</RadioGroup>
							</FormControl>
							{indexShowCard < cards.length - 1 ? (
								<button onClick={handleNextButton} className={style.button}>
									Next
								</button>
							) : (
								<button onClick={handleFinishLearnButton} className={style.button}>
									Finish learn
								</button>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
