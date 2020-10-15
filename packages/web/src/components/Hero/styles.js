import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 65vh;
  background-color: ${({ theme: { colors } }) => colors.detail};
  display: flex;
  flex-direction: column;
`
export const Image = styled.img`
  max-height: 66vw;
`

export const Call = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  flex: 1;
  padding: 25px 12px;

  h1 {
    font-size: 2.3rem;
    text-align: center;
    color: ${({ theme: { colors } }) => colors.primary};
  }

  p {
    font-size: 1.7rem;
    text-align: center;
    color: ${({ theme: { colors } }) => colors.fg};
  }

  span {
    display: flex;
    justify-content: space-around;
    align-self: stretch;
  }

  button {
    padding: 8px 12px;
    font-size: 1.5rem;
    font-weight: 600;
    border-radius: 0.4em;
    background-color: inherit;
    color: ${({ theme: { colors } }) => colors.primary};
    border: 2px solid ${({ theme: { colors } }) => colors.primary};
    transition: background-color 0.3s ease, color 0.3s ease;
    &:focus {
      background-color: ${({ theme: { colors } }) => colors.primary};
      color: #fff;
      border: 2px solid ${({ theme: { colors } }) => colors.primary};
      box-shadow: 0 0 10px ${({ theme: { colors } }) => colors.primary + '80'};
    }
  }
`
