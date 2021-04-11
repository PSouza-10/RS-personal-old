import styled, { css } from "styled-components";

import { Logo } from "../image";

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
  order: 0;
  cursor: pointer;
`;

export const MenuContainer = styled.nav<WithOpen>`
  position: fixed;

  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;

  max-height: 0;
  height: auto;
  overflow: hidden;
  transition: max-height 0.4s ease;
  ${({ open }) =>
    open &&
    css`
      max-height: 1000%;
    `}
  background-color: var(--detail);

  display: flex;
  flex-direction: column;

  .navLink {
    font-size: 1.3rem;
    text-align: center;
    padding: 0.2rem 0;
    transition: all 0.3s ease;
    &:hover {
      background-color: #fff1;
      color: var(--primary);
    }
  }

  .header-separator {
    height: 2px;
    background-color: var(--primary);
    margin: 0.5rem 0;
  }

  .accountLink {
    color: var(--primary);
    align-self: center;
    font-size: 1.3rem;
    transition: all 0.2s ease;
  }

  .accountLink:last-child {
    outline: 1px solid var(--primary);
    padding: 0.2rem 0.5rem;
    &:hover {
      background-color: var(--primary);
      color: white;
    }
  }
  .accountLink:nth-of-type(2) {
    &:hover {
      text-decoration: underline;
      background-color: transparent;
      color: var(--primary);
    }
  }
  .account-text {
    color: var(--fg);
    text-align: center;
    margin: 0.4rem 0;
  }

  ${({ theme: { breakpoints } }) => css`
    @media (min-width: ${breakpoints.md}) {
      & + ${MenuIcon} {
        display: none;
      }

      position: static;
      flex-direction: row;
      max-height: auto;
      overflow: visible;
      flex: 1;
      align-items: center;
      gap: 0.4rem;
      justify-content: flex-end;

      .navLink {
        flex: 1;
      }
      .account-text {
        margin: 0 0;
      }
      .header-separator {
        height: 100%;
        align-self: stretch;
        width: 2px;
        margin: 0 0.5rem;
      }
    }
  `}
`;

export const NavLogo = styled(Logo)`
  height: 35px;
  width: 30px;
  transform: rotate(-3deg) translateY(-6%);
  fill: var(--primary);
`;

export const Container = styled.header`
  display: flex;
  padding: 0.1rem 0.3rem;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 5;
  height: 50px;
  background-color: var(--bg);
  ${({ theme: { breakpoints } }) => css`
    @media (min-width: ${breakpoints.md}) {
      h3 {
        order: 3;
        margin: 0 1rem;
      }
    }
  `}
`;
