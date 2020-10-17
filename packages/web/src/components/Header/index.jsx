import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Container,
  MenuIcon,
  MenuContainer,
  ToggleDarkMode,
  StyledLink,
  ArrowBack,
  BackLink,
  Logo,
  HeaderBrand
} from './styles'


export function Header({ setTheme, theme }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const lockYScroll = lock => {
    document.body.style.overflow = lock ? 'hidden' : 'initial'
  }
  const articlePage = useLocation().pathname.includes('/article/')
  const handleMenu = () => {
    lockYScroll(!menuOpen)
    setMenuOpen(!menuOpen)
  }

  return (
    <Container>
      {
        articlePage ? <BackLink to='/blog'>
        <ArrowBack/> 
        </BackLink>
        : <HeaderBrand><Logo/>Personal</HeaderBrand>
      }
      
      <MenuContainer open={menuOpen}>
        <ul>
          <StyledLink to='/' onClick={handleMenu}>
            Home
          </StyledLink>
          <StyledLink to='/blog' onClick={handleMenu}>
            Blog
          </StyledLink>

          <StyledLink to='/partners' onClick={handleMenu}>
            Parceiros
          </StyledLink>

          <StyledLink to='/about' onClick={handleMenu}>
            Sobre
          </StyledLink>
        </ul>
      </MenuContainer>
      <ToggleDarkMode
        onClick={() => {
          setTheme(!theme)
          localStorage.setItem('theme', !theme)
        }}
      />
      <MenuIcon
        open={menuOpen}
        onClick={handleMenu}>
        <div className='one'></div>
        <div className='two'></div>
        <div className='three'></div>
      </MenuIcon>
    </Container>
  )
}
