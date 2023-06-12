import React, { useState } from 'react'
import style from './Learn.module.css'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import leftArrow from 'assets/img/leftArrow.svg'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'common/hooks'

export const Learn = () => {
	const cards = useAppSelector(state => state.cards.cards)
	const packName = useAppSelector(state => state.cards.packName)

	const [showBtn, setShowBtn] = useState(false)
	const [indexShowCard, setIndexShowCard] = useState(0)

	const handleNextButton = () => {
		setIndexShowCard(indexShowCard + 1)
		setShowBtn(false)
	}

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
							<div className={style.cardQuestion}>
								<span>Answer: </span>
								{cards[indexShowCard].answer}
							</div>
							<FormControl className={style.formControl}>
								<FormLabel id='demo-radio-buttons-group-label' className={style.formLabel}>
									Rate yourself:
								</FormLabel>
								<RadioGroup
									aria-labelledby='demo-radio-buttons-group-label'
									defaultValue='Knew the answer'
									name='radio-buttons-group'
								>
									<FormControlLabel value='Did not know' control={<Radio />} label='Did not know' />
									<FormControlLabel value='Forgot' control={<Radio />} label='Forgot' />
									<FormControlLabel value='A lot of thought' control={<Radio />} label='A lot of thought' />
									<FormControlLabel value='Сonfused' control={<Radio />} label='Сonfused' />
									<FormControlLabel value='Knew the answer' control={<Radio />} label='Knew the answer' />
								</RadioGroup>
							</FormControl>
							<button onClick={handleNextButton} className={style.button}>
								Next
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
