import React, { useState } from 'react'
import style from './Learn.module.css'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

export const Learn = () => {
	const [showBtn, setShowBtn] = useState(false)

	return (
		<div className={style.container}>
			<div className={style.backBtnBlock}>
				<div className={style.backBtnText}>Back to Packs List</div>
			</div>
			<div className={style.card}>
				<div className={style.cardTitle}>Learn “Pack Name”</div>
				<div className={style.cardBody}>
					<div className={style.cardQuestion}>
						<span>Question:</span> How "This" works in JavaScript?
					</div>
					<div className={style.cardAttempts}>
						Number of attempts to answer the question: <span>10</span>
					</div>
					{!showBtn ? (
						<button onClick={() => setShowBtn(true)} className={style.button}>
							Show answer
						</button>
					) : (
						<div className={style.answerBody}>
							<div className={style.cardQuestion}>
								<span>Answer:</span> This is how "This" works in JavaScript
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
							<button onClick={() => setShowBtn(false)} className={style.button}>
								Next
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
