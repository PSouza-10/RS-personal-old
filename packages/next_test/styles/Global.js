import { createGlobalStyle, css } from 'styled-components'
import classes from './classes'
export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
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
    :root {
      --primary : ${({ theme: { colors } }) => colors.primary};
      --error : #e22;
      --success : #4c7;
      --bgContrast :  ${({ theme: { colors } }) => colors.bgContrast};
      --white-fade: #fff7;
    }
    html,body,#__next{
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
      font-size: inherit;
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
    
    
   ${classes}


`
