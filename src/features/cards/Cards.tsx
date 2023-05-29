import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const Cards = () => {
	const isLoggedIn = useSelector<any>(state => state.auth.isLoggedIn)
	if (!isLoggedIn) {
		return <Navigate to={'/login'} />
	}
	return <div>Cards</div>
}
