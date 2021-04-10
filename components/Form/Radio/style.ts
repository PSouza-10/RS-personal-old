import styled from "styled-components";

export const Radio = styled.label`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1em;
  cursor: pointer;

  input {
    display: none;
  }

  h4 {
    font-weight: normal;
    height: 100%;
  }

  .circle {
    border: 2px solid #fff8;
    border-radius: 50%;
    min-height: 1em;

    min-width: 1em;

    transition: all 0.2s ease;
    background-size: 30px 30px;
    position: relative;
    .dot {
      height: 50%;
      transition: all 0.2s ease;
      transform-origin: center center;
      width: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 50%;
      transform: scale(0, 0) translate(-50%, -50%);
      background-color: var(--primary);
    }
  }
  input:checked + .circle {
    border-color: var(--primary);
    .dot {
      transform: scale(1, 1) translate(-50%, -50%);
    }
  }
`;

export const RadioGroupContainer = styled.section`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;
