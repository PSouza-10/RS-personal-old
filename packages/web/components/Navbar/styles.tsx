import styled, { css } from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import { Logo } from "../image";
import React from "react";

interface WithOpen {
  open: Boolean;
}

export const MenuIcon = styled.div<WithOpen>`
  display: block;
  width: 30px;
  height: 25px;
  cursor: pointer;

  .one,
  .two,
  .three {
    width: 100%;
    height: 5px;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: transform 0.2s ease;
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
    opacity: ${({ open }) => (open ? "0" : "initial")};
    transition: opacity 0.2s ease;
  }
`;
export const HeaderBrand = styled.h1`
  font-weight: 600;
  flex: 0.9;
  display: flex;
  align-items: center;
  /* text-transform: uppercase; */
`;

export const MenuContainer = styled.nav<WithOpen>`
  position: absolute;
  top: 50px;
  left: 0px;
  right: 0px;
  height: ${({ open }) => (open ? "100vh" : "0vh")};
  overflow: hidden;
  max-width: 100vw;
  background-color: ${({ theme }) => theme.colors.bg};
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  justify-content: flex-start;
  transition: height 0.3s ease;
  z-index: 10;
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-top: 25px;
    background-color: ${({ theme }) => theme.colors.bg};
  }
  .header-account {
    font-size: 1.3rem;
  }
  .header-separator {
    height: 2px;
    margin: 6px 0;
    width: 100%;
    background: var(--white-fade);
  }
`;

const StyledLink = ({
  as = "",
  children,
  className = "",
  href = "",
  ...other
}) => (
  <Link href={href} as={as} passHref {...other}>
    <a className={className}>{children}</a>
  </Link>
);

export const HeaderLink = styled(StyledLink)`
  text-decoration: none;
  color: #fff8;
  width: 100%;
  padding: 10px 0px;
  text-align: center;
  display: block;
  cursor: pointer;
  font-size: 1.2rem;
  background-color: transparent;
  transition: all 0.3s ease;
  &:hover {
    color: var(--primary);
    background-color: ${({ theme: { isDark } }) =>
      isDark ? "rgba(255,255,255,0.1)" : "rgba(0, 0, 0, 0.1)"};
  }
`;
export const ArrowBack = styled(IoMdArrowRoundBack)`
  /* height: 40px;
  width: 40px; */
  height: 40px;
  width: 40px;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 50%;
  padding: 5px;
  transform: translateX(-6%);
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  &:focus {
    background-color: rgba(255, 255, 255, 0.08);
  }
`;
export const BackLink = styled(StyledLink)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
`;
export const NavLogo = styled(Logo)`
  height: 35px;
  width: 30px;
  transform: rotate(-3deg) translateY(-6%);
  fill: #f26e2c;
`;
export const PictureWrapper = styled.span`
  height: 45px;
  width: 45px;
  img {
    height: 100%;
    width: 100%;
  }

  cursor: pointer;
`;

export const ActionList = styled.div<{ open: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: var(--bgContrast);

  display: flex;
  height: 100%;
  transition: all 0.3s ease;
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  max-height: ${({ open }) => (open ? "100vh" : "0")};

  .close {
    margin-left: auto;
  }
`;

export const Container = styled.header`
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
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  .account {
    display: none;
  }
  .inline {
    margin-right: 10px;
  }
  .inline::before {
    content: "";
    cursor: initial;
    border-left: 2px solid var(--primary);
    margin: 0 10px;
  }
  @media (min-width: 768px) {
    ${MenuIcon} {
      display: none;
    }
    .account {
      display: initial;
      order: 3;
    }
    ${HeaderBrand} {
      order: 1;
    }
    ${MenuContainer} {
      height: inherit;
      max-width: 500px;
      position: static;
      justify-content: center;
      align-items: stretch;
      transition: none;
      flex: 0.8;
      order: 2;
      flex-direction: row;
      display: block;
      overflow: visible;
      ul {
        margin: 0;
        flex-direction: row;
        height: 100%;
        justify-content: space-evenly;
        align-items: stretch;
        margin-right: 12px;
      }
      .header-account {
        display: none;
      }
      .header-separator {
        display: none;
      }
    }
    ${HeaderLink} {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      text-align: center;
      font-weight: 560;
      padding: 0 6px;
    }
  }
`;
