import styled from 'styled-components'

export const FormFieldContainer = styled.div`
  width: 90%;
  height: calc(var(--input-base) * 6.8);
  color: white;
  position: relative;
  margin: 0 5%;
  overflow: hidden;
  margin-top: inherit;
  input {
    background-color: transparent;
    outline: none;
    box-shadow: none;
    border: none;
    width: 100%;
    height: 100%;
    padding-top: calc(var(--input-base) * 3.6);
    padding-bottom: calc(var(--input-base) * 1);
    font-size: 1rem;
    color: white;
  }

  .field-label {
    position: absolute;
    pointer-events: none;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #fff5;
  }
  .field-label::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    border-bottom: 3px solid ${({ theme: { colors } }) => colors.primary};
    left: 0;
    bottom: -1px;
    transform: translateX(-100.5%);
    transition: transform 0.3s ease-in;
  }
  .field-content-name {
    font-size: 1rem;
    position: absolute;
    color: #fff5;
    bottom: calc(var(--input-base) * 0.4);
    left: 0;
    transition: all 0.3s ease;
  }

  input:focus + .field-label .field-content-name,
  input:valid + .field-label .field-content-name {
    transform: translateY(-126%);
    bottom: 0;
    font-size: 0.8rem;
    color: ${({ theme: { colors } }) => colors.primary};
  }

  input:focus + .field-label::after,
  input:valid + .field-label::after {
    transform: translateX(0%);
  }
`
