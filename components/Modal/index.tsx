import { Overlay, ModalContainer, IModalSize } from './style'
import { FlattenSimpleInterpolation } from 'styled-components'
import { useEffect } from 'react'
import { MdClose } from 'react-icons/md'

const defaultSize = {
	top: '5vh',
	bottom: '5vh',
	right: '5vw',
	left: '5vw',
}

interface ModalProps {
	visible: boolean
	toggleVisibility: () => any
	size?: IModalSize
	useOverlay?: boolean
	lockBody?: boolean
	header?: {
		title: string | JSX.Element
		CSS?: FlattenSimpleInterpolation | string
	}
	transition?: 'bottom' | 'left' | 'right' | 'top' | ''
	mobileAutoSize?: boolean
}

export const Modal: React.FC<ModalProps> = ({
	visible,
	toggleVisibility,
	children,
	size = defaultSize,
	useOverlay = true,
	lockBody = true,
	header = {},
	transition = '',
	mobileAutoSize = true,
}) => {
	useEffect(() => {
		if (lockBody) {
			document.body.style.overflowY = visible ? 'hidden' : 'initial'
		}
	}, [visible])

	return (
		<>
			{useOverlay && <Overlay visible={visible} onClick={toggleVisibility} />}
			<ModalContainer
				visible={visible}
				size={{ ...defaultSize, ...size }}
				headerCSS={header.CSS}
				transition={transition}
				mobileAutoSize={mobileAutoSize}
			>
				{header.title && (
					<header className='modal-header'>
						{typeof header.title === 'string' ? (
							<h1 className='modal-header-title'>{header.title}</h1>
						) : (
							header.title
						)}
						<button className='modal-header-close' onClick={toggleVisibility}>
							<MdClose />
						</button>
					</header>
				)}
				{children}
			</ModalContainer>
		</>
	)
}
