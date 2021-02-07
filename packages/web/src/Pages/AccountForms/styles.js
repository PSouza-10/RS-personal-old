import styled, { css } from 'styled-components'
import { Logo80 } from '../../assets'

export const Logo = styled(Logo80)`
  height: 260px;
  width: 180px;
  flex-shrink: 0;
  align-self: center;
  transform: rotate(-3deg) translateY(-6%);
`
export const Banner = styled.div`
  background-image: url('http://localhost:3000/login-img.jpg');
  background-size: cover;
  flex-basis: 60%;
  display: flex;
  align-items: flex-end;
  .message {
    background-color: #0008;
    padding: 30px;
    color: white;
  }
`
export const LoginForm = styled.form`
  display: flex;

  flex-direction: column;
  padding: 0px 20px;
  flex: 1;
  font-size: 1.2rem;
  .input-container {
    margin-bottom: 20px;
  }
  h2 {
    text-align: center;
  }
  p {
    color: white;
    text-align: center;
    margin-bottom: 20px;
  }
  .actions {
    display: flex;

    flex-direction: column;
  }
  .submit {
    align-self: stretch;
    height: 60px;
    text-align: center;
    justify-content: center;
  }
`

export const RegisterForm = styled.form`
  display: flex;
  flex: 1;
  font-size: 1.2rem;
`
export const Container = styled.div`
  display: flex;
  height: 100vh;
  max-height: 100vh;
  min-height: 100vh;

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
    }
  `}
`
