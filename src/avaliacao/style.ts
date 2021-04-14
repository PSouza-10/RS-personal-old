import styled, { css } from "styled-components";

export const Container = styled.main`
  color: var(--fg);
  max-height: calc(100vh - 110px);
  min-height: calc(100vh - 110px);
  ${({ theme: { breakpoints } }) => css`
    @media (min-width: ${breakpoints.md}) {
      padding: 0 10vw;
      ${FormContainer} {
        font-size: 0.8rem;
      }
    }
  `}
  .page-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;

    padding: 0.5rem 1rem;
    justify-content: space-between;
    align-items: center;
    background-color: var(--bgContrast);
    button:last-child {
      margin-left: auto;
    }
  }

  .form-intro {
    padding: 1rem;
    height: 100%;
    p {
      margin-top: 1rem;
      line-height: 1.25;
    }

    a {
      margin: 01rem 5%;
      padding: 1rem;
      border-radius: 0.4rem;
      font-size: 1.3rem;
      display: flex;
      align-items: center;
      fill: var(--fg);
      border: 1px solid var(--white-fade);
      h4 {
        color: inherit;
        flex: 1;
      }
      transition: all 0.3s ease;

      & > * {
        transition: all 0.3s ease;
      }
      svg {
        fill: inherit;
        height: 1.3rem;
        width: 1.3rem;
      }
      &:hover {
        border-color: var(--primary);
        svg {
          fill: var(--primary);
        }
        h4 {
          color: var(--primary);
        }
      }
    }
    a:first-child {
      margin-top: auto;
    }
    a:last-child {
      margin-bottom: auto;
    }
  }
  .form-instructions {
    color: var(--fg);
    font-size: 1.1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  &.multipart-form {
    padding: 0.8rem;
  }
`;
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  padding-bottom: 4rem;
  gap: 1.5rem;

  .subQuestion {
    margin-left: 1.5rem;
    legend {
      font-weight: 400;
    }
  }
`;
export const IDFormContainer = styled.div`
  padding: 1.2rem 1rem;
  font-size: clamp(17px, 1.2rem, 22px);
  padding-bottom: 4rem;
  & > form {
    gap: 1rem;
    display: flex;
    flex-direction: column;
  }
  .identification-radio {
    border: none;
  }
  .input-container,
  .dateWrapper,
  .timeWrapper {
    margin: 0 0;
  }
  .input-container,
  .dateWrapper,
  .timeWrapper,
  .identification-radio {
    font-size: 1em;
  }
  .dateWrapper,
  .timeWrapper {
    margin-top: 0.3em;
    margin-bottom: 0.3em;
  }
  ${({ theme: { breakpoints } }) => css`
    @media (min-width: ${breakpoints.md}) {
      padding-right: 6rem;
      padding-left: 6rem;
    }
  `}
`;
