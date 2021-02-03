import { css } from 'styled-components'

export const ContainerCSS = css`
  height: calc(100vh - 50px);
  max-height: calc(100vh - 50px);
  min-height: calc(100vh - 50px);

  @media (min-width: 768px) {
    margin: 0 5vw;
  }
`
