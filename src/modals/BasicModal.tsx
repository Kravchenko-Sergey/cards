import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { JSX } from 'react'

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid gray',
	boxShadow: 24,
	p: 4
}

type BasicModalPropsType = {
	img?: string
	alt?: string
	children: JSX.Element
	title?: string
	type?: string
	text?: string
	className?: string
}

export const BasicModal = (props: BasicModalPropsType) => {
	const [open, setOpen] = React.useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	return (
		<div>
			{props.type === 'btn' ? (
				<button onClick={handleOpen} className={props.className}>
					{props.text}
				</button>
			) : (
				<img onClick={handleOpen} src={props.img} alt={props.alt} />
			)}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>{props.children}</Box>
			</Modal>
		</div>
	)
}
