import React, { useState } from "react";
import {
  Container,
  MenuIcon,
  MenuContainer,
  NavLogo,
  HeaderBrand,
} from "./styles";
import Link from "next/link";
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const lockYScroll = (lock) => {
    document.body.style.overflow = lock ? "hidden" : "initial";
  };

  const handleMenu = () => {
    lockYScroll(!menuOpen);
    setMenuOpen(!menuOpen);
  };

  return (
    <Container>
      <Link href="/">
        <HeaderBrand onClick={handleMenu}>
          {/* Prevent huge black logo on page load */}
          <NavLogo className="logo-style-load" />
          Personal
        </HeaderBrand>
      </Link>
      {/* {id && <h3>Olá {firstName}</h3>} */}
      <MenuContainer open={menuOpen}>
        <Link href="/blog" passHref>
          <a className="navLink" onClick={handleMenu}>
            Blog
          </a>
        </Link>
        <Link href="/avaliacao" passHref>
          <a className="navLink" onClick={handleMenu}>
            Avaliação
          </a>
        </Link>
        {/* {!id && (
          <>
            <span className="header-separator"></span>

            <Link href="/account/login" passHref>
              <a className="accountLink" onClick={handleMenu}>
                Login
              </a>
            </Link>
            <span className="account-text">ou</span>
            <Link href="/account/register" passHref>
              <a className="accountLink" onClick={handleMenu}>
                Cadastro
              </a>
            </Link>
          </>
        )} */}
      </MenuContainer>

      <MenuIcon open={menuOpen} onClick={handleMenu}>
        <div className="one"></div>
        <div className="two"></div>
        <div className="three"></div>
      </MenuIcon>
    </Container>
  );
}
