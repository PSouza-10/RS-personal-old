import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;

  border-radius: 0.5em;
  background-color: ${({ theme }) => theme.colors.bgContrast};
  color: inherit;
  box-shadow: 0 0 4px #0003;
  margin: 0 10px;
  margin-top: 15px;
`

export const PostTitle = styled.header`
  font-weight: 550;
  padding: 5px 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: var(--title);
  span {
    margin-left: 10px;
  }
`

export const PostImage = styled.img`
  align-self: center;
  max-width: 100%;
  max-height: 60%;
`

export const PostInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 6px 10px;
  font-weight: 560;
`

export const PostSubtitle = styled.p`
  text-align: justify;
  padding: 12px 16px;
  font-size: 1.6rem;
`
export const Avatar = styled.img`
  border-radius: 10em;
  height: 36px;
  width: 36px;
`
export const StyledLink = styled(Link)`
  font-weight: 650;
  color: ${({ theme: { colors } }) => colors.primary};
  text-decoration: none;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  align-self: flex-end;
  padding: 12px 12px;
  font-size: var(--title);
`
