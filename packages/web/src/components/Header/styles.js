import styled, { css } from 'styled-components'
import { MdBrightnessMedium } from 'react-icons/md'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 25px;
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.primary};
  position: sticky;
  top: 0;
  z-index: 10;
  p {
    font-size: 2.2rem;
    font-weight: 600;
    flex: 0.9;
  }

  @media (min-width: 576px) {
    p {
      flex: initial;
    }
  }
`

export const ToggleDarkMode = styled(MdBrightnessMedium)`
  width: 25px;
  height: 25px;
  cursor: pointer;
`

export const MenuIcon = styled.div`
  display: block;
  width: 25px;
  height: 25px;
  cursor: pointer;

  .one,
  .two,
  .three {
    width: 100%;
    height: 5px;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: transform 0.2s;
    border-radius: 0.3em;
  }
  ${({ open }) =>
    open
      ? css`
          .one {
            transform: rotate(45deg) translate(7px, 7px);
          }
          .three {
            transform: rotate(-45deg) translate(7px, -7px);
          }
        `
      : null}

  .two {
    margin: 5px 0px;
    opacity: ${({ open }) => (open ? '0' : 'initial')};
  }

  @media (min-width: 576px) {
    display: none;
  }
`

export const MenuContainer = styled.div`
  position: absolute;
  top: 50px;
  left: 0px;
  right: 0px;
  height: ${({ open }) => (open ? '100vh' : '0vh')};
  overflow: hidden;
  max-width: 100vw;
  background-color: ${({ theme }) => theme.colors.bg};
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  justify-content: flex-start;
  transition: height 0.5s ease;
  z-index: 10;
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-top: 25px;
  }

  ul > li {
    width: 100%;
    padding: 10px 0px;
    text-align: center;
    display: block;
    cursor: pointer;
    font-size: 1.8rem;
  }

  li:active {
    background-color: rgba(500, 500, 500, 0.5);
  }

  li:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  @media (min-width: 576px) {
    height: inherit;
    position: inherit;
    justify-content: center;
    align-items: stretch;
    transition: none;
    flex: 0.8;
    max-width: 400px;
    flex-direction: row;
    display: block;
    ul {
      margin: 0;
      flex-direction: row;
      height: 100%;
      justify-content: space-evenly;
      align-items: stretch;
    }
    ul > li {
      width: 100%;
      padding: 15px 5px;
      height: 100%;
      text-align: center;
      color: #fff;
    }
  }
`
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
  padding: 10px 0px;
  text-align: center;
  display: block;
  cursor: pointer;
  font-size: 1.8rem;
  &:active {
    background-color: rgba(500, 500, 500, 0.5);
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  @media (min-width: 576px) {
    width: 100%;
    padding: 15px 5px;
    height: 100%;
    text-align: center;
    color: #fff;
  }
`
export const ArrowBack = styled(IoMdArrowRoundBack)`
  height: 30px;
  width: 30px;
  flex-shrink: 0;
  cursor: pointer;
`
export const BackLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
`
