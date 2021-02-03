import { createGlobalStyle, css } from 'styled-components'

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        /* font-family: 'Nunito Sans', sans-serif; */
        font-family: 'Titillium Web', sans-serif;
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
    

    body::-webkit-scrollbar {
      background-color: transparent;
      border-radius: 0.8em;
    }

    body::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.primary};
      border-radius: 0.8em;


    }
    a{
      text-decoration: none;
      color: white;
      font-size: 1.1rem;
    }
    a.button{
      padding: 8px 12px;
   
      font-weight: 600;
      border-radius: 0.4em;
      background-color: inherit;
      color: ${({ theme: { colors } }) => colors.primary};
      border: 2px solid ${({ theme: { colors } }) => colors.primary};
      transition: background-color 0.3s ease, color 0.3s ease;
      cursor: pointer;
      display: flex;
      align-items: center;
      &:hover {
        background-color: ${({ theme: { colors } }) => colors.primary};
        color: #fff;
      }
      &:focus {
        background-color: ${({ theme: { colors } }) => colors.primary};
        color: #fff;
        border: 2px solid ${({ theme: { colors } }) => colors.primary};
        box-shadow: 0 0 10px 8px ${({ theme: { colors } }) =>
          colors.primary + '80'};
      }
    }
    a.inline{
      color: var(--primary);
      font-size: 1rem;
    }
    html {
        font-size: 110%;
        --input-base: 10px;
        ${({ theme: { breakpoints } }) => css`
          @media (min-width: ${breakpoints.sm}) {
            font-size: 120%;
          }
          @media (min-width: ${breakpoints.md}) {
            font-size: 130%;
          }
          @media (min-width: ${breakpoints.lg}) {
            font-size: 140%;
          }
          @media (min-width: ${breakpoints.xl}) {
            font-size: 160%;
          }
        `}
    }
   
    body {
      
        h1{
          font-size: 1.5rem;
          color: ${({ theme: { colors } }) => colors.primary};
        }
        h2{
          font-size: 1.4rem;
          color: ${({ theme: { colors } }) => colors.primary};
        }
        h3{
          font-size: 1.2rem;
          color: ${({ theme: { colors } }) => colors.primary};
        }
        p,label,input{
          font-size: 1rem;
        }
    
        
      }
       
      svg {
        flex-shrink: 0;
      }
    
    
   


`
