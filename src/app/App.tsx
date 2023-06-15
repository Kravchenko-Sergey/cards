import React, { useEffect } from 'react'
import { appThunks } from 'app/app.slice'
import { RouterProvider } from 'react-router-dom'
import { CircularProgress, LinearProgress } from '@mui/material'
import style from 'app/App.module.css'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { router } from 'router/router'
import { selectIsInitialized, selectIsLoading } from 'app/AppSelectors'

export const App = () => {
	const isInitialized = useAppSelector(selectIsInitialized)
	const isLoading = useAppSelector(selectIsLoading)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(appThunks.initializeApp({}))
	}, [])

	return !isInitialized ? (
		<div className={style.circularProgress}>
			<CircularProgress />
		</div>
	) : (
		<>
			<div className={style.linearProgress}>{isLoading && <LinearProgress />}</div>
			<ToastContainer
				position='top-center'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
			<RouterProvider router={router} />
		</>
	)
}
