import React from 'react'
import { BasicModal } from './BasicModal'
import style from './DeleteModal.module.css'
import deleteBtn from 'assets/img/delete.svg'
import { useAppSelector } from 'common/hooks'
import { appSelectors } from 'app/AppSelectors'

type DeleteModalPropsType = {
	callback?: any
	setOpen?: any
	onClose?: any
}

export const DeleteModal = (props: DeleteModalPropsType) => {
	const isLoading = useAppSelector(appSelectors.selectIsLoading)
	return (
		<BasicModal img={deleteBtn} alt={'deleteBtn'}>
			<div className={style.container}>
				<h1 className={style.title}>Delete Pack</h1>
				<div className={style.text}>Do you really want to remove Pack Name? All cards will be deleted.</div>
				<div className={style.btnBlock}>
					<button className={style.cancelBtn}>Cancel</button>
					<button onClick={props.callback} className={style.deleteBtn} disabled={isLoading}>
						Delete
					</button>
				</div>
			</div>
		</BasicModal>
	)
}
