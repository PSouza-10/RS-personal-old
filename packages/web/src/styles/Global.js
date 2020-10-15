import { createGlobalStyle, css } from 'styled-components'

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        outline: none;
        caret-color: ${({ theme }) => theme.colors.primary};
        
    }

    body,.root {
        height: 100%;
        max-width: 100vw;
       
       background-color: ${({ theme }) => theme.colors.bg};
       
    }
    html {
        font-size: 62%;
    }
    ${({
      theme: {
        breakpoints: { xs, sm, md, lg, xl }
      }
    }) => css`
      body {
        @media (min-width: ${xs}) {
          font-size: 1.4rem;
          --title: 1.7rem;
        }
        @media (min-width: ${sm}) {
          font-size: 1.5rem;
          --title: 1.8rem;
        }
        @media (min-width: ${md}) {
          font-size: 1.8rem;
          --title: 1.9rem;
        }
        @media (min-width: ${lg}) {
          font-size: 1.9rem;
          --title: 2.1rem;
        }
        @media (min-width: ${xl}) {
          font-size: 2rem;
          --title: 2.3rem;
        }
      }
    `}

   
`
