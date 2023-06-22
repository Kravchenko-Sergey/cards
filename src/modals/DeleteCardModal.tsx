import React from 'react'
import deleteBtn from 'assets/img/delete.svg'
import style from 'modals/DeleteModal.module.css'
import { BasicModal } from 'modals/BasicModal'
import { useAppSelector } from 'common/hooks'
import { appSelectors } from 'app/AppSelectors'

type DeleteCardModalPropsType = {
	callback?: any
	setOpen?: any
	onClose?: any
	id?: string
	question?: string
}

export const DeleteCardModal = (props: DeleteCardModalPropsType) => {
	const isLoading = useAppSelector(appSelectors.selectIsLoading)

	return (
		<BasicModal img={deleteBtn} alt={'deleteBtn'}>
			<div className={style.container}>
				<h1 className={style.title}>Delete Card</h1>
				<div className={style.text}>
					Are you sure you want to delete the <span>{props.question}</span> card?
				</div>
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
