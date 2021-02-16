import {css} from 'styled-components'
export default css`
    .button{
      font-weight: 500;
      padding: 0.3em 0.2em; ;
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
      
      &:not(:disabled):hover,&:focus {
        background-color: ${({ theme: { colors } }) => colors.primary};
        color: #fff;
      }
      &:not(:disabled):focus {
        
        
        box-shadow: 0 0 6px 4px ${({ theme: { colors } }) =>
          colors.primary + '40'};
      }

      &:disabled {
        opacity: 0.6;
        cursor: initial;
      }
    }
    .inline{
      color: var(--primary);
      font-size: inherit;
      &:hover{
        text-decoration: underline;
        
      }
    }
    .close {
   
    height: 50px;
    padding: 5px 5px;
    svg{
      height: 40px;
      width: 40px;
      fill: #fff;
    }
    &:hover {
        background-color: var(--white-fade);
        svg {
            fill: var(--primary);
        }
    }
  }
`