import React, { useEffect, useState } from "react";
import {
  Container,
  MenuIcon,
  MenuContainer,
  NavLogo,
  HeaderBrand,
} from "./styles";
import { useGlobalContext } from "../../Context";
import Link from "next/link";
import { useRouter } from "next/router";
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { id, firstName } = useGlobalContext(({ data }) => data.account.user);
  const lockYScroll = (lock) => {
    document.body.style.overflow = lock ? "hidden" : "initial";
  };
  const router = useRouter();

  const handleMenu = () => {
    lockYScroll(!menuOpen);
    setMenuOpen(!menuOpen);
  };

  return (
    <Container>
      <Link href="/">
        <HeaderBrand>
          <NavLogo />
          Personal
        </HeaderBrand>
      </Link>
      {id && <h3>Olá {firstName}</h3>}
      <MenuContainer open={menuOpen}>
        <Link href="/blog" passHref>
          <a className="navLink" onClick={handleMenu}>
            Blog
          </a>
        </Link>
        <Link href="/avaliacao" passHref>
          <a className="navLink" onClick={handleMenu}>
            Avaliacao
          </a>
        </Link>
        {!id && (
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
        )}
      </MenuContainer>

      <MenuIcon open={menuOpen} onClick={handleMenu}>
        <div className="one"></div>
        <div className="two"></div>
        <div className="three"></div>
      </MenuIcon>
    </Container>
  );
}
