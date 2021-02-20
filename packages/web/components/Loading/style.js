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
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;

  .spinner {
    animation: ${rotate} 1.6s linear infinite;

    width: 6em;
    height: 6em;

    & .path {
      stroke: var(--primary);
      stroke-linecap: square;
      animation: ${dash} 1.5s ease-in-out infinite;
    }
  }
`
