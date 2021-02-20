import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import {
  Container,
  MenuIcon,
  MenuContainer,
  PictureWrapper,
  HeaderLink,
  ArrowBack,
  BackLink,
  Logo,
  HeaderBrand
} from './styles'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { _id, picture, name = '', isAdmin } = useSelector(
    state => state.Account.user
  )
  const lockYScroll = lock => {
    document.body.style.overflow = lock ? 'hidden' : 'initial'
  }
  const url = useLocation().pathname
  const simpleHeader = url.includes('article/') || url.includes('content/')
  const handleMenu = () => {
    lockYScroll(!menuOpen)
    setMenuOpen(!menuOpen)
  }

  return (
    <Container>
      {simpleHeader ? (
        <BackLink to='/blog'>
          <ArrowBack />
        </BackLink>
      ) : (
        <HeaderBrand>
          <Logo />
          Personal
        </HeaderBrand>
      )}

      <MenuContainer open={menuOpen}>
        <ul>
          <HeaderLink to='/' onClick={handleMenu}>
            Home
          </HeaderLink>
          <HeaderLink to='/blog' onClick={handleMenu}>
            Blog
          </HeaderLink>

          <HeaderLink to='/partners' onClick={handleMenu}>
            Parceiros
          </HeaderLink>

          <HeaderLink to='/about' onClick={handleMenu}>
            Sobre
          </HeaderLink>
          {isAdmin && (
            <HeaderLink to='/workshop' onClick={handleMenu}>
              Painel
            </HeaderLink>
          )}
          <span class='header-separator'></span>
          {_id ? (
            <Account image={picture} name={name} />
          ) : (
            <>
              <HeaderLink
                to='/account/login'
                onClick={handleMenu}
                className='header-account'>
                Login
              </HeaderLink>

              <HeaderLink
                to='/account/register'
                onClick={handleMenu}
                className='header-account'>
                Criar Conta
              </HeaderLink>
            </>
          )}
        </ul>
      </MenuContainer>
      {_id ? (
        <Account image={picture} name={name} />
      ) : (
        <>
          <Link className='inline account' to='/account/login'>
            Login
          </Link>
          <span className='account' style={{ marginRight: '10px' }}>
            ou
          </span>
          <Link className='button account' to='/account/register'>
            Criar Conta
          </Link>
        </>
      )}
      <MenuIcon open={menuOpen} onClick={handleMenu}>
        <div className='one'></div>
        <div className='two'></div>
        <div className='three'></div>
      </MenuIcon>
    </Container>
  )
}

const Account = ({ image, name }) => {
  return (
    <PictureWrapper>
      <img src={image} alt={name} />
    </PictureWrapper>
  )
}
