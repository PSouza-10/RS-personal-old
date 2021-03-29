import { MdHome } from "react-icons/md";
import styled, { css } from "styled-components";
import { Logo } from "../../assets";
export const FormLogo = styled(Logo)`
  fill: var(--primary);

  flex: 1;
  align-self: center;
  transform: rotate(-3deg) translateY(-6%);
`;
export const Banner = styled.div`
  background-image: url("/login-img.jpg");
  background-size: cover;
  background-position: center;
  flex: 1 1;
  display: flex;
  align-items: flex-end;
  align-self: stretch;
  .message {
    background-color: #0008;
    padding: 30px;
    color: white;
  }
`;
export const LoginForm = styled.form`
  display: flex;

  flex-direction: column;
  padding: 0px 20px;
  flex: 1 0 40%;
  font-size: 1.2rem;
  .form-logo-wrapper {
    height: 30vh;
    display: flex;
    padding: 0 2vw;
    padding-top: 3vh;
    flex-direction: column;
  }

  .input-container {
    margin-bottom: 20px;
  }
  h2 {
    text-align: center;
    margin-top: auto;
  }
  .form-error {
    margin-top: auto;
  }
  p {
    color: white;
    text-align: center;
    margin-bottom: 20px;
  }
  .actions {
    display: flex;
    margin-bottom: auto;
    flex-direction: column;
  }
`;

export const RegisterForm = styled.div`
  display: flex;
  flex: 1;
  font-size: 1.2rem;

  flex-direction: column;
  .form-logo-wrapper {
    height: 30vh;
    display: flex;
    padding: 0 2vw;
    padding-top: 3vh;
    flex-direction: column;
  }
  .form-error {
    margin: 1em 1em;
  }
  .form-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;

    .input-container {
      margin-bottom: 23px;
    }
    p,
    h2 {
      text-align: center;
    }

    p {
      color: white;
    }

    .button {
      margin: auto 2vw;
    }
  }
`;
export const Container = styled.div`
  display: flex;
  height: 100%;

  min-height: 100%;

  ${Banner} {
    display: none;
  }

  ${({ theme: { breakpoints } }) => css`
    @media (min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg}) {
      ${Banner} {
        display: flex;
        flex-basis: 60%;
      }
    }
    @media (min-width: ${breakpoints.lg}) {
      ${Banner} {
        display: flex;
        flex-basis: 70%;
      }
      ${RegisterForm} {
        flex-direction: row;
        padding: 4vh 0;
        .form-logo-wrapper {
          flex-basis: 50%;
          height: 100%;
          justify-content: center;
          padding: 0 0;
          svg {
            flex: 0.6;
          }
          border-right: 2px solid var(--primary);
        }
        .form-wrapper {
          padding: 30px 0;
          .button {
            margin-top: auto;
          }
        }
      }
    }
  `}
`;

export const HomeIcon = styled(MdHome)`
  position: fixed;
  height: 50px;
  width: 50px;
  top: 10px;
  left: 10px;
  fill: var(--primary);
  cursor: pointer;
  &:hover {
    background-color: var(--white-fade);
  }
`;
