import styled, { keyframes } from 'styled-components'
const rotate = keyframes`
    100% {
      transform: rotate(360deg);
    }
  `

const dash = keyframes`
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
`
export const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  visibility: ${({ isVisible }) => (isVisible ? 'visibile' : 'hidden')};
  background-color: #0008;
  align-items: center;
  justify-content: center;
  .spinner {
    animation: ${rotate} 1.6s linear infinite;

    width: 200px;
    height: 200px;

    & .path {
      stroke: var(--primary);
      stroke-linecap: square;
      animation: ${dash} 1.5s ease-in-out infinite;
    }
  }
`
