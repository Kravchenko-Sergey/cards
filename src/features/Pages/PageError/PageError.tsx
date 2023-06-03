import React from 'react'
import style from './PageError.module.css'
import error404 from '../../../assets/img/error404.svg'
import { Link } from 'react-router-dom'

export const PageError = () => {
	return (
		<div className={style.container}>
			<div className={style.textBlock}>
				<div className={style.errorTitle}>Ooops!</div>
				<div className={style.errorText}>Sorry! Page not found!</div>
				<Link to={'/profile'} className={style.button}>
					Back to home page
				</Link>
			</div>
			<img src={error404} alt='error404' />
		</div>
	)
}
