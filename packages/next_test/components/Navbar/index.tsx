import React, { useState } from 'react'
import { useRouter } from 'next/router'
import {
  Container,
  MenuIcon,
  MenuContainer,
  PictureWrapper,
  HeaderLink,
  ArrowBack,
  BackLink,
  NavLogo,
  HeaderBrand,
  ActionList
} from './styles'
import { useGlobalContext } from '../../Context'
import Link from 'next/link'
import { MdClose } from 'react-icons/md'
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { _id, picture, name = '' } = useGlobalContext(({ data }) => data.account.user)
  const lockYScroll = lock => {
    document.body.style.overflow = lock ? 'hidden' : 'initial'
  }
  const router = useRouter()
  const url = router.pathname
  const simpleHeader = url.includes('article/') || url.includes('content/')
  const handleMenu = () => {
    lockYScroll(!menuOpen)
    setMenuOpen(!menuOpen)
  }

  return (
    <Container>
      {simpleHeader ? (
        <BackLink href='/blog'>
          <ArrowBack />
        </BackLink>
      ) : (
          <HeaderBrand>
            <NavLogo />
          Personal
          </HeaderBrand>
        )}

      <MenuContainer open={menuOpen}>
        <ul>
          <HeaderLink href='/' >
            Home
          </HeaderLink>
          <HeaderLink href='/blog' >
            Blog
          </HeaderLink>

          <HeaderLink href='/partners' >
            Parceiros
          </HeaderLink>

          <HeaderLink href='/about' >
            Sobre
          </HeaderLink>

          <span className='header-separator'></span>
          {_id ? (

            <Account image={picture} name={name} className="header-account" />

          ) : (
              <>
                <HeaderLink
                  href='/account/login'
                  onClick={handleMenu}
                  className='header-account'>
                  Login
              </HeaderLink>

                <HeaderLink
                  href='/account/register'
                  onClick={handleMenu}
                  className='header-account'>
                  Criar Conta
              </HeaderLink>
              </>
            )}
        </ul>
      </MenuContainer>
      {_id ? (

        <Account image={picture} name={name} className="account" />

      ) : (
          <>
            <Link href='/account/login' passHref>
              <a className='inline account'>
                Login
              </a>
            </Link>
            <span className='account' style={{ marginRight: '10px' }}>
              ou
          </span>
            <Link href='/account/register'>
              <a className='button account'>
                Criar Conta
             </a>
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

const Account = ({ image, name, className }) => {
  const [listIsOpen, setListOpen] = useState(false)

  const toggleList = () => {
    setListOpen(!listIsOpen)
  }

  return (
    <PictureWrapper onClick={toggleList} className={className}>
      <img src={image ? image : localStorage.getItem('picURL')} alt={name} />
      <ActionList open={listIsOpen}>
        <span className="close">
          <MdClose />
        </span>
      </ActionList>
    </PictureWrapper>
  )
}
