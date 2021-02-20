import styled, { css } from 'styled-components'

export const Container = styled.div`
  img {
    width: 50px;
    height: 50px;
  }

  ${({ styles }) =>
    Object.keys(styles).map(className => {
      const properties = Object.keys(styles[className]).map(
        key => `${key}: ${styles[className][key]};`
      )

      return css`
        .${className} {
          ${properties.map(prop => prop)}
        }
      `
    })}
`
