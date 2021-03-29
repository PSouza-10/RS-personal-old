import styled, { css, keyframes } from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;

  .explore {
    width: 100%;
    h2 {
      text-align: center;
    }
    display: flex;
    flex-direction: column;
    padding: 1vh 0;
  }
  p {
    color: white;
    text-align: justify;
    padding: 1rem;
  }
  nav {
    display: flex;
    flex-direction: column;
    padding: 0 2vh;
    button {
      margin-bottom: 20px;
    }
    
  }
  }
  ${({ theme: { breakpoints } }) => css`
    @media (min-width: ${breakpoints.md}) {
      .explore {
        max-width: 70vw;
        margin: 0 auto;
      }
    }
  `}
`;

const pulse = keyframes`
  50% {
    transform: scale(1.2,1.2);
  }
`;

export const TrifectaWrapper = styled.section`
  padding: 5vh 0;
  .triangle {
    border-bottom: 9.09rem solid var(--primary);
    border-left: 5.68rem solid transparent;
    border-right: 5.68rem solid transparent;
    height: 0;
    width: 0;
    z-index: 1;
    position: relative;
    .inner-triangle {
      border-bottom: 8rem solid var(--detail);
      border-left: 4.992rem solid transparent;
      border-right: 4.992rem solid transparent;
      height: 0;
      width: 0;
      position: absolute;
      z-index: 2;
      transform: translate(-4.992rem, 0.8rem);

      .body {
        position: absolute;
        color: var(--primary);
        bottom: -8rem;
        left: -2rem;
        height: 6rem;
        width: 4rem;
        animation-name: ${pulse};
        animation-duration: 1.2s;
        animation-timing-function: cubic-bezier(0.8, 0.5, 0.6, 0.8);
        animation-iteration-count: infinite;
      }
    }
  }

  margin: 0 auto;
  .word {
    opacity: 1;
    position: absolute;
    background-color: var(--detail);
    padding: 0.2rem;
    font-size: 1.2rem;
    color: var(--primary);
    z-index: 3;
  }

  .word:nth-child(1) {
    bottom: -0.56rem;
    left: -1.7rem;
  }

  .word:nth-child(2) {
    bottom: -9.65rem;
    left: -7.95rem;
  }
  .word:nth-child(3) {
    bottom: -9.65rem;
    left: 3.4rem;
  }
`;
