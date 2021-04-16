import styled from "styled-components";

export const Radio = styled.label`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: inherit;
  cursor: pointer;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  h4 {
    font-weight: normal;
    font-size: 0.9em;
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
  &:focus-within {
    outline: 1px dotted var(--primary);
  }
`;

export const RadioGroupContainer = styled.fieldset`
  display: flex;
  gap: 1em;
  border: 1px dotted var(--primary-fade);
  padding: 0.6rem;
  legend {
    font-weight: 550;
    font-size: 1em;
  }
  &.highlight {
    outline: 2px solid var(--error);
  }
  flex-direction: column;
`;
