import { createGlobalStyle, css } from 'styled-components'

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
    html,body,#root{
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
    .button{
      font-weight: 500;
      padding: 0 0.3em;
      background-color: inherit;
      color: ${({ theme: { colors } }) => colors.primary};
      border: 2px solid ${({ theme: { colors } }) => colors.primary};
      transition: background-color 0.3s ease, color 0.3s ease;
      cursor: pointer;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content:center;
      font-size:inherit;
      &:hover,&:focus {
        background-color: ${({ theme: { colors } }) => colors.primary};
        color: #fff;
      }
      &:focus {
        background-color: ${({ theme: { colors } }) => colors.primary};
        color: #fff;
        
        box-shadow: 0 0 6px 4px ${({ theme: { colors } }) =>
          colors.primary + '40'};
      }
    }
    .inline{
      color: var(--primary);
      font-size: inherit;
      &:hover{
        text-decoration: underline;
        
      }
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
