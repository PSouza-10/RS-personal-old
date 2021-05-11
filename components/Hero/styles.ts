import styled, { css, keyframes } from "styled-components";

const ImageAnimation = keyframes`
  0% {
    opacity: 0;
   
  }
  100% {
    

    opacity: 1;
  }
`;

export const Image = styled.figure`
  order: 1;
  width: 100%;
  align-self: stretch;
  max-height: 50vh;
  overflow: hidden;
  img {
    min-width: 100%;
    max-width: 100%;
    height: auto;
    animation-name: ${ImageAnimation};
    animation-duration: 1s;

    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-timing-function: ease;
  }
`;
const TextAnimation = keyframes`
  from {
    transform: translateY(100%);
    
  }
  to {
    transform: translateY(0);
   

  }
`;
const TextAnimationDesktop = keyframes`
  from {
    transform: translateX(-100%);
    z-index: 2;
    
  }
  to {
    transform: translateX(0);
    z-index: 2;
   

  }
`;

export const Call = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  flex: 1;
  order: 2;
  padding: 1rem;
  align-self: stretch;
  background-color: ${({ theme: { colors } }) => colors.detail};

  animation-name: ${TextAnimation};
  animation-duration: 0.7s;

  animation-iteration-count: 1;
  animation-timing-function: ease;
  h2 {
    text-align: center;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 1.8rem;
  }

  p {
    text-align: justify;
    font-size: 1.12rem;
    margin: 12px 0;
    margin-left: 4px;
    padding: 0 4px;
    color: ${({ theme: { colors } }) => colors.fg};
  }

  span {
    display: flex;
    justify-content: center;
    align-self: stretch;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme: { colors } }) => colors.detail};

    -webkit-transform-origin: 100% 100%;
    -ms-transform-origin: 100% 100%;
    transform-origin: 100% 100%;

    -webkit-transform: skewX(-20deg);
    -ms-transform: skewX(-20deg);
    transform: skewX(-20deg);
    display: none;
  }
`;

export const Container = styled.main`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;

  ${({
    theme: {
      breakpoints: { md },
    },
  }) => css`
    @media (min-width: ${md}) {
      flex-direction: row;
      position: relative;
      ${Image} {
        order: 3;
        max-width: 60%;
        min-height: 100%;
        img {
          max-width: 1000%;
        }
        height: 100%;
        width: auto;
        max-height: 1000%;

        z-index: 1;
      }

      ${Call} {
        align-items: flex-start;
        position: relative;
        order: 1;
        h2,
        p,
        span {
          z-index: 3;
          position: relative;
        }

        h2::after {
          right: -25%;
          z-index: 3;
        }

        &::after {
          display: initial;

          z-index: 2;
        }
        animation-name: ${TextAnimationDesktop};
        animation-duration: 0.4s;

        animation-iteration-count: 1;

        animation-timing-function: linear;
      }
    }
  `}
`;
