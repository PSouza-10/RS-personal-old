import styled, { css } from 'styled-components'
import { FaAppStore, FaGooglePlay } from 'react-icons/fa'
export const Image = styled.img`
  align-self: center;

  width: 100%;
  height: 100%;
`

export const Call = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  flex: 1;
  padding: 25px 16px;
  align-self: stretch;
  h2 {
    text-align: left;
    position: relative;
    &::after {
      position: absolute;
      content: '';
      background-color: ${({ theme: { colors } }) => colors.secondary};
      height: 6px;
      bottom: -10%;
      left: 0;
      right: 0;
      border-radius: 0.4em;
    }
  }

  p {
    text-align: justify;
    margin: 12px 0;
    margin-left: 4px;
    padding: 0 4px;
    color: ${({ theme: { colors } }) => colors.fg};
  }

  span {
    display: flex;
    justify-content: space-around;
    align-self: stretch;
  }
`

export const AppleIcon = styled(FaAppStore)`
  height: 24px;
  width: 24px;
  margin-right: 5px;
  transform: translateY(-3%);
`

export const AndroidIcon = styled(FaGooglePlay)`
  height: 20px;
  width: 20px;
  margin-right: 5px;
`
export const Container = styled.div`
  width: 100%;
  height: auto;
  background-color: ${({ theme: { colors } }) => colors.detail};
  display: flex;
  flex-direction: column;
  ${({
    theme: {
      breakpoints: { sm, md, lg }
    }
  }) => css`
    @media (max-width: ${md}) and (min-width: ${sm}) {
      ${Image} {
        max-height: 66vh;
        max-width: 75vw;
      }
    }
    @media (min-width: ${md}) {
      flex-direction: row;

      ${Image} {
        order: 2;
        max-width: 60%;
        max-height: 30%;
      }

      ${Call} {
        align-items: flex-start;

        z-index: 2;
      }
    }
  `}
`
