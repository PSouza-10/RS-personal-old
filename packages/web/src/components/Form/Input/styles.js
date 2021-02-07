import styled from 'styled-components'
export const Container = styled.div`
  display: flex;
  width: 90%;
  margin: 0 5%;
  align-items: flex-end;
  flex-wrap: wrap;
  position: relative;
  caret-color: ${({ valid }) => (valid ? 'var(--primary)' : 'var(--error)')};
  ul {
    font-size: 0.8rem;
    visibility: ${({ isFocused }) => (isFocused ? 'visible' : 'hidden')};
    opacity: ${({ isFocused }) => (isFocused ? '1' : '0')};
    position: absolute;
    right: 0;

    list-style: none;
    background-color: var(--bgContrast);
    transition: opacity 0.3s ease;
    bottom: -135%;
  }
  li {
    margin: 3px 3px;
  }
  .valid {
    color: var(--success);
  }

  .invalid {
    color: var(--error);
  }
  .input-icon {
    flex-shrink: 0;
    height: 26px;
    width: 26px;
    margin-right: 6px;
    fill: ${({ valid }) => (valid ? 'var(--primary)' : 'var(--error)')};
    cursor: pointer;
  }
  .subtitle {
    color: #fff8;
    flex-basis: 100%;
    padding-left: 32px;
    font-size: 0.9rem;
  }
`
export const FormFieldContainer = styled.div`
  flex: 1;
  height: calc(var(--input-base) * 6.8);
  color: white;
  position: relative;

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
    padding-right: 32px;
  }

  .field-label {
    position: absolute;
    pointer-events: none;
    bottom: 0;
    left: 0;
    overflow: hidden;

    width: 100%;
    height: 100%;
    border-bottom: 1px solid #fff8;
  }
  .field-label::after {
    content: '';
    position: absolute;
    height: 101%;
    width: 100%;
    border-bottom: 3px solid ${({ color }) => color};
    left: 0;
    bottom: -1px;
    transform: translateX(-100.5%);
    transition: transform 0.3s ease-in;
  }
  .field-content-name {
    font-size: 1rem;
    position: absolute;
    color: #fff8;
    bottom: calc(var(--input-base) * 0.4);
    left: 0;
    transition: all 0.3s ease;
  }
  .field-content-length {
    font-size: 1rem;
    position: absolute;
    color: #fff8;
    bottom: calc(var(--input-base) * 0.4);
    right: 3px;
  }
  input:focus + .field-label .field-content-name,
  input:valid + .field-label .field-content-name,
  input:placeholder-shown + .field-label .field-content-name {
    transform: translateY(-140%);
    bottom: 0;
    font-size: 0.8rem;
    color: ${({ color }) => color};
  }

  input:focus + .field-label,
  input:valid + .field-label {
    border-color: #0000;
  }
  input:focus + .field-label::after,
  input:valid + .field-label::after {
    transform: translateX(0%);
  }
`
