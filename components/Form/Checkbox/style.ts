import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	align-items: center;
	margin: 0 1em;
	input {
		opacity: 0;
		visibility: hidden;
		width: 0;
	}
	.checkbox {
		position: relative;
		border: 1px solid var(--white-fade);
		width: 1em;
		height: 1em;

		transition: all 0.2s ease;
		overflow: hidden;
		margin-right: 0.5em;
		&:hover {
			outline: 1px solid var(--primary);
		}
	}
	.checkbox::after {
		content: '';
		position: absolute;
		height: 0.5em;
		width: 0.3em;
		border-right: 2px solid white;
		border-bottom: 2px solid white;
		top: 40%;
		left: 50%;
		transition: transform 0.2s ease;
		visibility: hidden;
		transform: translate(-50%, -50%) rotateZ(45deg) scale(10);
	}
	input:checked + .checkbox {
		background-color: var(--primary);
		&:hover {
			outline: none;
		}
	}
	input:checked + .checkbox::after {
		background-color: var(--primary);
		transform: translate(-50%, -50%) rotateZ(45deg) scale(1);
		visibility: visible;
	}
`
