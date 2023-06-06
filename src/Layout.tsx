import React from 'react'
import { Outlet } from 'react-router-dom'
import style from './Layout.module.css'
import { Header } from 'components/Header/Header'

export const Layout = () => {
	return (
		<div className={style.wrapper}>
			<header className={style.header}>
				<Header />
			</header>
			<main className={style.main}>
				<Outlet />
			</main>
			<footer></footer>
		</div>
	)
}
