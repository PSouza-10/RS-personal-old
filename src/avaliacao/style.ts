import styled, { css } from "styled-components";

export const Container = styled.main`
  color: var(--fg);
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
`;
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  padding-bottom: 4rem;
  gap: 1.5rem;

  .subQuestion {
    margin-left: 1.5rem;
  }
`;
export const IDFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  font-size: 1.4rem;
  padding-bottom: 4rem;
  gap: 1rem;
  .input-container,
  .dateWrapper {
    margin: 0 0;
  }
`;