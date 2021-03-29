import styled, { keyframes, css } from "styled-components";
const rotate = keyframes`
    100% {
      transform: rotate(360deg);
    }
  `;

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
`;

export interface LoadingProps {
  wholePage?: boolean;
  isVisible?: boolean;
}
export const LoadingContainer = styled.div<LoadingProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;

  ${({ wholePage, isVisible }) =>
    wholePage &&
    css`
      position: fixed;
      z-index: 999;
      background-color: #222222;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      visibility: ${isVisible ? "visible" : "hidden"};
    `}

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
`;
